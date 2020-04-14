import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonsListComponent } from './persons-list/persons-list.component';
import { PersonDetailsComponent } from './person-details/person-details.component';

@NgModule({
  declarations: [PersonsListComponent, PersonDetailsComponent],
  exports: [PersonsListComponent, PersonDetailsComponent],
  imports: [CommonModule],
})
export class PersonsModule {}
