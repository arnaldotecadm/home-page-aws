import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";
import { SoftwareInterface } from "./software.interface";

const SOFTWARE_TABLE = "softwares";

@Injectable({
  providedIn: "root",
})
export class SoftwareService {
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
    return this.store.collection(SOFTWARE_TABLE).snapshotChanges();
  }

  public getById(identificacao) {
    return this.store
      .collection(SOFTWARE_TABLE)
      .doc(identificacao)
      .valueChanges();
  }

  public deleteById(identificacao) {
    return this.store.collection(SOFTWARE_TABLE).doc(identificacao).delete();
  }

  public updateRegistro(identificacao, documento) {
    return this.store
      .collection(SOFTWARE_TABLE)
      .doc(identificacao)
      .set(documento);
  }

  public salvarRegistro(documento) {
    return this.store.collection(SOFTWARE_TABLE).add(documento);
  }

  getObservable = (collection: AngularFirestoreCollection<any>) => {
    const subject = new BehaviorSubject<any[]>([]);
    collection.valueChanges().subscribe((val: any[]) => {
      subject.next(val);
    });
    return subject;
  };
}
