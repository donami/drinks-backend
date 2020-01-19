import { normalize } from '../utils';
// Initial State
const initialState = {
  loaded: false,
  loading: false,
  items: [],
  selected: null,
  entities: {},
};

const ingredientReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'FETCH_INGREDIENTS_SUCCESS': {
      return {
        ...state,
        loaded: true,
        loading: false,
        items: action.payload.items,
        entities: normalize(action.payload.items),
      };
    }

    case 'ADD_INGREDIENT': {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case 'ADD_INGREDIENT_SUCCESS': {
      return {
        ...state,
        items: [
          ...state.items,
          {
            ...action.payload.data,
          },
        ],
        entities: {
          ...state.entities,
          [action.payload.data.id]: action.payload.data,
        },
        loaded: true,
        loading: false,
      };
    }
    case 'ADD_INGREDIENT_FAILURE': {
      return {
        ...state,
        loaded: false,
        loading: false,
      };
    }

    case 'SELECT_INGREDIENT': {
      return {
        ...state,
        selected: action.payload.itemId,
      };
    }

    // Default
    default: {
      return state;
    }
  }
};

export default ingredientReducer;
