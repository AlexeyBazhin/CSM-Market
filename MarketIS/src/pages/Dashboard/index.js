import {connect} from 'react-redux';
import Dashboard from './Dashboard.jsx';
import connector from './connector';
import dispatcher from './dispatcher';

export default connect(connector, dispatcher)(Dashboard);
