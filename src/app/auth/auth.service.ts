import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable({ providedIn: 'root' })

export class AuthService {
    constructor(private http: HttpClient) { }

    signupUser(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD7dfjvKWFqx-fYeUopXk6bnvgIg5PwcoI',
            {
                email,
                password,
                returnSecureToken: true
            }
        ).pipe(catchError(errorResponse => {
            let errorMessage = 'Oops! An unknown error occurred.';
            if (!errorResponse.error || !errorResponse.error.error) {
                return throwError(errorMessage);
            }
            switch (errorResponse.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'This email address is already in use.';
            }
            return throwError(errorMessage);
        }));
    }
}
