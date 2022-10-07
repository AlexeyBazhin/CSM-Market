import {connect} from 'react-redux';
import Navbar from './Navbar.jsx';
import dispatcher from './dispatcher';

export default connect(null, dispatcher)(Navbar);
