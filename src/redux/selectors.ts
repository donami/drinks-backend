import { createSelector } from 'reselect';

const getDrinks = (state: any) => state.drinks;
const getDrinkEntities = (state: any) => state.drinks.entities;
export const getDrinksLoading = (state: any) => state.drinks.loading;
export const getSelectedDrinkId = (state: any) => state.drinks.selected;
const getIngredients = (state: any) => state.ingredients;
export const getIngredientEntities = (state: any) => state.ingredients.entities;
export const getIngredientsLoading = (state: any) => state.ingredients.loading;
export const getSelectedIngredientId = (state: any) =>
  state.ingredients.selected;

export const getSelectedDrink = createSelector(
  [getSelectedDrinkId, getDrinkEntities],
  (selectedId, entities) => {
    if (!selectedId) {
      return null;
    }
    return entities[selectedId] || null;
  }
);

export const getIngredientsForDrink = createSelector(
  [getSelectedDrink, getIngredientEntities],
  (selectedDrink, ingredients) => {
    if (!selectedDrink || !selectedDrink.ingredients || !ingredients) {
      return [];
    }
    return selectedDrink.ingredients
      .map((item: any) => {
        const ingredient = ingredients[item.ingredient];

        return {
          ingredient,
          amount: item.amount,
        };
      })
      .filter((ingredient: any) => !!ingredient);
  }
);

export const getSelectedIngredient = createSelector(
  [getSelectedIngredientId, getIngredientEntities],
  (selectedId, entities) => {
    if (!selectedId) {
      return null;
    }
    return entities[selectedId] || null;
  }
);

export const getIngredientItems = createSelector(
  [getIngredientEntities],
  entities => {
    if (!entities) {
      return [];
    }
    return Object.keys(entities).map(id => {
      return entities[id];
    });
  }
);

export const getDrinkItems = createSelector([getDrinkEntities], entities => {
  if (!entities) {
    return [];
  }
  return Object.keys(entities).map(id => {
    return entities[id];
  });
});
