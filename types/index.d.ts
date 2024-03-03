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

