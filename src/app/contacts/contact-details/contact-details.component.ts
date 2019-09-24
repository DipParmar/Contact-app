import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../interface/contact';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators, FormArray } from '@angular/forms';

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

  get numbers(): FormArray {
    return this.contactForm.get('numbers') as FormArray;
  }

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
    let contact;
    if (this.contact != null) {
      contact = this.contact;
    } else {
      contact = {
        name: '',
        numbers: ['']
      };
    }

    this.contactForm = this.formBuilder.group({
      name: [contact.name || '', Validators.required],
      numbers: this.formBuilder.array(this.updateNumbers())
    });
  }

  /**
   *
   */
  buildNumberField(num = ''): any {
    return this.formBuilder.group({
      number: [num, [Validators.required, Validators.pattern(/^\d*$/)]]
    });
  }

  /**
   *
   */
  updateNumbers(): any {
    const numbers = [];
    if (this.contact == null) {
      return [this.buildNumberField()];
    } else {
      for (let i = 0; i < this.contact.numbers.length; ++i) {
        numbers[i] = this.buildNumberField(this.contact.numbers[i]);
      }
      return numbers;
    }
  }

  /**
   *
   */
  createOrUpdateContact() {
    const contact = {
      name: this.contactForm.get('name').value,
      numbers: []
    };

    for (const num of this.contactForm.get('numbers').value) {
      contact.numbers.push(num.number);
    }

    if (this.index > -1) {
      this.contactServ.updateContact(this.index, contact);
    } else {
      this.contactServ.addContact(contact);
    }
    this.router.navigate(['contacts']);
  }

  addNumber() {
    this.numbers.push(this.buildNumberField());
  }

  removeNumber(index) {
    this.numbers.removeAt(index);
  }

  /**
   *
   */
  ngOnDestroy() {
    // this.contactSub.unsubscribe();
  }

  hasError(element) {
    if(element.touched && !element.valid) {
      return element.hasError('pattern') || element.hasError('required');
    } else {
      return false;
    }
  }

}
