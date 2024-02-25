"use client";

import homeStyles from '@/styles/home.module.scss';
import SigninButton from "@/components/auth/SigninButton";
import CheckSessionButton from "@/components/auth/CheckSessionButton";
import LogoutButton from "@/components/auth/LogoutButton";
import { Button, Card } from 'react-bootstrap';
import CustHome from "@/app/home/page";
import AdminSales from './Admin/sales/page';


export default function Home() {
  // for demonstation purposes only remove buttons afterwards
  return (
    <div>
      {/* homepage */}

      <AdminSales />
    </div>
  );
}
