import { Injectable, Inject } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  //modelServerUrl = "https://wwwdev.ebi.ac.uk/pdbe-k8s/pdbe/coordinates/v1/query-many";



  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    responseType: 'json' as 'json'
  };

  httpBlobOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    responseType: 'blob' as 'json'
  };

  constructor(private http: HttpClient, @Inject('DOWNLOAD_API_URL') private fileDownloadUrl: string,) {
  }

  //postModelServer(msConfig) : Observable<any>{
  //    return this.http.post<any>(this.modelServerUrl,msConfig, this.httpOptions)
  //    .pipe(
  //        tap(
  //          data => {
  //            return data;
  //          }
  //        ),
  //        catchError(this.handleError())
  //      );
  //}

  postFileDownloadServer(apiType: string, fdsType: string, fdsConfig: string): Observable<any> {
    return this.http.post<any>(`${this.fileDownloadUrl}${apiType}/${fdsType}`, fdsConfig, this.httpOptions)
      .pipe(
        tap(
          data => {
            return data;
          }
        ),
        catchError((err => {
          let errMsg = "";
          if (err.status == 422) {
            errMsg = `${err.status}, ${err.statusText}. ${err.error.detail[0].msg}`;
          }
          else {
            errMsg = `${err.status}, ${err.statusText}`;
          }
          //console.log("err = ",err,err.status,err.statusText, err.error.detail[0].msg);
          return throwError(errMsg);
        }))
      );
  }

  getFileDownloadServer(hashedurl: string): Observable<any> {
    //return this.http.get<any>(hashedurl, this.httpBlobOptions)
    return this.http.get<any>(hashedurl, { observe: 'response', responseType: 'blob' as 'json' })
      .pipe(
        tap(
          data => {
            return data;
          }
        ),
        catchError(this.handleError(hashedurl))
      );
  }

  //     catchError( err => {
  //console.log('Handling error locally and rethrowing it...', err.error.detail[0].msg);
  //return throwError(err.error.detail[0]);
  //})
  private handleError(fdsConfig: string) {
    return (error: Response): Observable<any> => {
      console.log();
      const errMsg = `Error: ${error.status}, ${error.statusText}`;
      return throwError(errMsg);
    };
  }

}
