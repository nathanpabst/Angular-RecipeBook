import { Component, OnInit, Input } from '@angular/core';
import {Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})

//@Output listens for the click event and responds
export class RecipeItemComponent implements OnInit {
 @Input() recipe: Recipe;
 

  constructor(private recipiceService: RecipeService) { }

  ngOnInit() {
  }

  onSelected() {
    this.recipiceService.recipeSelected.emit(this.recipe);
  
  }

}
