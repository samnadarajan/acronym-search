import { Injectable } from "@angular/core";
import {map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {Acronym} from "../../model/acronym.model";
import {config} from "../../app.config";
import {AppState} from "../../store/app.state";
import {Store} from "../../../../node_modules/@ngrx/store";
import * as AcronymActions from "../../store/actions/acronym.actions";
import {Project} from "../../model/project.model";

@Injectable({
  providedIn: "root"
})
export class SearchService {
    result: Observable<Acronym[]>;
    searched = false;
    constructor(private db: AngularFirestore) {}

    search(code: string, projectName: string): Observable<any> {
        return this.db.collection(
            config.acronyms,
                ref => ref.where("code", "==", code)
                    .where("project", "==", projectName)
                    .limit(1))
            .snapshotChanges();
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
