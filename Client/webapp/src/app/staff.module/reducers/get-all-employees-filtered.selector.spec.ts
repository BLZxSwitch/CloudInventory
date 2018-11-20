import { EmployeeDTO } from "../../core/services/service-proxies";
import { getAllEmployeesFilteredProjector } from "./get-all-employees-filtered.selector";

describe("Employees filtered selector:", () => {

  const employee1 = new EmployeeDTO({firstName: "Jane", lastName: "Doe", fullName: "Jane Doe", ahvNr: "ahvNr123"} as any);
  const employee2 = new EmployeeDTO({firstName: "John", lastName: "Doe", fullName: "John Doe", ahvNr: "ahvNr321"} as any);
  const employee3 = new EmployeeDTO({firstName: "Test", lastName: "Name", fullName: "Test Name", ahvNr: "ahvNr999"} as any);

  it("Returns updated state on EmployeesFilterChanged action", () => {
    const filterPattern = "JANE";
    const employees = [
      employee1,
      employee2,
      employee3,
    ];
    const actual = getAllEmployeesFilteredProjector(employees, filterPattern);

    const expected = [employee1];
    expect(actual).toEqual(expected);
  });

  it("Returns updated state on EmployeesFilterChanged action", () => {
    const filterPattern = "DOE";
    const employees = [
      employee1,
      employee2,
      employee3,
    ];
    const actual = getAllEmployeesFilteredProjector(employees, filterPattern);

    const expected = [
      employee1,
      employee2
    ];
    expect(actual).toEqual(expected);
  });

  it("Returns updated state on EmployeesFilterChanged action", () => {
    const filterPattern = "Jane Doe";
    const employees = [
      employee1,
      employee2,
      employee3,
    ];
    const actual = getAllEmployeesFilteredProjector(employees, filterPattern);

    const expected = [employee1];
    expect(actual).toEqual(expected);
  });

  it("Returns updated state on EmployeesFilterChanged action", () => {
    const filterPattern = "ahvNr1";
    const employees = [
      employee1,
      employee2,
      employee3,
    ];
    const actual = getAllEmployeesFilteredProjector(employees, filterPattern);

    const expected = [employee1];
    expect(actual).toEqual(expected);
  });
});
