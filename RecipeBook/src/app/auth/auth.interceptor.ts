import { HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(private AuthService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.AuthService.getToken();
        const authReq = req.clone({
            headers: req.headers.set('Authorization', "Bearer " + token)
        });
        console.log(authReq);

        return next.handle(authReq)
    }
}