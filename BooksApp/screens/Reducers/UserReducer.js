import {EmployeeFetchSucess} from '../Actions/types';


const initialState = {};

export default( state = initialState , action) =>{
    switch(action.type)
    {
        case 'EmployeeFetchSucess':
            // console.log('ko');
            // console.log(action);
            return action.payload;
            // return {...state, [id] : action.payload};
            // return state;
        default:
            // console.log('action');
            // console.log(state);
            return state;
    }
}