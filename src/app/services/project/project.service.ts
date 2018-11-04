import { Injectable } from "@angular/core";
import {config} from "@app/app.config";
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Project} from "@app/model/project.model";

@Injectable({
  providedIn: "root"
})
export class ProjectService {
    constructor(public db: AngularFirestore) {}

    getProjects(): Observable<any> {
        return this.db.collection(config.projects).valueChanges();
    }

    addProject(project: Project) {
        return this.db.collection(config.projects).add(project);
    }
}
