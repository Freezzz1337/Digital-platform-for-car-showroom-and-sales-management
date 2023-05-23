import './App.css';
import Header from "./header/Header";
import Footer from "./Footer";
import Home from "./body/Home";
import {Route, Routes, useNavigate} from "react-router-dom";
import CarDescription from "./body/CarDescription";
import Management from "./header/Management";
import AboutUs from "./header/AboutUs";
import CarManagement from "./Management/carManagement/CarManagement";
import CarEditManagement from "./Management/carManagement/CarEditManagement";
import CarAddManagement from "./Management/carManagement/CarAddManagement";
import SupplierManagement from "./Management/supplierManagement/SupplierManagement";
import SupplierEditManagement from "./Management/supplierManagement/SupplierEditManagement";
import SupplierAddManagement from "./Management/supplierManagement/SupplierAddManagement";
import WorkerManagement from "./Management/workerManagement/WorkerManagement";
import WorkerEditManagement from "./Management/workerManagement/WorkerEditManagement";
import WorkerAddManagement from "./Management/workerManagement/WorkerAddManagement";
import SalesManagement from "./Management/salesManagement/SalesManagement";
import SalesAddManagement from "./Management/salesManagement/SalesAddManagement";
import Authorization from "./security/Authorization";
import {useEffect, useState} from "react";
import Logout from "./security/Logout";
import {CarProvider} from "./util/CarContext";

function App() {
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();
    const handleUserRoleChange = (role) => {
        setUserRole(role);
    };

    useEffect(() => {
        const storedUserRole = localStorage.getItem('userRole');
        if (storedUserRole) {
            setUserRole(storedUserRole);
        }
    }, []);

    useEffect(() => {
        console.log(userRole);
    }, [userRole]);


    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
        setUserRole(null);
    };

    return (
        <>
            <CarProvider>

                <Header userRole={userRole} handleLogout={handleLogout}/>
                <Routes>
                    <Route path="" element={<Home/>}/>
                    <Route path="/car/carDetails/:carId" element={<CarDescription/>}/>
                    <Route path="/aboutUs" element={<AboutUs/>}/>
                    <Route path="/auth/login" element={<Authorization onUserRoleChange={handleUserRoleChange}/>}/>

                    {userRole === "Owner" && (
                        <>
                            <Route path="/management" element={<Management userRole={userRole} />}/>

                            <Route path="/management/car" element={<CarManagement/>}/>
                            <Route path="/management/car/edit/:carId" element={<CarEditManagement/>}/>
                            <Route path="/management/car/add" element={<CarAddManagement/>}/>

                            <Route path="/management/supplier" element={<SupplierManagement/>}/>
                            <Route path="/management/supplier/edit/:supplierId" element={<SupplierEditManagement/>}/>
                            <Route path="/management/supplier/add" element={<SupplierAddManagement/>}/>

                            <Route path="/management/worker" element={<WorkerManagement/>}/>
                            <Route path="/management/worker/edit/:workerId" element={<WorkerEditManagement/>}/>
                            <Route path="/management/worker/add" element={<WorkerAddManagement/>}/>

                            <Route path="/management/sales" element={<SalesManagement/>}/>
                            <Route path="/management/addSales" element={<SalesAddManagement/>}/>

                            <Route path="/logout" element={<Logout/>}/>
                        </>
                    )}

                    {userRole === "Manager" && (
                        <>
                            <Route path="/management" element={<Management userRole={userRole} />}/>

                            <Route path="/management/car" element={<CarManagement/>}/>
                            <Route path="/management/car/edit/:carId" element={<CarEditManagement/>}/>
                            <Route path="/management/car/add" element={<CarAddManagement/>}/>

                            <Route path="/management/supplier" element={<SupplierManagement/>}/>
                            <Route path="/management/supplier/edit/:supplierId" element={<SupplierEditManagement/>}/>
                            <Route path="/management/supplier/add" element={<SupplierAddManagement/>}/>

                            <Route path="/management/sales" element={<SalesManagement/>}/>
                            <Route path="/management/addSales" element={<SalesAddManagement/>}/>

                            <Route path="/logout" element={<Logout/>}/>
                        </>
                    )}
                </Routes>

                <Footer/>

            </CarProvider>
        </>
    );
}

export default App;
