import { Component, VERSION } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BasicData } from './core/models/basic-data.model';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public basicFormData: BasicData;
  public parentForm: FormGroup;

  private subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.basicFormData = {
      id: 1,
      name: 'stathis',
    };

    this.buildParentForm();
    this.subscribeToFormChanges();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private buildParentForm(): void {
    this.parentForm = this.fb.group({
      id: this.basicFormData.id,
      name: this.basicFormData.name,
    });
  }

  private subscribeToFormChanges(): void {
    this.subscription = this.parentForm.valueChanges.subscribe(
      (value: BasicData) => {
        this.basicFormData = value;
      }
    );
  }
}
