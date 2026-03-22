import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../services/auth.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-list.component.html',
})
export class EmployeeListComponent implements OnInit {

  private empService = inject(EmployeeService);
  public auth = inject(AuthService);

  employees$ = this.empService.employees$;

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.empService.getAll();
    }
  }

  delete(id: number) {
    if (confirm('¿Eliminar empleado?')) {
      this.empService.delete(id).subscribe(() => this.empService.getAll());
    }
  }
}
