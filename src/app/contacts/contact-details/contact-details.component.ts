import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../interface/contact';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ca-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit, OnDestroy {

  public contact: Contact;
  public index: number;
  public contactSub: Subscription;
  public contactForm: any;

  /**
   *
   */
  constructor(private route: ActivatedRoute,
    private router: Router,
    private contactServ: ContactService,
    private formBuilder: FormBuilder) { }

  /**
   * 
   */
  ngOnInit() {
    this.index = +this.route.snapshot.paramMap.get('id');
    this.contact = this.contactServ.getContact(this.index);
    this.buildContactForm();
  }

  /**
   *
   */
  buildContactForm() {
    this.contactForm = this.formBuilder.group({
      name: [this.contact.name, Validators.required],
      number : [this.contact.numbers[0], Validators.required]
    });
  }

  /**
   *
   */
  updateContact() {
    this.contact.name = this.contactForm.get('name').value;
    this.contact.numbers[0] = this.contactForm.get('number').value;
    console.log(this.contact);
    this.contactServ.updateContact(this.index, this.contact);
    this.router.navigate(['contacts']);
  }

  /**
   *
   */
  ngOnDestroy(){
    //this.contactSub.unsubscribe();
  }

}
