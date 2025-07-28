import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class LoginComponent {
  email = '';
  senha = '';
  mensagemErro = '';
  tentouLogar = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
  ) {}

  login(form: any) {
    this.tentouLogar = true;
    this.toastService.sucesso('Login executado com sucesso!');

    const emailEhValido = this.email.includes('@') && this.email.includes('.');
    if (!emailEhValido) {
      this.toastService.erro('Email inválido.');
      return;
    }

    if (!form.valid) {
      this.toastService.erro('Preencha todos os campos.');
      return;
    }

    this.authService.login(this.email, this.senha).subscribe({
      next: (res: any) => {
        if (res?.token) {
          this.authService.salvarToken(res.token);
          this.router.navigate(['/home']);
        } else {
          this.toastService.erro('Login inválido!');
        }
      },
      error: (err) => {
        console.error('Erro no login:', err);
        this.email = '';
        this.senha = '';
        this.toastService.erro('Login inválido!');
        this.cdr.markForCheck();
      },
    });
  }
}
