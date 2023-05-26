import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  callSwal(text: string, title: string, buttonName: string, callBack: () => void) {
    Swal.fire({
      text: text,
      title: title,
      showConfirmButton: true,
      showCancelButton:true,
      confirmButtonText: buttonName,
      cancelButtonText: "Cancel",
      icon: "question"
    }).then(res => {
      if (res.isConfirmed) {
        callBack();
      }
    })
  }
}
