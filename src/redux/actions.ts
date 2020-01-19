import { firestore } from '../config/firebase';
import { toastr } from 'react-redux-toastr';

type AddDrinkPayload = {
  data: {
    title: string;
    description: string;
    source: string;
    image: string;
    instructions: string[];
    ingredients: {
      amount: string;
      ingredientId: string;
    }[];
  };
  callback?: (id: string) => any;
};

type UpdateDrinkPayload = {
  data: {
    id: string;
    title: string;
    description: string;
    image: string;
    instructions: string[];
    ingredients: {
      amount: string;
      ingredientId: string;
    }[];
  };
};
type UpdateIngredientPayload = {
  data: {
    id: string;
    title: string;
    description: string;
    image: string;
  };
};

type AddIngredientPayload = {
  data: {
    title: string;
    description: string;
    image: string;
  };
};

export const addDrink = (payload: AddDrinkPayload) => {
  return (dispatch: any) => {
    dispatch({
      type: 'ADD_DRINK',
    });

    firestore
      .collection('drinks')
      .add({
        title: payload.data.title,
        description: payload.data.description,
        instructions: payload.data.instructions,
        image: payload.data.image,
        source: payload.data.source,
        ingredients: payload.data.ingredients.map(item => {
          return {
            amount: item.amount,
            ingredient: firestore.doc(`/ingredients/${item.ingredientId}`),
          };
        }),
      })
      .then(function(docRef) {
        toastr.success('Success!', 'The drink was added.');
        dispatch({
          type: 'ADD_DRINK_SUCCESS',
          payload: {
            data: {
              id: docRef.id,
              ...payload.data,
            },
          },
        });

        if (payload.callback) {
          payload.callback(docRef.id);
        }
      })
      .catch(function(error) {
        dispatch({
          type: 'ADD_DRINK_FAILURE',
          payload: {
            error,
          },
        });
      });
  };
};

export const updateDrink = (payload: UpdateDrinkPayload) => {
  return (dispatch: any) => {
    dispatch({
      type: 'UPDATE_DRINK',
    });

    const ref = firestore.collection('drinks').doc(payload.data.id);

    ref
      .update({
        title: payload.data.title,
        description: payload.data.description,
        image: payload.data.image,
        instructions: payload.data.instructions,
        ingredients: payload.data.ingredients.map(item => {
          return {
            amount: item.amount,
            ingredient: firestore.doc(`/ingredients/${item.ingredientId}`),
          };
        }),
      })
      .then(docRef => {
        toastr.success('Success!', 'The drink was updated.');

        dispatch({
          type: 'UPDATE_DRINK_SUCCESS',
          payload: {
            data: payload.data,
          },
        });
      })
      .catch(error => {
        dispatch({
          type: 'UPDATE_DRINK_FAILURE',
          payload: {
            error,
          },
        });
      });
  };
};

export const deleteDrinks = (payload: any) => {
  return (dispatch: any) => {
    dispatch({
      type: 'DELETE_DRINKS',
    });

    const promises = payload.ids.map((id: string) => {
      return firestore
        .collection('drinks')
        .doc(id)
        .delete();
    });

    Promise.all(promises)
      .then(() => {
        toastr.success('Success!', 'The drinks(s) was deleted.');
        dispatch({
          type: 'DELETE_DRINKS_SUCCESS',
          payload: payload,
        });
      })
      .catch(error => {
        dispatch({
          type: 'DELETE_DRINKS_FAILURE',
          payload: { error },
        });
      });
  };
};

export const deleteIngredients = (payload: any) => {
  return (dispatch: any) => {
    dispatch({
      type: 'DELETE_INGREDIENTS',
    });

    const promises = payload.ids.map((id: string) => {
      return firestore
        .collection('ingredients')
        .doc(id)
        .delete();
    });

    Promise.all(promises)
      .then(() => {
        toastr.success('Success!', 'The ingredient(s) was deleted.');
        dispatch({
          type: 'DELETE_INGREDIENTS_SUCCESS',
          payload: payload,
        });
      })
      .catch(error => {
        dispatch({
          type: 'DELETE_INGREDIENTS_FAILURE',
          payload: { error },
        });
      });
  };
};

export const updateIngredient = (payload: UpdateIngredientPayload) => {
  return (dispatch: any) => {
    dispatch({
      type: 'UPDATE_INGREDIENT',
    });

    const ref = firestore.collection('ingredients').doc(payload.data.id);

    ref
      .update({
        title: payload.data.title,
        description: payload.data.description,
        image: payload.data.image,
      })
      .then(docRef => {
        toastr.success('Success!', 'The ingredient was updated.');

        dispatch({
          type: 'UPDATE_INGREDIENT_SUCCESS',
          payload: {
            data: payload.data,
          },
        });
      })
      .catch(error => {
        dispatch({
          type: 'UPDATE_INGREDIENT_FAILURE',
          payload: {
            error,
          },
        });
      });
  };
};

export const addIngredient = (payload: AddIngredientPayload) => {
  return (dispatch: any) => {
    dispatch({
      type: 'ADD_INGREDIENT',
    });

    firestore
      .collection('ingredients')
      .add({
        title: payload.data.title,
        description: payload.data.description,
        image: payload.data.image,
      })
      .then(function(docRef) {
        toastr.success('Success!', 'The ingredient was added.');

        dispatch({
          type: 'ADD_INGREDIENT_SUCCESS',
          payload: {
            data: payload.data,
          },
        });
      })
      .catch(function(error) {
        dispatch({
          type: 'ADD_INGREDIENT_FAILURE',
          payload: {
            error,
          },
        });
      });
  };
};

export const fetchDrinksIfNeeded = () => {
  return (dispatch: any, getState: any) => {
    const drinkState = getState().drinks;
    if (drinkState.loading || drinkState.loaded) {
      return;
    }
    dispatch({
      type: 'FETCH_DRINKS',
    });
    dispatch({
      type: 'FETCH_INGREDIENTS',
    });

    firestore
      .collection('ingredients')
      .get()
      .then(querySnapshot => {
        const items = querySnapshot.docs.map(item => {
          const data = item.data();

          return {
            id: item.id,
            title: data.title,
            image: data.image,
            description: data.description,
          };
        });

        dispatch({
          type: 'FETCH_INGREDIENTS_SUCCESS',
          payload: {
            items,
          },
        });
      })
      .catch(error => {
        dispatch({
          type: 'FETCH_INGREDIENTS_FAILURE',
          payload: {
            error,
          },
        });
      });

    firestore
      .collection('drinks')
      .get()
      .then(querySnapshot => {
        const items = querySnapshot.docs.map(item => {
          const data = item.data();

          return {
            id: item.id,
            title: data.title,
            tags: data.tags || [],
            image: data.image,
            instructions: data.instructions || [],
            ingredients: (data.ingredients || []).map((ingredient: any) => {
              return {
                ingredient: ingredient.ingredient.id,
                amount: ingredient.amount,
              };
            }),
            source: data.source,
            description: data.description,
          };
        });

        dispatch({
          type: 'FETCH_DRINKS_SUCCESS',
          payload: {
            items,
          },
        });
      })
      .catch(error => {
        dispatch({
          type: 'FETCH_DRINKS_FAILURE',
          payload: {
            error,
          },
        });
      });
  };
};
