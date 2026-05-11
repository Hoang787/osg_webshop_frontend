import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {delay, map, Observable} from 'rxjs';
import {NominatimResponse} from '../Class/NominatimResponse';

@Injectable({
  providedIn: 'root'
})
export class NominatimService {

  BASE_NOMINATIM_URL: string = 'nominatim.openstreetmap.org';
  searchResults: NominatimResponse[] = [];

  constructor (private http: HttpClient) {
  }

  async geocodeAddresses(addresses: any[]): Promise<any[]> {

    const results: any[] = [];

    for (const addr of addresses) {
      const res = await fetch(
        "https://nominatim.openstreetmap.org/search?q=" + addr + "&format=json", { headers: { "User-Agent": "http://localhost:4200" }}
      );
      const data = await res.json();

      if (data[0]) {
        results.push({
          address: addr,
          lat: data[0].lat,
          lon: data[0].lon
        });
      }

      delay(2000); // respect rate limit
    }

    return results;
  }

}
