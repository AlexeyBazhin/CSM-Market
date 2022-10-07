import {connect} from 'react-redux';
import Sales from './Sales.jsx';
import connector from './connector';
import dispatcher from './dispatcher';

export default connect(connector, dispatcher)(Sales);
