import Sidebar from "@/Components/Sidebar";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DashboardPage from "./Dasboard";

export default function Dashboard({ auth }) {
  return (
    <AuthenticatedLayout user={auth.user}>
      <DashboardPage />
    </AuthenticatedLayout>
  );
}
