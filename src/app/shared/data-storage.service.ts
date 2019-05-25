import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';

@Injectable()

export class DataStorageService {
// tslint:disable-next-line: deprecation
    constructor(private http: Http, private recipeService: RecipeService) {}

    storeRecipes() {
        return this.http.put('https://angular-recipebook-bb4a1.firebaseio.com/recipes.json',
            this.recipeService.getRecipes());
    }
}
