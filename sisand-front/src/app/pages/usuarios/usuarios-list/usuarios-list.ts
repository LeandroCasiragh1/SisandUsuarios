import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService, Usuario } from '../../../services/usuario';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service';
import { ConfirmModalComponent } from '../../../components/confirm-modal/confirm-modal';

@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  templateUrl: './usuarios-list.html',
  styleUrls: ['./usuarios-list.scss'],
  imports: [CommonModule, ConfirmModalComponent],
})
export class UsuariosListComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarioParaExcluir?: Usuario;
  mostrarModal: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private zone: NgZone,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    console.log('🔥 ngOnInit chamado!');
    this.carregarUsuarios();
  }

  carregarUsuarios(): void {
    this.usuarioService.listarUsuarios().subscribe((data: Usuario[]) => {
      this.zone.run(() => {
        this.usuarios = data;
        this.cdr.detectChanges();
      });
    });
  }

  editarUsuario(id: number): void {
    this.router.navigate(['/usuarios/editar', id]);
  }

  novoUsuario(): void {
    this.router.navigate(['/usuarios/novo']);
  }

  confirmarExclusao(usuario: Usuario): void {
    this.usuarioParaExcluir = usuario;
    this.mostrarModal = true;
  }

  cancelarExclusao(): void {
    this.usuarioParaExcluir = undefined;
    this.mostrarModal = false;
  }

  excluirConfirmado(): void {
    if (!this.usuarioParaExcluir) return;

    this.usuarioService.deletarUsuario(this.usuarioParaExcluir.id).subscribe({
      next: () => {
        this.toastService.sucesso('Usuário excluído com sucesso!');
        this.carregarUsuarios();
        this.cancelarExclusao();
      },
      error: () => {
        this.toastService.erro('Erro ao excluir o usuário.');
        this.cancelarExclusao();
      },
    });
  }
  voltar(): void {
    this.router.navigate(['/home']);
  }
}
