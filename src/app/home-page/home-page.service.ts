import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { SoftwareInterface } from "./software.interface";

const API = environment.ApiUrl;

@Injectable({
  providedIn: "root",
})
export class AplicativoService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<SoftwareInterface[]>(
      API + "/user-management/software/all_homepage"
    );
  }
}
