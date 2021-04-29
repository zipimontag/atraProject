import {createStore} from 'redux';
import user from '../Reducers/User';
const userReducer=user;
const store=createStore(userReducer);
window.store=store;
export default store;