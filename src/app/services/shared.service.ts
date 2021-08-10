import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  enviarAlerta(icon: SweetAlertIcon, title: string, text: string) {
    Swal.fire({
      icon,
      title,
      text,
      timer: 4000,
      showConfirmButton: false
      // footer: '<a href>Why do I have this issue?</a>',
    });
  }

  enviarConfirmacion(icon: SweetAlertIcon, title: string, text: string): Promise<SweetAlertResult> {
    return new Promise((res, rej) => {
      Swal.fire({
        title,
        text,
        icon,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        res(result);
      });
    });
  }

  enviarPregunta(
    titulo: string,
    typeInput: 'text' | 'email' | 'password' | 'number' | 'tel'
    | 'range' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'file' | 'url' = 'text',
    inputValidator?: (value: any) => string,
    confirmar = 'Confirm',
    cancelar = 'Cancel'): Promise<SweetAlertResult> {
    return Swal
      .fire({
        title: titulo,
        input: typeInput,
        showCancelButton: true,
        confirmButtonText: confirmar,
        cancelButtonText: cancelar,
        inputValidator
      });

  }

  downloadURI(uri: string, name: string) {
    const link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // delete link;
  }
}
