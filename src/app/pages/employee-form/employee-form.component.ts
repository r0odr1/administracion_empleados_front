import {Component, OnInit, ChangeDetectorRef, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import {Employee, EmployeeFormModel} from '../../models/employee.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './employee-form.component.html',
})
export class EmployeeFormComponent implements OnInit {
  isEdit = false;

  employee: EmployeeFormModel = {
    nombre: '',
    apellido: '',
    email: '',
    cargo: '',
    fechaIngreso: '',
    estado: true
  };

  private cdr = inject(ChangeDetectorRef);

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
        this.employee = {
          ...e,
          fechaIngreso: this.formatDate(e.fechaIngreso)
        }
        this.cdr.detectChanges();
      });
    }
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  onSubmit() {
    const navigateToList = () => {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/employees']);
      });
    };

    const payload: Employee = {
      ...this.employee,
      fechaIngreso: new Date(this.employee.fechaIngreso)
    };

    if (this.isEdit) {
      this.empService.update(this.employee.id!, payload)
        .subscribe(() => navigateToList());
    } else {
      this.empService.create(payload)
        .subscribe(() => navigateToList());
    }
  }
}
