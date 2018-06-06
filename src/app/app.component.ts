import {Component, NgModule} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {HttpClientService} from './http-client.service';
import {DateAdapter, MAT_DATE_LOCALE} from '@angular/material';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
@NgModule({
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
  ],
})
export class AppComponent {

  registrationDataForm: FormGroup;
  addressCtrl: FormControl;
  dateCtrl: FormControl;
  filteredAddresses: Suggestion[];

  constructor(
    private dateAdapter: DateAdapter<Date>,
    private fb: FormBuilder,
    private httpClientService: HttpClientService
  ) {
    this.dateAdapter.setLocale('ru-RU');
    this.addressCtrl = fb.control('', [Validators.required]);
    this.dateCtrl = fb.control('', [Validators.required,  Validators.max(12)]);
    this.registrationDataForm = fb.group({
        // dateCtrl: [null, [ Validators.required, Validators.max(10)]]
      }
    );
    this.registrationDataForm.addControl('addressCtrl', this.addressCtrl);
    this.registrationDataForm.addControl('dateCtrl', this.dateCtrl);
    this.addressCtrl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(val => this.getAddressSuggestions(val));
  }

  getAddressSuggestions(val: string) {
    this.httpClientService.getAddressSuggestions(val).subscribe(data => {
      console.log(data);
      this.filteredAddresses = data.suggestions;
    });
  }

  register() {
    this.httpClientService.saveData(this.registrationDataForm);
  }

  isInvalid(): boolean {
    return !this.registrationDataForm.touched || !this.registrationDataForm.valid;
  }

}
