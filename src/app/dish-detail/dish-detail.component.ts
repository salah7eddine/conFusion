import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/Comment';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss'],
})
export class DishDetailComponent implements OnInit {
  // @Input()
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;

  dishCopy: Dish = null;
  rating: number;
  newComment: Comment;
  commentForm: FormGroup;
  errMess: string;
  visibility = 'shown';

  formErrors = {
    name: '',
    message: '',
  };

  validationMessages = {
    name: {
      required: 'Name is required.',
      minlength: 'Name must be at least 2 characters long.',
      maxlength: 'Name cannot be more than 25 characters long.',
    },
    message: {
      required: 'Comment is required.',
    },
  };

  constructor(
    private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  //Author Name must be at least two characters long.
  //Author Name is required
  //comment as required

  ngOnInit(): void {
    // let id = this.route.snapshot.params['id'];

    this.dishService
      .getDishIds()
      .subscribe((dishIds) => (this.dishIds = dishIds));

    this.route.params
      .pipe(
        switchMap((params: Params) => this.dishService.getDish(params['id']))
      )
      .subscribe((dish) => {
        this.dish = dish;
        this.dishCopy = dish;
        this.setPrevNext(dish.id);
      });
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[
      (this.dishIds.length + index - 1) % this.dishIds.length
    ];
    this.next = this.dishIds[
      (this.dishIds.length + index + 1) % this.dishIds.length
    ];
  }

  getBack(): void {
    this.location.back();
  }

  createForm() {
    this.commentForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      message: ['', Validators.required],
    });

    this.commentForm.valueChanges.subscribe((data) =>
      this.onValueChanges(data)
    );

    this.onValueChanges();
  }

  onValueChanges(data?: any) {
    if (!this.commentForm) {
      return;
    }

    const form = this.commentForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onChangeRatingSlider(slider): void {
    this.rating = slider.value;
  }

  onSubmit(): void {
    let comment = this.commentForm.value;

    this.newComment = {
      rating: this.rating,
      comment: comment.message,
      author: comment.name,
      date: new Date().toISOString(),
    };
    console.log(this.newComment);

    this.dish.comments.push(this.newComment);

    this.commentForm.reset();
  }
}
