import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { BasicData } from '../../core/models/basic-data.model';

@Component({
  selector: 'child-component-two',
  templateUrl: './child-component-two.html',
})
export class ChildComponentTwo implements OnInit {
  @Input() public set parentData(data: BasicData) {
    this.parentData$.next(data);
  }

  @Input() public set parentDataMiddleName(name: string) {
    this.parentDataMiddleName$.next(name);
  }

  public existingData: BasicData;
  public form: FormGroup;

  private parentData$: BehaviorSubject<BasicData> =
    new BehaviorSubject<BasicData>(null);
  private parentDataMiddleName$: BehaviorSubject<string> =
    new BehaviorSubject<string>(null);

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.buildForm();
    this.subscribeToParentDataChanges();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      id: this.existingData?.id || null,
      name: this.existingData?.name || '',
      middleName: '',
    });
  }

  private subscribeToParentDataChanges(): void {
    combineLatest([this.parentData$, this.parentDataMiddleName$]).subscribe(
      ([parentData, parentMiddleName]: [BasicData, string]) => {
        this.form.patchValue({
          ...parentData,
          middleName: parentMiddleName || '',
        });
      }
    );
  }
}
