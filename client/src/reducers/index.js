import { combineReducers } from 'redux';
import books from './books_reducer';
import user from './user_reducer';

const rootReducers = combineReducers({
    books,
    user
});

export default rootReducers;