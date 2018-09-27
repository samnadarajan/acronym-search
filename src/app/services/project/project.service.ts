import { Injectable } from "@angular/core";
import {config} from "../../app.config";
import {AngularFirestore} from "../../../../node_modules/@angular/fire/firestore";
import {AppState} from "../../store/app.state";
import {Store} from "../../../../node_modules/@ngrx/store";

@Injectable({
  providedIn: "root"
})
export class ProjectService {
    constructor(private db: AngularFirestore, private _store: Store<AppState>) {}

    getProjects() {
        return this.db.collection(config.projects).snapshotChanges();
    }
}
