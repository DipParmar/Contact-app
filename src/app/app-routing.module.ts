import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailsComponent } from './contacts/contact-details/contact-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'contacts', pathMatch: 'full' },
  { path: 'contacts', component: ContactListComponent },
  { path: 'contacts/:id', component: ContactDetailsComponent },
  { path: '**', redirectTo: 'contacts', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
