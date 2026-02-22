import { DepartmentModel } from "./DepartmentModel";

export class DesignationModel {
    designationId : number = 0;
    departmentId : number = 0;
    designationName : string = '';
}

export class DesignationDto {
    designationId : number = 0;
    departmentId : number = 0;
    designationName : string = '';
    department :DepartmentModel  = new DepartmentModel();
}