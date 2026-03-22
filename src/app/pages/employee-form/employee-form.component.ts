import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './employee-form.component.html',
})
export class EmployeeFormComponent implements OnInit {
  isEdit = false;

  employee: Employee = {
    nombre: '',
    apellido: '',
    email: '',
    cargo: '',
    fechaIngreso: '',
    estado: true
  };

  constructor(
    private empService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEdit = true;
      this.empService.getById(+id).subscribe(e => {
        this.employee = { ...e, fechaIngreso: e.fechaIngreso.substring(0, 10) };
      });
    }
  }

  onSubmit() {
    const navigateToList = () => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/employees']);
      });
    };

    if (this.isEdit) {
      this.empService.update(this.employee.id!, this.employee)
        .subscribe(() => navigateToList());
    } else {
      this.empService.create(this.employee)
        .subscribe(() => navigateToList());
    }
  }
}
