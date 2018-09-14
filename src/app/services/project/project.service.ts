import { Injectable } from "@angular/core";
import {map} from "rxjs/operators";
import {config} from "../../app.config";
import {Observable} from "rxjs";
import {AngularFirestore} from "../../../../node_modules/@angular/fire/firestore";
import {Project} from "../../model/project.model";

@Injectable({
  providedIn: "root"
})
export class ProjectService {
    projects: Observable<Project[]>;
    currentProject: Project;
    constructor(private db: AngularFirestore) { }

    getProjects() {
        this.projects = this.db.collection(config.projects).snapshotChanges()
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
          }));
    }

    setProject(project: Project) {
        this.currentProject = project;
    }
}
