import {combineReducers} from 'redux';
import Main from './components/Main/reducer';
import Auth from './pages/Auth/reducer';
import Buys from './pages/Buys/reducer';
import Sales from './pages/Sales/reducer';
import Dashboard from './pages/Dashboard/reducer';

export default combineReducers({
    Main,
    Auth,
    Buys,
    Sales,
    Dashboard,
});