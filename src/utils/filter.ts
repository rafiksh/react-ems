import { EmployeeRecord } from "&features/employees";

/** Filters list of employees based on input change event */
export const filterEmployeesOnChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  employeesList: EmployeeRecord[]
) => {
  const query = e?.target?.value?.trim()?.toLowerCase();
  return employeesList.filter(
    (employee) =>
      employee?.firstName?.toLowerCase().includes(query) ||
      employee?.lastName?.toLowerCase().includes(query) ||
      employee?.email?.toLowerCase().includes(query) ||
      `${employee?.phone?.code}${employee?.phone?.number}`.includes(query) ||
      employee?.jobTitle?.toLowerCase().includes(query) ||
      query === ""
  );
};
