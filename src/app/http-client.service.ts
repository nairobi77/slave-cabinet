import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class HttpClientService {
  private authToken = 'Token 6cb3e77f96456594b423c6e2b7781ad43aef6b7e';
  private dadataAddressServiceUrl = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': this.authToken

    })
  };


  constructor(private http: HttpClient) {
  }

  getAddressSuggestions(part: string): Observable<AddressResponse> {
    const data = {'query': part};
    return this.http.post<AddressResponse>(this.dadataAddressServiceUrl, data, this.httpOptions);
  }
  saveData(formData: any) {
    console.log(formData);
  }

}
