import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { map } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';

@Injectable({providedIn: 'root'})

export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        return this.http
            .put('https://angular-recipebook-bb4a1.firebaseio.com/recipes.json',
                recipes
            )
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes() {
        this.http
        .get<Recipe[]>('https://angular-recipebook-bb4a1.firebaseio.com/recipes.json')
        .subscribe(recipes => {
            this.recipeService.setRecipes(recipes);
        });
    }

    // TODO: fetch is not working as expected.
    // delete a recipe, then fetch to re-create the issue.
    // see section 19
//     getRecipes() {
//         this.http.get('https://angular-recipebook-bb4a1.firebaseio.com/recipes.json')
//             .pipe(map(
//                 (response) => {
//                     const recipes: Recipe[] = response.json();
//                     for (let recipe of recipes) {
//                         if (!recipe.ingredients) {
//                             // console.log('from data-storage: ' + recipe);
//                             recipe.ingredients = [];
//                         }
//                     }
//                     return recipes;
//                 }))
//             .subscribe(
//                 (recipes: Recipe[]) => {
//                     this.recipeService.setRecipes(recipes);
//                     // console.log(recipes);
//                 }
//             );
//     }
}
