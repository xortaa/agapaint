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
  paymentTerm: "Full" | "Partial";
  carColor: string;
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
  paymentTerm: "Full" | "Partial";
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

export interface Faq {
  _id: string;
  question: string;
  answer: string;
  __v: number;
}
export interface FaqData {
  question: string;
  answer: string;
}

export interface Category {
  _id: string;
  name: string;
  __v: number;
}

export interface CategoryData {
  name: string;
}

export interface Material {
  _id: string;
  name: string;
  category: Category;
  quantity: number;
  __v: number;
}

export interface MaterialData {
  name: string;
  category: Category;
  quantity: number;
}
