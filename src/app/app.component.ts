import {Component, OnInit} from "@angular/core";
import {AngularFirestore} from "angularfire2/firestore";
import {Observable} from "rxjs";
import {config} from "./app.config";
import {SearchService} from "./services/search.service";
import {map} from "rxjs/operators";
import {Acronym} from "./model/acronym.model";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
    title = "Acronym Search";
    acronyms: Observable<any[]>;

    constructor(private db: AngularFirestore, private searchService: SearchService) {}

    ngOnInit() {
        this.acronyms = this.db.collection(config.collectionEndpoint).snapshotChanges()
            .pipe(map(changes => {
                return changes.map(a => {
                    const data = a.payload.doc.data() as Acronym;
                    data.id = a.payload.doc.id;
                    return data;
                });
            }));
    }
}
