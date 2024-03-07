import actionTypes from '../actions/actionTypes';

const initialState = {
    count: 1
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INCREASE_COUNT:
            state.count = state.count + 1;
            console.log('increase', state.count);
            return {
                ...state
            };
        case actionTypes.DECREASE_COUNT:
            state.count = state.count - 1;
            return {
                ...state
            }
        default:
            return {
                ...state
            }
    }
}

export default Reducer;