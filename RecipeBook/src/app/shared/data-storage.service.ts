import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/Rx';

import { environment } from "../../environments/environment";

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

const BACKEND_URL = environment.url + "/api"

@Injectable()
export class DataStorageService {
  constructor(private http: Http,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    const token = this.authService.getToken();
    const headers = new Headers({"Authorization": "bearer " + token});

    return this.http.put(BACKEND_URL + '/recipes', {recipes: this.recipeService.getRecipes()}, {headers: headers});
  }

  getRecipes() {
    const token = this.authService.getToken();
    const headers = new Headers({"Authorization": "bearer " + token});

    this.http.get(BACKEND_URL + '/recipes', {headers: headers})
      .map(
        (response: Response) => {
          const recipes = response.json();
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes) => {
          this.recipeService.setRecipes(recipes.recipes);
        }
      );
  }
}
