import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedBack, ContactType } from '../shared/feedBack';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  feedBackForm: FormGroup;
  feedBack: FeedBack;
  contactType = ContactType;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.feedBackForm = this.fb.group({
      firstName: '',
      lastName: '',
      phone: 0,
      email: '',
      agree: false,
      contactType: 'None',
      message: '',
    });
  }

  onSubmit() {
    this.feedBack = this.feedBackForm.value;
    console.log(this.feedBack);
    this.feedBackForm.reset();
  }
}
