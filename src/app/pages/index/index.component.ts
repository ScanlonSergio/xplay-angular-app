import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

declare const bootstrap: any;

@Component({
  selector: 'app-index',
  standalone: false,
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})

export class IndexComponent implements OnInit {
  email: string = '11xplayofficiall@gmail.com';
  loginForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false, Validators.requiredTrue]
    });
  }

  onSubmit(): void {
    this.submitted = true;
    console.log('Login successful:', this.loginForm.value);

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.authService.setToken(res.token);
        const modalEl = document.getElementById('lognModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
    modalInstance.hide();
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        alert('Login failed: ' + err.message);
      }
    });

  }

  get f() {
    return this.loginForm.controls;
  }
}
