import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipe.actions';
import { act } from '@ngrx/effects';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: []
};

export function recipeReducer(
  state = initialState,
  action: RecipesActions.RecipesActions
) {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case RecipesActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipesActions.UPDATE_RECIPE:
      const updatedRecipe = {
        // find the appropriate recipe to update && make a copy
        ...state.recipes[action.payload.index],
        // update/override the recipe
      ...action.payload.newRecipe
    };
      // copy the list of recipes
      const updatedRecipes = [...state.recipes];
      // replace the updated recipe in the new list
      updatedRecipes[action.payload.index] = updatedRecipe;

      return {
        ...state,
        // return the new list of recipes
        recipes: updatedRecipes
      };
    case RecipesActions.DELETE_RECIPE:
      return {
        ...state,
        // filter function will return a new list
        recipes: state.recipes.filter((recipe, index) => {
          // if the recipe index does match the payload, the recipe will remain in the list
          return index !== action.payload;
        })
      };

    default:
      return state;
  }
}
