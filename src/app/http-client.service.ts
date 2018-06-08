import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FormGroup} from '@angular/forms';


@Injectable()
export class HttpClientService {
  private authToken = 'Token 6cb3e77f96456594b423c6e2b7781ad43aef6b7e';
  private dadataAddressServiceUrl = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
  private fileApiUrl = 'http://slave-cabinet-api.cfapps.io/nextfile';
  private sendResultUrl = 'http://slave-cabinet-api.cfapps.io/result';
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

  saveData(formData: FormGroup, imageSrc: String) {

    this.http.post<any>(this.sendResultUrl + imageSrc, formData.value, this.resultHttpOptions)
      .subscribe(d => console.log(d));
  }

  getNewImage(): Observable<ImageLinkResponse> {
    return this.http.get<ImageLinkResponse>(this.fileApiUrl, this.fileHttpOptions);
  }

}
