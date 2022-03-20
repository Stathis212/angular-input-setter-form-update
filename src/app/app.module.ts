import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ChildComponentOne } from './components/child-component-one';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, ChildComponentOne],
  bootstrap: [AppComponent],
})
export class AppModule {}
