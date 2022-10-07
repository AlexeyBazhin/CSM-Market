const express = require('express');
const firebase = require('firebase');
const {firestore, auth, authAdmin} = require('./helpers/firebase');
const cors = require('cors');
const {round} = require('lodash/math');
const {calcProfit} = require('./helpers/math');
const moment = require('moment');
const underscore = require('underscore');

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Max-Age', '1800');
    res.setHeader('Access-Control-Allow-Headers', 'content-type');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/', (request, response, next) => {
    const pathsWithoutAuth = ['/auth', '/dashboard'];
    if (pathsWithoutAuth.includes(request.path)) {
        next();
        return;
    }
    
    const headerToken = request.headers.authorization;
    if (!headerToken) {
        return response.status(401)
            .json({
                errorMessage: 'Не предоставлен токен авторизации',
            });
    }
    
    if (headerToken && headerToken.split(' ')[0] !== 'Bearer') {
        response.status(401)
            .json({
                errorMessage: 'Неправильный токен авторизации',
            });
    }
    
    const token = headerToken.split(' ')[1];
    
    authAdmin.verifyIdToken(token)
        .then(() => next())
        .catch(() => response.status(403)
            .json({
                errorCode: 'auth/not-authorized',
                errorMessage: 'Вы не авторизованы',
            }));
});

app.post('/auth', async (req, res) => {
    try {
        const {email, password} = req.body;
        
        auth.signInWithEmailAndPassword(email, password)
            .then(async () => {
                res.status(200)
                    .json({
                        token: await auth?.currentUser?.getIdToken(true),
                    });
            })
            .catch(error => {
                const errorCode = error.code;
                
                const errorMessage = errorCode === 'auth/user-disabled'
                    ? 'Пользователь заблокирован'
                    : 'Неправильно введена почта или пароль';
                
                res.status(400)
                    .json({errorMessage});
            });
    } catch (error) {
        console.error(error);
        res.status(400)
            .json({
                errorMessage: 'Произошла ошибка при авторизации',
            });
    }
});

app.get('/signout', async (req, res) => {
    try {
        auth.signOut()
            .then(async () => {
                res.status(200)
                    .json({
                        success: true,
                    });
            })
            .catch(() => {
                res.status(400)
                    .json({errorMessage: 'Не удалось выйти из аккаунта'});
            });
    } catch (error) {
        console.error(error);
        res.status(400)
            .json({
                errorMessage: 'Произошла ошибка при выходе из аккаунта',
            });
    }
});

app.post('/buys', async (req, res) => {
    try {
        const {
            pageSize,
            lastDocument,
            firstDocument,
            filters: {
                name,
                maxPriceSell,
                minPriceSell,
                maxPriceBuy,
                minPriceBuy,
                isSold,
                dateStart,
                dateEnd,
            },
            sortBy,
            sortDir,
        } = req.body;
        
        let query = firestore.collection('purchase');
        
        // Filters
        if (name) {
            query = query
                .orderBy('item_name')
                .where('item_name', '>=', name)
                .where('item_name', '<=', `${name}\uf8ff`);
        }
        if (minPriceBuy || maxPriceBuy) {
            query = query
                .orderBy('price_buy')
                .where('price_buy', '>=', minPriceBuy)
                .where('price_buy', '<=', maxPriceBuy);
        }
        if (minPriceSell || maxPriceSell) {
            query = query
                .orderBy('price_sell')
                .where('price_sell', '>=', minPriceSell)
                .where('price_sell', '<=', maxPriceSell);
        }
        if (dateStart || dateEnd) {
            query = query
                .orderBy('date')
                .where('date', '>=', dateStart)
                .where('date', '<=', dateEnd);
        }
        if (typeof isSold === 'boolean') {
            query = query
                .orderBy('sold')
                .where('sold', '==', isSold);
        }
        
        query = query.orderBy(sortBy, sortDir);
        if (lastDocument) {
            query = sortBy === 'date'
                ? query.startAfter(new firebase.firestore.Timestamp(lastDocument[sortBy].seconds, lastDocument[sortBy].nanoseconds))
                : query.startAfter(lastDocument[sortBy]);
        } else if (firstDocument) {
            query = sortBy === 'date'
                ? query.endBefore(new firebase.firestore.Timestamp(firstDocument[sortBy].seconds, firstDocument[sortBy].nanoseconds))
                : query.endBefore(firstDocument[sortBy]);
        }
        query = query.limit(pageSize);
        
        const snapshot = await query.get();
        
        if (snapshot.empty) {
            return res.status(200)
                .json({
                    data: [],
                    countAll: 0,
                    lastDocument: null,
                    firstDocument: null,
                });
        }
        
        const {docs} = await firestore.collection('purchase')
            .get();
        
        const buys = [];
        snapshot.forEach(document => {
            const buy = document.data();
            
            buys.push({
                ...buy,
                id: document.id,
                profit: round(buy.price_sell - buy.price_buy, 2),
                profit_in_percent: calcProfit(buy.price_buy, buy.price_sell),
            });
        });
        
        res.status(200)
            .json({
                data: buys,
                countAll: docs.length,
                lastDocument: snapshot.docs.slice(-1)[0].data(),
                firstDocument: snapshot.docs[0].data(),
            });
    } catch (error) {
        console.error(error);
        res.status(400)
            .json({
                errorMessage: 'Произошла ошибка при получении истории покупок',
            });
    }
});

app.post('/sales', async (req, res) => {
    try {
        const {
            pageSize,
            lastDocument,
            firstDocument,
            filters: {
                name,
                maxPriceSell,
                minPriceSell,
                maxPriceBuy,
                minPriceBuy,
                dateStart,
                dateEnd,
            },
            sortBy,
            sortDir,
        } = req.body;
        
        let query = firestore.collection('sale');
        
        // Filters
        if (name) {
            query = query
                .orderBy('item_name')
                .where('item_name', '>=', name)
                .where('item_name', '<=', `${name}\uf8ff`);
        }
        if (minPriceBuy || maxPriceBuy) {
            query = query
                .orderBy('price_buy')
                .where('price_buy', '>=', minPriceBuy)
                .where('price_buy', '<=', maxPriceBuy);
        }
        if (minPriceSell || maxPriceSell) {
            query = query
                .orderBy('price_sell')
                .where('price_sell', '>=', minPriceSell)
                .where('price_sell', '<=', maxPriceSell);
        }
        if (dateStart || dateEnd) {
            query = query
                .orderBy('date')
                .where('date', '>=', dateStart)
                .where('date', '<=', dateEnd);
        }
        
        query = query.orderBy(sortBy, sortDir);
        if (lastDocument) {
            query = sortBy === 'date'
                ? query.startAfter(new firebase.firestore.Timestamp(lastDocument[sortBy].seconds, lastDocument[sortBy].nanoseconds))
                : query.startAfter(lastDocument[sortBy]);
        } else if (firstDocument) {
            query = sortBy === 'date'
                ? query.endBefore(new firebase.firestore.Timestamp(firstDocument[sortBy].seconds, firstDocument[sortBy].nanoseconds))
                : query.endBefore(firstDocument[sortBy]);
        }
        query = query.limit(pageSize);
        
        const snapshot = await query.get();
        
        if (snapshot.empty) {
            return res.status(200)
                .json({
                    data: [],
                    countAll: 0,
                    lastDocument: null,
                    firstDocument: null,
                });
        }
        
        const {docs} = await firestore.collection('sale')
            .get();
        
        const sales = [];
        snapshot.forEach(document => {
            const sale = document.data();
            
            sales.push({
                ...sale,
                id: document.id,
                profit: round(sale.price_sell - sale.price_buy, 2),
                profit_in_percent: calcProfit(sale.price_buy, sale.price_sell),
            });
        });
        
        res.status(200)
            .json({
                data: sales,
                countAll: docs.length,
                lastDocument: snapshot.docs.slice(-1)[0].data(),
                firstDocument: snapshot.docs[0].data(),
            });
    } catch (error) {
        console.error(error);
        res.status(400)
            .json({
                errorMessage: 'Произошла ошибка при получении истории продаж',
            });
    }
});

app.post('/dashboard', async (req, res) => {
    try {
        const {group} = req.body;
        
        const result = {
            totalEarn: 0,
            todayEarn: 0,
            todayBought: {
                amount: 0,
                count: 0,
            },
            todaySold: {
                amount: 0,
                count: 0,
            },
            totalBought: {
                amount: 0,
                count: 0,
            },
            totalSold: {
                amount: 0,
                count: 0,
            },
            datasetBuys: {
                labels: [],
                count: [],
                amount: [],
            },
            datasetSales: {
                labels: [],
                count: [],
                amount: [],
            },
            datasetEarn: {
                labels: [],
                amount: [],
            },
        };
        
        const buys = [];
        const sales = [];
        const buysToday = [];
        const salesToday = [];
        
        const {docs: purchaseDocs} = await firestore.collection('purchase')
            .get();
        const {docs: saleDocs} = await firestore.collection('sale')
            .get();

        const moment1 = moment();
        const moment2 = moment();
        moment1.startOf('day');
        moment2.endOf('day');

        const {docs: purchaseDocsToday} = await firestore.collection('purchase')
            .orderBy('date')
            .where('date', '>', moment1.toDate())
            .where('date', '<=', moment2.toDate())
            .get();
        const {docs: saleDocsToday} = await firestore.collection('sale')
            .orderBy('date')
            .where('date', '>', moment1.toDate())
            .where('date', '<=', moment2.toDate())
            .get();

        !purchaseDocs.empty && purchaseDocs.forEach(doc => buys.push(doc.data()));
        !saleDocs.empty && saleDocs.forEach(doc => sales.push(doc.data()));
        !purchaseDocsToday.empty && purchaseDocsToday.forEach(doc => buysToday.push(doc.data()));
        !saleDocsToday.empty && saleDocsToday.forEach(doc => salesToday.push(doc.data()));
        
        result.totalSold = {
            count: sales.length,
            amount: round(sales.reduce((sum, value) => sum + value.price_sell, 0), 2),
        };
        result.totalBought = {
            count: buys.length,
            amount: round(buys.reduce((sum, value) => sum + value.price_buy, 0), 2),
        };
        result.totalEarn = round(result.totalSold.amount - result.totalBought.amount, 2);
        result.todaySold = {
            count: salesToday.length,
            amount: round(salesToday.reduce((sum, value) => sum + value.price_sell, 0), 2),
        };
        result.todayBought = {
            count: buysToday.length,
            amount: round(buysToday.reduce((sum, value) => sum + value.price_buy, 0), 2),
        };
        result.todayEarn = round(result.todaySold.amount - result.todayBought.amount, 2);
        
        const groupedBuys = underscore.chain(buys)
            .sortBy(item => item.date.seconds)
            .groupBy(item => {
                return moment(item.date.seconds * 1000)
                    .format(group.lineBuys === 'days'
                        ? 'DD.MM.YYYY'
                        : group.lineBuys === 'months'
                            ? 'MM.YYYY'
                            : 'YYYY');
            })
            .value();
        
        const groupedSales = underscore.chain(sales)
            .sortBy(item => item.date.seconds)
            .groupBy(item => {
                return moment(item.date.seconds * 1000)
                    .format(group.lineSales === 'days'
                        ? 'DD.MM.YYYY'
                        : group.lineSales === 'months'
                            ? 'MM.YYYY'
                            : 'YYYY');
            })
            .value();
        
        const groupedEarn = underscore.chain(sales)
            .sortBy(item => item.date.seconds)
            .groupBy(item => {
                return moment(item.date.seconds * 1000)
                    .format(group.lineEarn === 'days'
                        ? 'DD.MM.YYYY'
                        : group.lineEarn === 'months'
                            ? 'MM.YYYY'
                            : 'YYYY');
            })
            .value();
        
        result.datasetBuys = {
            labels: Object.keys(groupedBuys),
            count: Object.values(groupedBuys)
                .map(items => items.length),
            amount: Object.values(groupedBuys)
                .map(items => round(items.reduce((sum, item) => sum + item.price_buy, 0), 2)),
        };
        result.datasetSales = {
            labels: Object.keys(groupedSales),
            count: Object.values(groupedSales)
                .map(items => items.length),
            amount: Object.values(groupedSales)
                .map(items => round(items.reduce((sum, item) => sum + item.price_sell, 0), 2)),
        };
        result.datasetEarn = {
            labels: Object.keys(groupedEarn),
            amount: Object.values(groupedEarn)
                .map(items => round(items.reduce((sum, item) => sum + (item.price_sell - item.price_buy), 0), 2)),
        };
        
        res.status(200)
            .json(result);
    } catch (error) {
        console.error(error);
        res.status(400)
            .json({
                errorMessage: 'Произошла ошибка при получении данных для дашборда',
            });
    }
});

app.listen(7001);