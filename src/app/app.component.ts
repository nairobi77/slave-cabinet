import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClientService} from './http-client.service';
import {DadataData} from './domain/dadata-data';
import {PassportRegistrationResult} from './domain/passport-registration-result';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {
  imageSrc: any;
  private backCloudApi = 'https://slave-cabinet-api.cfapps.io';

  registrationDataForm: FormGroup;
  addressCtrl: FormControl;
  dateCtrl: FormControl;

  filteredAddresses = [''];
  private imageName: string;
  private dadataResponse: DadataData[];

  constructor(
    private fb: FormBuilder,
    private httpClientService: HttpClientService
  ) {
    this.addressCtrl = fb.control('', [Validators.required, this.dadataChoosenValidator]);
    this.dateCtrl = fb.control('', [Validators.required, this.dataCtrlHasSpaces]);
    this.registrationDataForm = fb.group({
        address: this.addressCtrl,
        date: this.dateCtrl
      }
    );
  }

  search(event) {
    this.httpClientService.getAddressSuggestions(event.query).subscribe(data => {
      this.filteredAddresses = data.suggestions.map(suggestion => suggestion.value);
      this.dadataResponse = data.suggestions.map(suggestion => suggestion.data);
    });
  }

  register() {
    this.saveData(this.registrationDataForm);
    this.getImageFromService();
    this.filteredAddresses = [''];
    this.addressCtrl.setValue('');
    this.dateCtrl.setValue('');
  }

  isInvalid(): boolean {
    return !this.registrationDataForm.touched || !this.registrationDataForm.valid;
  }

  getImageFromService() {
    this.httpClientService.getNewImage().subscribe(data => {
      this.imageSrc = this.backCloudApi + '/images/' + data.link;
      this.imageName = data.link;
    });
  }

  saveData(formGroup: FormGroup) {
    const passportRegistrationResult = new PassportRegistrationResult(
      formGroup.value.date,
      formGroup.value.address,
      this.dadataResponse[0] );
    console.log(passportRegistrationResult);
    this.httpClientService.saveData(passportRegistrationResult, this.imageName);
  }

  ngOnInit(): void {
    this.getImageFromService();
  }

  private dadataNotChoosen(): boolean {
    return this.filteredAddresses.length === 1;
  }

  private dadataChoosenValidator = () => {
    return this.dadataNotChoosen() ? null : {notComplete: true};
  }

  private dataCtrlHasSpaces = (control: FormControl) => {
    return (!control.value.toString().includes('_')) ? null : {notComplete: true};
  }

}
