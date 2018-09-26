import { Injectable } from "@angular/core";
import {map} from "rxjs/operators";
import {config} from "../../app.config";
import {AngularFirestore} from "../../../../node_modules/@angular/fire/firestore";
import {Project} from "../../model/project.model";
import {AppState} from "../../store/app.state";
import {Store} from "../../../../node_modules/@ngrx/store";
import * as ProjectActions from "../../store/actions/project.actions";

@Injectable({
  providedIn: "root"
})
export class ProjectService {
    constructor(private db: AngularFirestore, private _store: Store<AppState>) {}

    getProjects() {
        this.db.collection(config.projects).snapshotChanges()
          .pipe(map(changes => {
              if (changes.length > 0) {
                  return changes.map(a => {
                      const data = a.payload.doc.data() as Project;
                      data.id = a.payload.doc.id;
                      return data;
                  });
              } else {
                  return [];
              }
          })).subscribe(response => {
              this._store.dispatch(new ProjectActions.LoadProjects(response));
            });
    }
}
