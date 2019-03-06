import { Injectable } from "@angular/core";
import {config} from "../../../../app.config";
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable, of} from "rxjs";
import {Project} from "../../../../model/project.model";
import {DefaultProject} from "../../../../model/default-project.model";

@Injectable({
  providedIn: "root"
})
export class ProjectService {
    constructor(public db: AngularFirestore) {}

    getProjects(): Observable<any> {
        return this.db.collection(config.projects, ref => ref.orderBy("name")).snapshotChanges();
    }

    addProject(project: Project) {
        return this.db.collection(config.projects).add(project);
    }

    getDefaultProject(uid: string): Observable<any> {
        return this.db.collection(config.defaultProjects, ref => ref.where("uid", "==", uid).limit(1)).snapshotChanges();
    }

    changeDefault(defaultProject: DefaultProject) {
        if (defaultProject.id) {
            return this.update(defaultProject);
        } else {
            return this.add(defaultProject);
        }
    }

    add(defaultProject: DefaultProject) {
        return this.db.collection(config.defaultProjects).add(defaultProject);
    }

    update(defaultProject: DefaultProject) {
        return this.db.collection(config.defaultProjects).doc(defaultProject.id).update(defaultProject);
    }

    delete(projectId: string) {
        return this.db.collection(config.projects).doc(projectId).delete();
    }
}
