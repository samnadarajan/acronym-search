import { Injectable } from "@angular/core";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Acronym} from "../model/acronym.model";
import {config} from "../app.config";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class SearchService {
  acronyms: AngularFirestoreCollection<Acronym>;

  constructor(private db: AngularFirestore) {
    this.acronyms = this.db.collection<Acronym>(config.collectionEndpoint);
  }

  search(code: string) {
      return this.db.collection("acronyms", ref => ref.where("code", "==", code).limit(1)).snapshotChanges()
          .pipe(map(changes => {
              if (changes.length > 0) {
                  return changes.map(a => {
                      const data = a.payload.doc.data() as Acronym;
                      data.id = a.payload.doc.id;
                      return data;
                  });
              } else {
                  return [{} as Acronym];
              }
          }));
  }
}
