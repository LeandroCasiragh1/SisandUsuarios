import { Injectable } from '@angular/core';
import { ToastComponent } from '../components/toast/toast.component';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toastComponent?: ToastComponent;

  registrar(component: ToastComponent) {
    this.toastComponent = component;
  }

  sucesso(msg: string) {
    this.toastComponent?.mostrar(msg, 'success');
  }

  erro(msg: string) {
    this.toastComponent?.mostrar(msg, 'danger');
  }
}
