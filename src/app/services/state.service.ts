import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  notes: any = [];

  constructor() { }

  fireAlert(header: any, msg: any, icon: any) {
    Swal.fire(header, msg, icon)
  }

  dismissAlert() {
    Swal.DismissReason.cancel
  }
}
