import { Injectable } from "@angular/core";
import {config} from "@app/app.config";
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Project} from "@app/model/project.model";
import {DefaultProject} from "@app/model/default-project.model";

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

    /**
     * Retrieve list of all default projects for registered users
     * @returns {Observable<DefaultProject>}
     */
    getDefaultProject(uid: string): Observable<any> {
        return this.db.collection(config.defaultProjects).valueChanges();
    }

    setProjectAsDefault(userProject: DefaultProject) {
        this.db
            .collection(config.defaultProjects, ref => ref.where("uid", "==", userProject.uid))
            .valueChanges()
            .subscribe(data => {
                console.log("in search", data);
            });
    }
}
