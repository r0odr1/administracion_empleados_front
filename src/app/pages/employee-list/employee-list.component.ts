import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../services/auth.service';
import { Employee } from '../../models/employee.model';
import {FormsModule} from '@angular/forms';
import {map, Observable} from 'rxjs';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './employee-list.component.html',
})
export class EmployeeListComponent implements OnInit {

  private empService = inject(EmployeeService);
  public auth = inject(AuthService);

  employees$: Observable<Employee[]> = this.empService.employees$;
  displayEmployees$: Observable<Employee[]> = this.employees$;

  searchId: number | null = null;
  searchError = '';

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.empService.getAll();
    }
  }

  searchById() {
    if (!this.searchId || this.searchId <= 0) {
      this.searchError = 'Ingrese un ID válido';
      return;
    }

    this.searchError = '';

    this.displayEmployees$ = this.employees$.pipe(
      map(employees => employees.filter(emp => emp.id === this.searchId))
    );
  }

  clearSearch() {
    this.searchId = null;
    this.searchError = '';
    this.displayEmployees$ = this.employees$;
    this.empService.getAll();
  }

  delete(id: number) {
    if (confirm('¿Eliminar empleado?')) {
      this.empService.delete(id).subscribe(() => this.empService.getAll());
    }
  }
}
