import { Component, OnInit } from '@angular/core';
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
  employees: Employee[] = [];

  constructor(
    private empService: EmployeeService,
    public auth: AuthService
  ) {}

  ngOnInit() { this.loadEmployees(); }

  loadEmployees() {
    this.empService.getAll().subscribe(data => this.employees = data);
  }

  delete(id: number) {
    if (confirm('¿Eliminar empleado?')) {
      this.empService.delete(id).subscribe(() => this.loadEmployees());
    }
  }

}
