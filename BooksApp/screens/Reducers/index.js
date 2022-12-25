import {combineReducers} from 'redux';
import employeeReducer from './UserReducer';
import bookReducer from './BookReducer';

export default combineReducers({
    employee : employeeReducer,
    book : bookReducer,
});