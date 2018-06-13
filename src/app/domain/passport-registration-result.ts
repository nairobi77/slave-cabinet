import {DadataData} from './dadata-data';

export class PassportRegistrationResult {
  constructor(public dateCtrl: string, public addressCtrl: string,  public dadataSuggestion: DadataData) {
  }
}
