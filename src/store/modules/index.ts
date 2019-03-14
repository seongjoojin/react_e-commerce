import { combineReducers } from 'redux';
import { WishState, wishReducer as wish } from './wishLists';

export interface StoreState {
  wish: WishState;
}

export default combineReducers<StoreState>({
  wish
});
