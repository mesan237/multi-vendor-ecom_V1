import Sidebar from "@/Components/Sidebar";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard({ auth }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="flex">
                <div
                    className={`w-64 bg-gray-800 text-white transform ${
                        isOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 md:translate-x-0`}
                ></div>
                {/* <Sidebar /> */}
                <div className="flex-1 p-4">
                    <button onClick={() => setIsOpen(!isOpen)} className="">
                        Toggle Menu
                    </button>
                    <div>
                        <h1 className="text-2xl">Dashboard Content</h1>
                    </div>
                </div>
            </div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged as an admin
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
