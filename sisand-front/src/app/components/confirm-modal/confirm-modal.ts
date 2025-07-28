import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-modal.html',
  styleUrls: ['./confirm-modal.scss'],
})
export class ConfirmModalComponent {
  @Input() titulo: string = 'Confirmação';
  @Input() mensagem: string = 'Tem certeza?';
  @Output() confirmado = new EventEmitter<void>();
  @Output() cancelado = new EventEmitter<void>();

  confirmar() {
    this.confirmado.emit();
  }

  cancelar() {
    this.cancelado.emit();
  }
}
