import { Injectable } from "@angular/core";
import {AngularFirestore} from "angularfire2/firestore";
import {Acronym} from "../model/acronym.model";
import {config} from "../app.config";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SearchService {
    result: Observable<Acronym[]>;
    searched = false;
    constructor(private db: AngularFirestore) {}

    search(code: string) {
        this.searched = true;
        this.result = this.db.collection(config.collectionEndpoint, ref => ref.where("code", "==", code).limit(1)).snapshotChanges()
          .pipe(map(changes => {
              if (changes.length > 0) {
                  return changes.map(a => {
                      const data = a.payload.doc.data() as Acronym;
                      data.id = a.payload.doc.id;
                      return data;
                  });
              } else {
                  return [{code: code} as Acronym];
              }
          }));
    }

    save(acronym: Acronym) {
        if (acronym.id) {
            this.update(acronym);
        } else {
            this.add(acronym);
        }
    }

    add(acronym: Acronym) {
        this.db.collection(config.collectionEndpoint).add(acronym);
    }

    update(acronym: Acronym) {
        this.db.collection(config.collectionEndpoint).doc(acronym.id).update(acronym);
    }


}
