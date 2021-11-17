import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";
import { SoftwareInterface } from "./software.interface";

const SOFTWARE_TABLE = "softwares";

@Injectable({
  providedIn: "root",
})
export class AplicativoService {
  constructor(private store: AngularFirestore) {}

  public addNewSoftwareFromProp(
    name,
    nickname,
    consideration,
    brief,
    urlApp,
    inMaintenance,
    image
  ) {
    const software = new SoftwareInterface(
      name,
      nickname,
      consideration,
      brief,
      urlApp,
      inMaintenance,
      image
    );

    this.saveSoftware(software);
  }

  public addNewSoftwareFromObj(software: SoftwareInterface) {
    this.saveSoftware(software);
  }

  private saveSoftware(software: SoftwareInterface) {
    this.store.collection(SOFTWARE_TABLE).add(Object.assign({}, software));
  }

  public getAllSoftwares() {
    return this.getObservable(this.store.collection(SOFTWARE_TABLE));
  }

  getObservable = (collection: AngularFirestoreCollection<any>) => {
    const subject = new BehaviorSubject<any[]>([]);
    collection.valueChanges().subscribe((val: any[]) => {
      subject.next(val);
    });
    return subject;
  };
}
