import { Component, Input } from "@angular/core";

@Component({
  selector: "pr-employee-info",
  templateUrl: "./employee-info.component.html",
  styleUrls: ["./employee-info.component.scss"]
})
export class EmployeeInfoComponent {

  @Input() public employeeId: string;

  @Input() public employeeFullName: string;
}
