import Axios from 'axios';

const serverUrl = 'http://localhost:7001';

/**
 * @param {'get' || 'post'} method
 * @param {String} path
 * @param {Object?} params
 * @param {Boolean?} isRequireAuth
 */
const safeRequest = async (method, path, params, isRequireAuth = false) =>
    new Promise(resolve => {
        const args = [path];
        
        if (params) {
            args.push(params);
        }
        
        if (isRequireAuth) {
            args.push({
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('@token')}`,
                },
            });
        }
        
        Axios[method](...args)
            .then(res => resolve({data: res.data}))
            .catch(err => {
                if (err.response.data.errorCode === 'auth/not-authorized') {
                    localStorage.removeItem('@token');
                    location.replace('/auth');
                }
                
                resolve({errors: err.response.data});
            });
    });

export default {
    Auth: params => safeRequest('post', `${serverUrl}/auth`, params),
    Signout: () => safeRequest('get', `${serverUrl}/signout`, undefined, true),
    FetchBuys: params => safeRequest('post', `${serverUrl}/buys`, params, true),
    FetchSales: params => safeRequest('post', `${serverUrl}/sales`, params, true),
    FetchDashboard: params => safeRequest('post', `${serverUrl}/dashboard`, params, true),
};