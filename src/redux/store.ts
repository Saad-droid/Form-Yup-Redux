import { combineReducers } from 'redux';
import { formReducer } from './reducers';
import { createStore, } from 'redux';

export const rootReducer = combineReducers({
    formData: formReducer,

});


export type RootState = ReturnType<typeof rootReducer>;
const store = createStore(rootReducer);


export default store;