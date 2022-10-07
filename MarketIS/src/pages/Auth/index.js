import {connect} from 'react-redux';
import Auth from './Auth.jsx';
import connector from './connector';
import dispatcher from './dispatcher';

export default connect(connector, dispatcher)(Auth);
