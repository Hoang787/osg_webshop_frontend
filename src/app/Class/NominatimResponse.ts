

export class NominatimResponse {

  public latitude: number;
  public longitude: number;
  public displayName: string;


  constructor (
    latitude: number,
    longitude: number,
    displayName: string
  ) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.displayName = displayName;
  }


}
