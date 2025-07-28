import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService, Usuario } from '../../../services/usuario';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.html',
  styleUrls: ['./usuarios-form.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class UsuariosFormComponent implements OnInit {
  usuario: Usuario = { id: 0, nome: '', email: '', senhaHash: '' };
  editando = false;
  mostrarSenha = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editando = true;
      this.usuarioService.obterUsuarioPorId(+id).subscribe((data: Usuario) => {
        this.usuario = data;
        this.cdr.detectChanges();
      });
    } else {
      this.cdr.detectChanges();
    }
  }

  salvar(form: NgForm) {
    if (!form.valid) return;

    const request = this.editando
      ? this.usuarioService.atualizarUsuario(this.usuario)
      : this.usuarioService.criarUsuario(this.usuario);

    request.subscribe({
      next: () => {
        const msg = this.editando
          ? 'Usuário atualizado com sucesso!'
          : 'Usuário salvo com sucesso!';
        this.toastService.sucesso(msg);

        setTimeout(() => this.router.navigate(['/usuarios']), 100);
      },
      error: (erro) => {
        const msg = erro.error?.message || 'Erro ao salvar o usuário.';
        this.toastService.erro(msg);
      },
    });
  }

  cancelar() {
    this.router.navigate(['/usuarios']);
  }

  emailValido(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }
}
