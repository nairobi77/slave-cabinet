import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {HttpClientService} from './http-client.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {
  imageSrc: any;
  private backCloudApi = 'https://slave-cabinet-api.cfapps.io';

  registrationDataForm: FormGroup;

  filteredAddresses: string[];
  private imageName: string;

  constructor(
    private fb: FormBuilder,
    private httpClientService: HttpClientService
  ) {
    this.registrationDataForm = fb.group({
        addressCtrl: fb.control('', [Validators.required]),
        dateCtrl: fb.control('', [Validators.required]),
      }
    );
  }

  search(event) {
    this.httpClientService.getAddressSuggestions(event.query).subscribe(data => {
      this.filteredAddresses = data.suggestions.map(suggestion => suggestion.value);
    });
  }

  register() {
    this.saveData(this.registrationDataForm);
    this.getImageFromService();
    setTimeout(() => {
        this.registrationDataForm.reset();
      },
      100);
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
    this.httpClientService.saveData(formGroup, this.imageName);
  }

  ngOnInit(): void {
    this.getImageFromService();
  }

  private dadataNotChoosen(): boolean {
    return this.filteredAddresses.length !== 1;
  }

  private dadataChoosenValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!(control.dirty || control.touched)) {
        return null;
      } else {
        return this.dadataNotChoosen() ? null : {phoneNumber: true};
      }
    };
  }

}
