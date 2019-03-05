import {ChangeDetectionStrategy, Component} from "@angular/core";
import {AuthService} from "../../services/auth/auth.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

    constructor(public authService: AuthService) {}
}
