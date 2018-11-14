import {TestBed, async} from "@angular/core/testing";
import {AppComponent} from "./app.component";
import {MaterialModule} from "./material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BehaviorSubject, of} from "rxjs";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ResultComponent} from "./components/result/result.component";
import {AngularFirestoreModule, AngularFirestore} from "@angular/fire/firestore";
import {RouterTestingModule} from "@angular/router/testing";
import {AngularFireAuth} from "@angular/fire/auth";
import {Store, StoreModule} from "@ngrx/store";
import {AuthService} from "@app/modules/auth/services/auth/auth.service";
import {NO_ERRORS_SCHEMA} from "@angular/core";

const FirestoreStub = {
    collection: (name: string) => ({
        doc: (_id: string) => ({
            valueChanges: () => new BehaviorSubject({ foo: "bar" }),
            set: (_d: any) => new Promise((resolve, _reject) => resolve()),
        }),
    }),
};

const FireAuthStub = {
    auth: {
        onAuthStateChanged: () => {}
    },
    authState: of({email: "test@test.com", password: "password"})
};

const AuthServiceStub = {
    logOut: jest.fn()
};

describe("AppComponent", () => {
    let fixture, component, compiled;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                ResultComponent
            ],
            imports: [
                MaterialModule,
                FormsModule,
                ReactiveFormsModule,
                AngularFirestoreModule,
                BrowserAnimationsModule,
                RouterTestingModule,
                StoreModule.forRoot({})
            ],
            providers: [
                { provide: AngularFirestore, useValue: FirestoreStub },
                { provide: AngularFireAuth, useValue: FireAuthStub },
                { provide: AuthService, useValue: AuthServiceStub},
                Store
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.debugElement.componentInstance;
        compiled = fixture.debugElement.nativeElement;

    }));
    it("should create the app", async(() => {
        expect(component).toBeTruthy();
    }));

    it("should have a menu with links for acronym search", () => {
        component.user$ = of({uid: "23423f", email: "test@test.com", photoURL: "http://www.pictures.com/sam.jpg"});
        fixture.detectChanges();

        const projectsButton = compiled.querySelectorAll("button.acronym");
        expect(projectsButton).toBeTruthy();
    });

    it("should have a menu with links for a project", () => {
        component.user$ = of({uid: "23423f", email: "test@test.com", photoURL: "http://www.pictures.com/sam.jpg"});
        fixture.detectChanges();

        const projectsButton = compiled.querySelectorAll("button.projects");
        expect(projectsButton).toBeTruthy();
    });

    it("should have a menu with a link for reporting issues", () => {
        component.user$ = of({uid: "23423f", email: "test@test.com", photoURL: "http://www.pictures.com/sam.jpg"});
        fixture.detectChanges();

        const reportIssuesButton = compiled.querySelector("button.report");
        expect(reportIssuesButton).toBeTruthy();
    });

    it("should have a menu with a link for logging out", () => {
        spyOn(component.authService, "logOut");
        component.user$ = of({uid: "23423f", email: "test@test.com", photoURL: "http://www.pictures.com/sam.jpg"});
        fixture.detectChanges();

        const logoutButton = compiled.querySelector("button.logout");
        expect(logoutButton).toBeTruthy();

        logoutButton.click();
        fixture.detectChanges();

        expect(component.authService.logOut).toHaveBeenCalled();
    });

    it("should log the user out when logging out", async(() => {
        component.projectList$ = of([]);
        component.acronymResult$ = of({code: "", id: "2345efdr3"});
        spyOn(component.authService, "logOut");
        component.user$ = of({uid: "23423f", email: "test@test.com"});

        fixture.detectChanges();

        const logoutButton = compiled.querySelector("button.logout");
        logoutButton.click();

        fixture.detectChanges();

        expect(component.authService.logOut).toHaveBeenCalled();
    }));
});
