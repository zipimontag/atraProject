
import produce from 'immer';
import createReducer from './ReducerUtils';

const initialState = {
    users:
        { name: null }
}
const users = {
    addNewUser(state, action) {
        state.users = action.paylod;
        console.log(state.users);
    }
}

export default produce((state, action) => createReducer(state, action, users), initialState);

