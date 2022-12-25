const initialState = {};

export default( state = initialState , action) =>{
    switch(action.type)
    {
        case 'BookFetchSucess':
            return action.payload;
            // return {...state, [id] : action.payload};
            // return state;
        default:
            return state;
    }
}