// types

export interface WishItemDataParams {
  coverImage: string;
  id: string;
  price: number;
  score: number;
  title: string;
}

export interface WishState {
  wishItems: WishItemDataParams[];
}


export const ADD = "wishList/ADD";
export const REMOVE = "wishList/REMOVE";

interface AddAction {
  type: typeof ADD;
  meta: {
    id: string;
  };
}

interface RemoveAction {
  type: typeof REMOVE;
  meta: {
    id: string;
  };
}

export type WishActionTypes =
  | AddAction
  | RemoveAction

// actions

function add(id: string) {
  return {
    type: ADD,
    meta: {
      id
    }
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

export const actionCreators = {
  add,
  remove,
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
        wishItems: state.wishItems
      };
    case REMOVE:
      return {
        ...state,
        wishItems: state.wishItems.filter(wish => wish.id !== action.meta.id)
      };
    default:
      return state;
  }
}
