import { Injectable } from "@angular/core";
import {config} from "../../app.config";
import {AngularFirestore} from "../../../../node_modules/@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class ProjectService {
    constructor(public db: AngularFirestore) {}

    getProjects() {
        return this.db.collection(config.projects).snapshotChanges();
    }
}
