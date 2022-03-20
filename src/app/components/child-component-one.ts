import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BasicData } from '../core/models/basic-data.model';

@Component({
  selector: 'child-component-one',
  templateUrl: './child-component-one.html',
})
export class ChildComponentOne {
  @Input() public set parentData(data: BasicData) {
    this.initialData = data;
    if (data) {
      this.form.patchValue(data);
    }
  }

  public initialData: BasicData;
  public form: FormGroup;

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      id: this.initialData?.id || null,
      name: this.initialData?.name || '',
    });
  }
}
