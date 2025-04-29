import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';

@Component({
    selector: 'app-profile',
    standalone: false,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit {
    userData: any;
    changePasswordForm: FormGroup;

    constructor(private fb: FormBuilder, private profileService: ProfileService) {
        this.changePasswordForm = this.fb.group({
            old_password: ['', Validators.required],
            new_password: ['', [
                Validators.required,
                Validators.minLength(6),
                Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
            ]],
            new_password_re: ['', Validators.required]
        }, { validators: this.passwordMatchValidator });
    }

    ngOnInit(): void {
        this.getProfile();
    }

    getProfile() {
        this.profileService.fetchUserDetails().subscribe((data) => {
            this.userData = data;
        });
    }

    passwordMatchValidator(form: FormGroup) {
        return form.get('new_password')?.value === form.get('new_password_re')?.value
        ? null : { mismatch: true };
    }

    onSubmit() {
        if (this.changePasswordForm.invalid) return;
      
        const payload = this.changePasswordForm.value;
        this.profileService.changePassword(payload).subscribe((res) => {
            alert('Password updated successfully!');
            this.changePasswordForm.reset();
        });
    }
}
