import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'auth_token';

  // Initialize with false first, we'll update it in the constructor
  private _authStatus = new BehaviorSubject<boolean>(false);
  authStatus$ = this._authStatus.asObservable();

  constructor(private router: Router) {
    const token = this.getToken();
    this._authStatus.next(!!token); // this ensures the correct state is emitted after refresh
  }

  login(credentials: { username: string; password: string }): Observable<{ token: string }> {
    const mockUsername = 'admin';
    const mockPassword = 'password123';

    if (credentials.username === mockUsername && credentials.password === mockPassword) {
      const fakeToken = 'mock-jwt-token-12345';
      this.setToken(fakeToken);
      this._authStatus.next(true); // notify subscribers
      return of({ token: fakeToken }).pipe(delay(500));
    } else {
      return throwError(() => new Error('Invalid username or password'));
    }
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this._authStatus.next(false); // notify logout
    this.router.navigate(['/login']);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
