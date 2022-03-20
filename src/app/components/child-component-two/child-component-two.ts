import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { BasicData } from '../../core/models/basic-data.model';

@Component({
  selector: 'child-component-two',
  templateUrl: './child-component-two.html',
})
export class ChildComponentTwo implements OnInit {
  @Input() public set parentDataId(id: number) {
    this.parentDataId$.next(id);
  }

  @Input() public set parentDataName(name: string) {
    this.parentDataName$.next(name);
  }

  public existingData: BasicData;
  public form: FormGroup;

  private parentDataId$: BehaviorSubject<number> = new BehaviorSubject<number>(
    null
  );
  private parentDataName$: BehaviorSubject<string> =
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
    });
  }

  private subscribeToParentDataChanges(): void {
    combineLatest([this.parentDataId$, this.parentDataName$]).subscribe(
      ([parentId, parentName]: [number, string]) => {
        this.form.patchValue({
          id: parentId,
          name: parentName,
        });
      }
    );
  }
}
