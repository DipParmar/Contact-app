import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Contact } from '../interface/contact';
import { ContactService } from '../contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ca-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {

  public contacts: Contact[] = [];
  private contactSub;
  public search = '';

  /**
   *
   */
  constructor(private contactServ: ContactService,
    private router: Router,
    private changeRef: ChangeDetectorRef) { }

  /**
   *
   */
  ngOnInit() {
    this.contactSub = this.contactServ.fetchContacts().subscribe(
      contacts => {
        this.contacts = contacts;
        this.changeRef.markForCheck();
      },
      error => {
        console.error(error);
      },
    )
  }

  /**
   *
   */
  edit(index: number) {
    this.router.navigate(['/contacts', index]);
  }

  /**
   *
   */
  delete(index: number) {
    this.contactServ.deleteContact(index).subscribe(
      contacts => {
        this.contacts = contacts;
        this.changeRef.markForCheck();
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   *
   */
  ngOnDestroy() {
    this.contactSub.unsubscribe();
  }
}
