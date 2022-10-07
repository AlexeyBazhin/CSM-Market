import React, {useEffect} from 'react';

import './style.scss';
import {
    Alert,
    Container,
    CircularProgress,
    Card,
    CardContent,
    Typography,
    Backdrop, Select, MenuItem, InputLabel, FormControl,
} from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';//библиотека, которая отрисовывает дэшборды
import {Line} from 'react-chartjs-2';//работает поверх чарт джс, дополняет его

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

const Dashboard = ({
    isLoading,
    error,
    data,
    group,
    
    fetch,
    setGroup,
}) => {
    useEffect(fetch, [group]);
    
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };
    
    const dataTotalSold = {
        labels: data.datasetSales.labels,
        datasets: [
            {
                label: 'Кол-во продаж',
                data: data.datasetSales.count,
                borderColor: 'rgb(109,255,99)',
                backgroundColor: 'rgba(151,246,171,0.5)',
            },
            {
                label: 'Стоимость продаж, $',
                data: data.datasetSales.amount,
                borderColor: 'rgb(61,93,255)',
                backgroundColor: 'rgba(146,163,253,0.5)',
            },
        ],
    };
    
    const dataTotalBought = {
        labels: data.datasetBuys.labels,
        datasets: [
            {
                label: 'Кол-во покупок',
                data: data.datasetBuys.count,
                borderColor: 'rgb(109,255,99)',
                backgroundColor: 'rgba(151,246,171,0.5)',
            },
            {
                label: 'Стоимость покупок, $',
                data: data.datasetBuys.amount,
                borderColor: 'rgb(61,93,255)',
                backgroundColor: 'rgba(146,163,253,0.5)',
            },
        ],
    };
    
    const dataTotalEarn = {
        labels: data.datasetEarn.labels,
        datasets: [
            {
                label: 'Прибыль, $',
                data: data.datasetEarn.amount,
                borderColor: 'rgb(61,93,255)',
                backgroundColor: 'rgba(146,163,253,0.5)',
            },
        ],
    };
    
    return (
        <>
            {error && (
                <Alert
                    severity="error"
                    variant="outlined"
                    sx={{
                        marginTop: 2,
                    }}>
                    {error}
                </Alert>
            )}
            <Container
                maxWidth="false"
                disableGutters
                className="dashboard-container">
                <Card className="area-total-earn">
                    <CardContent
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            color="primary.main">
                            Всего прибыли
                        </Typography>
                        <Typography
                            variant="h4"
                            color="text.primary">
                            {data.totalEarn}$
                        </Typography>
                    </CardContent>
                </Card>
                <Card className="area-today-earn">
                    <CardContent
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            color="primary.main">
                            Прибыль за сегодня
                        </Typography>
                        <Typography
                            variant="h4"
                            color="text.primary">
                            {data.todayEarn}$
                        </Typography>
                    </CardContent>
                </Card>
                <Card className="area-today-bought">
                    <CardContent
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            color="primary.main">
                            Куплено сегодня
                        </Typography>
                        <Typography
                            variant="h4"
                            color="text.primary">
                            {data.todayBought.amount}$
                        </Typography>
                        <Typography
                            variant="h5"
                            color="text.secondary">
                            {data.todayBought.count} шт.
                        </Typography>
                    </CardContent>
                </Card>
                <Card className="area-today-sold">
                    <CardContent
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            color="primary.main">
                            Продано сегодня
                        </Typography>
                        <Typography
                            variant="h4"
                            color="text.primary">
                            {data.todaySold.amount}$
                        </Typography>
                        <Typography
                            variant="h5"
                            color="text.secondary">
                            {data.todaySold.count} шт.
                        </Typography>
                    </CardContent>
                </Card>
                <Card className="area-total-bought">
                    <CardContent
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            color="primary.main">
                            Всего куплено
                        </Typography>
                        <Typography
                            variant="h4"
                            color="text.primary">
                            {data.totalBought.amount}$
                        </Typography>
                        <Typography
                            variant="h5"
                            color="text.secondary">
                            {data.totalBought.count} шт.
                        </Typography>
                    </CardContent>
                </Card>
                <Card className="area-total-sold">
                    <CardContent
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            color="primary.main">
                            Всего продано
                        </Typography>
                        <Typography
                            variant="h4"
                            color="text.primary">
                            {data.totalSold.amount}$
                        </Typography>
                        <Typography
                            variant="h5"
                            color="text.secondary">
                            {data.totalSold.count} шт.
                        </Typography>
                    </CardContent>
                </Card>
                <Card className="area-line-buys">
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            color="primary.main">
                            Покупки
                        </Typography>
                        <FormControl>
                            <InputLabel id="line-buys-group">Группировка</InputLabel>
                            <Select
                                labelId="line-buys-group"
                                value={group.lineBuys}
                                size="small"
                                variant="outlined"
                                label="Группировка"
                                onChange={event => setGroup({chart: 'lineBuys', groupBy: event.target.value})}>
                                <MenuItem value="days">По дням</MenuItem>
                                <MenuItem value="months">По месяцам</MenuItem>
                                <MenuItem value="years">По годам</MenuItem>
                            </Select>
                        </FormControl>
                        <Line
                            options={options}
                            data={dataTotalBought}/>
                    </CardContent>
                </Card>
                <Card className="area-line-sales">
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            color="primary.main">
                            Продажи
                        </Typography>
                        <FormControl>
                            <InputLabel id="line-sales-group">Группировка</InputLabel>
                            <Select
                                labelId="line-sales-group"
                                value={group.lineSales}
                                size="small"
                                variant="outlined"
                                label="Группировка"
                                onChange={event => setGroup({chart: 'lineSales', groupBy: event.target.value})}>
                                <MenuItem value="days">По дням</MenuItem>
                                <MenuItem value="months">По месяцам</MenuItem>
                                <MenuItem value="years">По годам</MenuItem>
                            </Select>
                        </FormControl>
                        <Line
                            options={options}
                            data={dataTotalSold}/>
                    </CardContent>
                </Card>
                <Card className="area-line-earn">
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            color="primary.main">
                            Прибыль
                        </Typography>
                        <FormControl>
                            <InputLabel id="line-earn-group">Группировка</InputLabel>
                            <Select
                                labelId="line-earn-group"
                                value={group.lineEarn}
                                size="small"
                                variant="outlined"
                                label="Группировка"
                                onChange={event => setGroup({chart: 'lineEarn', groupBy: event.target.value})}>
                                <MenuItem value="days">По дням</MenuItem>
                                <MenuItem value="months">По месяцам</MenuItem>
                                <MenuItem value="years">По годам</MenuItem>
                            </Select>
                        </FormControl>
                        <Line
                            options={options}
                            data={dataTotalEarn}/>
                    </CardContent>
                </Card>
            </Container>
            <Backdrop
                sx={{color: '#fff', zIndex: theme => theme.zIndex.drawer + 1}}
                open={isLoading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </>
    );
};

export default Dashboard;
