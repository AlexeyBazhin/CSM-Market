import {connect} from 'react-redux';
import Buys from './Buys.jsx';
import connector from './connector';
import dispatcher from './dispatcher';

export default connect(connector, dispatcher)(Buys);
