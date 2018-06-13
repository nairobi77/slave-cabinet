import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AddressResponse} from './domain/address-response';
import {PassportRegistrationResult} from './domain/passport-registration-result';
import {ImageLinkResponse} from './domain/image-link-response';


@Injectable()
export class HttpClientService {
  private authToken = 'Token 6cb3e77f96456594b423c6e2b7781ad43aef6b7e';
  private dadataAddressServiceUrl = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
  private fileApiUrl = 'https://slave-cabinet-api.cfapps.io/nextfile';
  private sendResultUrl = 'https://slave-cabinet-api.cfapps.io/result/';
  private dadataHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': this.authToken

    })
  };
  private fileHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    })
  };
  private resultHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  constructor(private http: HttpClient) {
  }

  getAddressSuggestions(part: string): Observable<AddressResponse> {
    const data = {'query': part};
    return this.http.post<AddressResponse>(this.dadataAddressServiceUrl, data, this.dadataHttpOptions);
  }

  saveData(passportRegistrationResult: PassportRegistrationResult, imageSrc: String) {
    console.log('This is what we send on back: ');
    console.log(JSON.stringify(passportRegistrationResult));
    this.http.post<any>(this.sendResultUrl + imageSrc, passportRegistrationResult, this.resultHttpOptions)
      .subscribe(d => console.log(d));
  }

  getNewImage(): Observable<ImageLinkResponse> {
    return this.http.get<ImageLinkResponse>(this.fileApiUrl, this.fileHttpOptions);
  }

}
