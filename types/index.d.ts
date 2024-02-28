export interface AdminHeaderProps {
  title: string;
  subtitle: string;
}

export interface Customer {
  _id: string;
  email: string;
  username: string;
  role: string;
}

export interface Service {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  carType: string;
}

export interface Appointment {
  _id: string;
  customer: Customer;
  service: Service;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  plateNumber: string;
  carModel: string;
  requests: string;
  date: string;
  time: string;
}
