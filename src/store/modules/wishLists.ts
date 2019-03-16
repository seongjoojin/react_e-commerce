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
export const CHANGE = 'wishList/CHANGE';
export const CHECK = 'wishList/CHECK';

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

interface ChangeAction {
  type: typeof CHANGE;
  meta: {
    id: string;
    count: number;
  };
}

interface CheckAction {
  type: typeof CHECK;
  meta: {
    id: string;
    check: boolean;
  };
}

export type WishActionTypes =
  | AddAction
  | RemoveAction
  | ChangeAction
  | CheckAction

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

function change(id:string, count: number,) {
  return {
    type: CHANGE,
    meta: {
      id,
      count,
    }
  };
}

function check(id:string, check: boolean,) {
  return {
    type: CHECK,
    meta: {
      id,
      check,
    }
  };
}

export const actionCreators = {
  add,
  remove,
  change,
  check,
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
    case CHANGE:
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
    case CHECK:
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
