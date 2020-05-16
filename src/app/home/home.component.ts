import { Component, OnInit } from '@angular/core';
import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
import { Dish } from '../shared/dish';
import { Promotion } from '../shared/promotion';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: Leader;

  constructor(
    private dishService: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dishService.getFeaturedDish().subscribe((dish) => (this.dish = dish));
    this.promotionService
      .getFeaturedPromotion()
      .subscribe((promotion) => (this.promotion = promotion));
    let id = this.route.snapshot.params['id'];
    this.leaderService
      .getLeader(id)
      .subscribe((leader) => (this.leader = leader));
  }
}
