import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"; import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoadingService } from './../../../services/loading.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(public loadingService: LoadingService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  this.loadingService.show();
  return next.handle(req).pipe(finalize(() => this.loadingService.hide()));
}
}
