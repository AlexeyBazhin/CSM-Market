import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';

import {checkAuth} from './helpers/auth';
import store from './store';

import Navbar from './components/Navbar/index';
import Auth from './pages/Auth';
import Buys from './pages/Buys';
import Sales from './pages/Sales';
import Dashboard from './pages/Dashboard';

function App() {
    const isAuth = checkAuth();
    
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Navbar isAuth={isAuth}/>
                <div>
                    <Routes>
                        {isAuth
                            ? (
                                <>
                                    <Route index element={<Dashboard/>}/>
                                    <Route path="/buys" element={<Buys/>}/>
                                    <Route path="/sales" element={<Sales/>}/>
                                    <Route path="*" element={<Navigate replace to="/"/>}/>
                                </>
                            )
                            : (
                                <>
                                    <Route path="/auth" element={<Auth/>}/>
                                    <Route path="*" element={<Navigate replace to="/auth"/>}/>
                                </>
                            )}
                    </Routes>
                </div>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
