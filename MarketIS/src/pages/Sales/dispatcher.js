import Fetch from './actions/fetch';
import {SetFilters} from './actions/setFilters';
import {SetPage} from './actions/setPage';
import {SetSort} from './actions/setSort';
import {SetPageSize} from './actions/setPageSize';
import {ClearTable} from './actions/clearTable';

const dispatcher = dispatch => ({
    fetch: () => dispatch(Fetch()),
    setFilters: value => dispatch(SetFilters(value)),
    setPage: value => dispatch(SetPage(value)),
    setSort: value => dispatch(SetSort(value)),
    setPageSize: value => dispatch(SetPageSize(value)),
    clearTable: value => dispatch(ClearTable(value)),
});

export default dispatcher;