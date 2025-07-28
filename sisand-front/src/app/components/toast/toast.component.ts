import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="toast-container position-fixed top-0 end-0 p-3"
      style="z-index: 9999"
    >
      <div
        *ngIf="mensagemVisivel"
        class="toast show text-white border-0"
        [ngClass]="{
          'bg-success': tipo === 'success',
          'bg-danger': tipo === 'danger'
        }"
        role="alert"
      >
        <div class="d-flex">
          <div class="toast-body">{{ mensagem }}</div>
          <button
            type="button"
            class="btn-close btn-close-white me-2 m-auto"
            aria-label="Fechar"
            (click)="fechar()"
          ></button>
        </div>
      </div>
    </div>
  `,
})
export class ToastComponent {
  mensagem: string = '';
  tipo: 'success' | 'danger' = 'success';
  mensagemVisivel: boolean = false;
  timeoutRef: any;

  constructor(private cdr: ChangeDetectorRef) {}

  mostrar(mensagem: string, tipo: 'success' | 'danger' = 'success') {
    this.mensagem = mensagem;
    this.tipo = tipo;
    this.mensagemVisivel = true;
    this.cdr.detectChanges();

    if (this.timeoutRef) clearTimeout(this.timeoutRef);

    this.timeoutRef = setTimeout(() => {
      this.fechar();
    }, 3000);
  }

  fechar() {
    this.mensagemVisivel = false;
    this.mensagem = '';
    this.cdr.detectChanges();
  }
}
