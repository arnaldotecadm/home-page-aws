import {
  HttpErrorResponse,
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpProgressEvent,
  HttpRequest,
  HttpResponse,
  HttpSentEvent,
  HttpUserEvent,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { TokenService } from "../token/token.service";
import { UserService } from "../user/user.service";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private usuarioService: UserService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
  > {
    if (this.tokenService.hasToken()) {
      const token = this.tokenService.getToken();
      req = req.clone({
        setHeaders: {
          Authorization: "Bearer " + token,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        /* TODO remover essagambiarra */
        //Status = 0 Gambiarra por causa do CORS local
        if (error.status === 401 || error.status == 0) {
          this.usuarioService.logout();
          this.router.navigate(["sigin-in"]);
        }
        throw new HttpErrorResponse(error);
      })
    );
  }
}
