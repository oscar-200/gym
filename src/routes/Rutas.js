import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';

import LayoutHome from "./../views/home";
import LayoutClient from "./../views/client"
import LayoutGerent from "./../views/manager";
import LayoutEncar from "./../views/branchManager";
import LayoutTeacher from "./../views/teacher";

import HomePrivate from "./privateRoutes/HomePrivate";
import ManagerPrivate from "./privateRoutes/ManagerPrivate";
import ClientPrivate from "./privateRoutes/ClientPrivate";
import EncarPrivate from "./privateRoutes/EncarPrivate";
import TeacherPrivate from "./privateRoutes/TeacherPrivate";

const rutas = () => {
    

    return (
        <div>
            <BrowserRouter>
                <Suspense></Suspense>
                <Routes>

                    <Route exact path="/" element={<HomePrivate />}>
                         <Route exact path="/" element={<LayoutHome/>} />
                    </Route>                

                    <Route exact path="/gerente" element={<ManagerPrivate/>}>
                        <Route exact path="/gerente" element={<LayoutGerent />} />
                    </Route>

                    <Route exact path="/client" element={<ClientPrivate />}>
                        <Route exact path="/client" element={<LayoutClient />} />
                    </Route>

                    <Route exact path="/encargado" element={<EncarPrivate />}>
                        <Route exact path="/encargado" element={<LayoutEncar />} />
                    </Route>

                    <Route exact path="/maestro" element={<TeacherPrivate/>}>
                        <Route exact path="/maestro" element={<LayoutTeacher/>} />
                    </Route>


                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default rutas;