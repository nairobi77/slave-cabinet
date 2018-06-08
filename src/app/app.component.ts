import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {HttpClientService} from './http-client.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {
  imageSrc: any;

  registrationDataForm: FormGroup;

  filteredAddresses: string[];
  private imageName: string;

  constructor(
    private fb: FormBuilder,
    private httpClientService: HttpClientService
  ) {
    this.registrationDataForm = fb.group({
      addressCtrl: fb.control('', [Validators.required]),
      dateCtrl: fb.control('', [Validators.required, Validators.minLength(10)]),
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
      this.imageSrc = 'http://slave-cabinet-api.cfapps.io/images/' + data.link;
      this.imageName = data.link;
    });
  }

  saveData(formGroup: FormGroup) {
    this.httpClientService.saveData(formGroup, this.imageName);
  }

  ngOnInit(): void {
    this.getImageFromService();
  }
}
