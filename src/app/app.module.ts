import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ChildComponentOne } from './components/child-component-one/child-component-one';
import { ChildComponentTwo } from './components/child-component-two/child-component-two';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [AppComponent, ChildComponentOne, ChildComponentTwo],
  bootstrap: [AppComponent],
})
export class AppModule {}
