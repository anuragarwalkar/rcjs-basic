import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { Store } from "@ngrx/store";
import GlobalState from "../shopping-list/shopping-list.model";
import { AddIngredients } from "../shopping-list/store/shopping-list.actions";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor(private store: Store<GlobalState>) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
