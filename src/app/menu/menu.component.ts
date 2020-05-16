import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  dishes: Dish[];
  selectedDish: Dish;

  constructor(private dishServices: DishService) {}

  ngOnInit(): void {
    this.dishServices
      .getDishes()
      .then((dishes) => (this.dishes = dishes))
      .catch((err) => console.log(err));
  }

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }
}
