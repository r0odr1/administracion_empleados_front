export interface Employee {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  cargo: string;
  fechaIngreso: Date;
  estado: boolean;
}

export type EmployeeFormModel = {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  cargo: string;
  fechaIngreso: string;
  estado: boolean;
};
