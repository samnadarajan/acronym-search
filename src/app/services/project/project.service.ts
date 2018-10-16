import { Injectable } from "@angular/core";
import {config} from "../../app.config";
import {AngularFirestore} from "../../../../node_modules/@angular/fire/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ProjectService {
    constructor(public db: AngularFirestore) {}

    getProjects(): Observable<any> {
        return this.db.collection(config.projects).valueChanges();
    }
}
