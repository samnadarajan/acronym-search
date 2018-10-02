import { Injectable } from "@angular/core";
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {Acronym} from "../../model/acronym.model";
import {config} from "../../app.config";

@Injectable({
  providedIn: "root"
})
export class SearchService {
    result: Observable<Acronym[]>;
    constructor(public db: AngularFirestore) {}

    search(code: string, projectName: string): Observable<any> {
        return this.db.collection(
            config.acronyms,
                ref => ref.where("code", "==", code)
                    .where("project", "==", projectName)
                    .limit(1))
            .snapshotChanges();
    }

    save(acronym: Acronym) {
        if (acronym.id) {
            return this.update(acronym);
        } else {
            return this.add(acronym);
        }
    }

    add(acronym: Acronym) {
        return this.db.collection(config.acronyms).add(acronym);
    }

    update(acronym: Acronym) {
        return this.db.collection(config.acronyms).doc(acronym.id).update(acronym);
    }


}
