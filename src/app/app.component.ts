import { Component } from '@angular/core';
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
  public middleNameData: string;
  public parentForm: FormGroup;
  public parentSecondaryForm: FormGroup;

  private subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.basicFormData = {
      id: 1,
      name: 'stathis',
    };

    this.buildParentForm();
    this.subscribeToParentFormChanges();
    this.buildParentSecondaryForm();
    this.subscribeToSecondaryParentFormChanges();
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

  private buildParentSecondaryForm(): void {
    this.parentSecondaryForm = this.fb.group({
      middleName: null,
    });
  }

  private subscribeToParentFormChanges(): void {
    this.subscription.add(
      this.parentForm.valueChanges.subscribe((value: BasicData) => {
        this.basicFormData = value;
      })
    );
  }

  private subscribeToSecondaryParentFormChanges(): void {
    this.subscription.add(
      this.parentSecondaryForm.valueChanges.subscribe(
        (value: { middleName: string }) => {
          this.middleNameData = value.middleName;
        }
      )
    );
  }
}
