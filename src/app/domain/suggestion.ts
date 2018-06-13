import {DadataData} from './dadata-data';

export class Suggestion {
  constructor(
     public value: string,
     public unrestricted_value: string,
     public data: DadataData
  ) {
  }
}
