// types
export interface WishItemDataParams {
  availableCoupon: undefined | boolean;
  coverImage: string;
  id: string;
  price: number;
  score: number;
  title: string;
  count: number;
  check: boolean;
}

export interface WishState {
  wishItems: WishItemDataParams[];
}

export const ADD = 'wishList/ADD';
export const REMOVE = 'wishList/REMOVE';
export const CHANGE_COUNT = 'wishList/CHANGE_COUNT';
export const CHANGE_CHECK = 'wishList/CHANGE_CHECK';

interface AddAction {
  type: typeof ADD;
  payload: WishItemDataParams
}

interface RemoveAction {
  type: typeof REMOVE;
  meta: {
    id: string;
  };
}

interface ChangeCountAction {
  type: typeof CHANGE_COUNT;
  meta: {
    id: string;
    count: number;
  };
}

interface ChangeCheckAction {
  type: typeof CHANGE_CHECK;
  meta: {
    id: string;
    check: boolean;
  };
}

export type WishActionTypes =
  | AddAction
  | RemoveAction
  | ChangeCountAction
  | ChangeCheckAction

// actions
function add(newWishItem: WishItemDataParams) {
  return {
    type: ADD,
    payload: newWishItem
  };
}

function remove(id: string) {
  return {
    type: REMOVE,
    meta: {
      id
    }
  };
}

function changeCount(id:string, count: number,) {
  return {
    type: CHANGE_COUNT,
    meta: {
      id,
      count,
    }
  };
}

function changeCheck(id:string, check: boolean,) {
  return {
    type: CHANGE_CHECK,
    meta: {
      id,
      check,
    }
  };
}

export const actionCreators = {
  add,
  remove,
  changeCount,
  changeCheck,
};

// reducers
const initialState: WishState = {
  wishItems: []
};

export function wishReducer(
  state = initialState,
  action: WishActionTypes
): WishState {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        wishItems: state.wishItems.length > 2 ? [...state.wishItems] : [...state.wishItems, action.payload]
      };
    case REMOVE:
      return {
        ...state,
        wishItems: state.wishItems.filter(wish => wish.id !== action.meta.id)
      };
    case CHANGE_COUNT:
      return Object.assign({}, state, {
        wishItems: state.wishItems.map(wish => {
          if (wish.id !== action.meta.id) {
            return wish
          }

          return Object.assign({}, wish, {
            count: action.meta.count,
          })
        })
      });
    case CHANGE_CHECK:
      return Object.assign({}, state, {
        wishItems: state.wishItems.map(wish => {
          if (wish.id !== action.meta.id) {
            return wish
          }

          return Object.assign({}, wish, {
            check: action.meta.check,
          })
        })
      });
    default:
      return state;
  }
}
