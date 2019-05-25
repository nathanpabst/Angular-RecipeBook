import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';

@Injectable()

export class DataStorageService {
// tslint:disable-next-line: deprecation
    constructor(private http: Http, private recipeService: RecipeService) {}

    storeRecipes() {
        return this.http.put('https://angular-recipebook-bb4a1.firebaseio.com/recipes.json',
            this.recipeService.getRecipes());
    }

    // TODO: fetch is not working as expected.
    // delete a recipe, then fetch to re-create the issue.
    // see section 19
    getRecipes() {
        this.http.get('https://angular-recipebook-bb4a1.firebaseio.com/recipes.json')
            .pipe(map(
                (response) => {
                    const recipes: Recipe[] = response.json();
                    for (let recipe of recipes) {
                        if (!recipe.ingredients) {
                            // console.log('from data-storage: ' + recipe);
                            recipe.ingredients = [];
                        }
                    }
                    return recipes;
                }))
            .subscribe(
// tslint:disable-next-line: deprecation
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                    // console.log(recipes);
                }
            );
    }
}
