import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CounterModule } from './counter/counter.module';
import { PersonsModule } from './persons/persons.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CounterModule, PersonsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
