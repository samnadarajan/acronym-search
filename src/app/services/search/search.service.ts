import { Injectable } from "@angular/core";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {Acronym} from "../../model/acronym.model";
import {config} from "../../app.config";
import {ProjectService} from "../project/project.service";
import {AppState} from "../../app.state";
import {Store} from "../../../../node_modules/@ngrx/store";
import * as AcronymActions from "../../actions/acronym.actions";
import {Project} from "../../model/project.model";

@Injectable({
  providedIn: "root"
})
export class SearchService {
    result: Observable<Acronym[]>;
    searched = false;
    constructor(private db: AngularFirestore, private projectService: ProjectService, private _store: Store<AppState>) {}

    search(code: string, project: Project) {
        this.searched = true;
        this.db.collection(
            config.acronyms,
                ref => ref.where("code", "==", code)
                                    .where("project", "==", project.name)
                    .limit(1))
            .snapshotChanges()
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
          })).subscribe(response => {
              this._store.dispatch(new AcronymActions.AddAcronym(response[0]));
            });
    }

    save(acronym: Acronym, project: Project) {
        if (acronym.id) {
            this.update(acronym);
        } else {
            acronym.project = project.name;
            this.add(acronym);
        }
    }

    add(acronym: Acronym) {
        this.db.collection(config.acronyms).add(acronym);
    }

    update(acronym: Acronym) {
        this.db.collection(config.acronyms).doc(acronym.id).update(acronym);
    }


}
