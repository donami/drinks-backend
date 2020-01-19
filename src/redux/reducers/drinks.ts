import { normalize } from '../utils';

type State = {
  loaded: boolean;
  loading: boolean;
  items: any[];
  entities: { [key: string]: any };
  selected: null | any;
};
// Initial State
const initialState: State = {
  loaded: false,
  loading: false,
  items: [],
  entities: {},
  selected: null,
};

const drinksReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'FETCH_DRINKS': {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case 'FETCH_DRINKS_SUCCESS': {
      return {
        ...state,
        loaded: true,
        loading: false,
        items: action.payload.items,
        entities: normalize(action.payload.items),
      };
    }
    case 'FETCH_DRINKS_FAILURE': {
      return {
        ...state,
        loaded: true,
        loading: false,
        items: [],
        entities: {},
      };
    }

    case 'ADD_DRINK': {
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    }
    case 'ADD_DRINK_SUCCESS': {
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
    case 'ADD_DRINK_FAILURE': {
      return {
        ...state,
        loaded: false,
        loading: false,
      };
    }

    case 'UPDATE_DRINK_SUCCESS': {
      const indexOf = state.items.findIndex(
        item => item.id === action.payload.data.id
      );
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.payload.data.id]: action.payload.data,
        },
        items: [
          ...state.items.slice(0, indexOf),
          action.payload.data,
          ...state.items.slice(indexOf + 1),
        ],
      };
    }

    case 'DELETE_DRINKS_SUCCESS': {
      const deletedIds = action.payload.ids;

      return {
        ...state,
        items: state.items.filter(item => deletedIds.indexOf(item.id) === -1),
        entities: Object.keys(state.entities).reduce<any>((acc, key) => {
          if (deletedIds.indexOf(key) === -1) {
            acc[key] = state.entities[key];
          }
          return acc;
        }, {}),
      };
    }

    case 'SELECT_DRINK': {
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

export default drinksReducer;
