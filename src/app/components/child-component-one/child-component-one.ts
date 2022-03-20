import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BasicData } from '../../core/models/basic-data.model';

@Component({
  selector: 'child-component-one',
  templateUrl: './child-component-one.html',
})
export class ChildComponentOne implements OnInit {
  @Input() public set parentData(data: BasicData) {
    this.existingData = data;
    if (this.form && data) {
      this.form.patchValue(data);
    }
  }

  public existingData: BasicData;
  public form: FormGroup;

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      id: this.existingData?.id || null,
      name: this.existingData?.name || '',
    });
  }
}
