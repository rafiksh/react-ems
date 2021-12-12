/**
 * This interface is for the initial state of the feature slice
 */
export interface Employees {
  data: EmployeeRecord[];
  initialValues: any;
  isModalVisible: boolean;
}

export interface EmployeeRecord {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: { code: string; number: string };
  jobTitle: string;
  photoURL: string;
}
