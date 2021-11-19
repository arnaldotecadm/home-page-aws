import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class LoadingService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading$$.asObservable();

  start(){
    this.setLoading(true);
  }

  stop(){
    this.setLoading(false);
  }

  setLoading(isLoading: boolean) {
    this.isLoading$$.next(isLoading);
  }
}
