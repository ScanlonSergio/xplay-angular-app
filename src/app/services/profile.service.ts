import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class ProfileService {
  fetchUserDetails() {
    return of({
      name: 'Demo',
      username: 'Demo123',
      referralCode: 'Ds2jkx',
      chips: 0,
      pl: '0.00/-',
      exposure: '0.00/-',
      balance: '0/-'
    });
  }

  changePassword(payload: any) {
    console.log('Password change payload:', payload);
    // Simulate API call
    return of({ success: true });
  }
}
