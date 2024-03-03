export interface AdminHeaderProps {
  title: string;
  subtitle: string;
}
export interface ServiceData {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  carType: string;
}

export interface AppointmentData {
  customerId: string;
  servicesId: string[];
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  plateNumber: string;
  carModel: string;
  requests: string;
  date: string;
  time: string;
  carManufacturer: string;
  carType: string;
}

export interface Service {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  carType: string;
  __v: number;
}

export interface Appointment {
  _id: string;
  customerId: string;
  servicesId: Service[];
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  plateNumber: string;
  carType: string;
  carManufacturer: string;
  carModel: string;
  requests: string;
  date: string;
  time: string;
  status: string;
  __v: number;
}

export interface User { 
  _id: string;
  email: string;
  username: string;
  role: string;
  appointment: Appointment[];
  __v: number;
}
