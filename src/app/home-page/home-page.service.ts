import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { BehaviorSubject } from "rxjs";
import { SoftwareInterface } from "./software.interface";

@Injectable({
  providedIn: "root",
})
export class AplicativoService {
  constructor(private store: AngularFirestore) {}

  public addNewSoftware() {
    const software = new SoftwareInterface(
      "smart-student-web",
      "smart-student-web",
      "Sistema basico para controle de alunos e aulas de qualquer pequena escola",
      "Facilite sua vida de lançar notas e calcular medias utilizando este simples app",
      "http://www.google.com.br",
      false,
      null
    );

    this.store.collection("softwares").add(Object.assign({}, software));
  }

  public getAllSoftwares(){
    return this.getObservable(this.store.collection("softwares"));
  }

   getObservable = (collection: AngularFirestoreCollection<any>) => {
    const subject = new BehaviorSubject<any[]>([]);
    collection.valueChanges().subscribe((val: any[]) => {
      subject.next(val);
    });
    return subject;
  };
  
}
