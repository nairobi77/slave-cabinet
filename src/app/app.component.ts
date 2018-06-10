import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
  addressCtrl: FormControl;
  dateCtrl: FormControl;

  filteredAddresses = [''];
  private imageName: string;

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
    return this.filteredAddresses.length === 1;
  }

  private dadataChoosenValidator = () => {
    return this.dadataNotChoosen() ? null : {notComplete: true};
  }

  private dataCtrlHasSpaces = (control: FormControl) => {
    console.log(control);
    return (!control.value.toString().includes('_')) ? null : {notComplete: true};
  }

}
