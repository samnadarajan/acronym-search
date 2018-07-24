import { Injectable } from "@angular/core";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "angularfire2/firestore";
import {Acronym} from "../model/acronym.model";
import {config} from "../app.config";

@Injectable({
  providedIn: "root"
})
export class SearchService {
  acronyms: AngularFirestoreCollection<Acronym>;
  private acronymDoc: AngularFirestoreDocument<Acronym>;

  constructor(db: AngularFirestore) {
    this.acronyms = db.collection<Acronym>(config.collectionEndpoint);
  }
}
