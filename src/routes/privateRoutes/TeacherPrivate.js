import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom"



const ClientPrivate = () => {
    const [isAuthb, setIsAuthb] = useState(true);
    const [isGerentb, setIsGerentb] = useState(true);
    const [isClientb, setIsClientb] = useState(true);
    const [isEncarb, setIsEncarb] = useState(true);
    const [isTeacherb, setIsTeacherb] = useState(true); 

    const init = () => {
        if (!localStorage.getItem("auth")) {
            setIsAuthb(false)
        }
        else {
            const auth = JSON.parse(localStorage.getItem('auth'))
            if (auth) {
                setIsAuthb(true)
                if (auth[0] === 'g') {
                    setIsTeacherb(false)
                    setIsGerentb(true)
                    setIsClientb(false)
                    setIsEncarb(false)
                }
                else if (auth[0] === 'c') {
                    setIsTeacherb(false)
                    setIsGerentb(false)
                    setIsClientb(true)
                    setIsEncarb(false)
                }
                else if (auth[0] === 'e') {
                    setIsTeacherb(false)
                    setIsGerentb(false)
                    setIsClientb(false)
                    setIsEncarb(true)
                }
                else if(auth[0] === 'm'){
                    setIsGerentb(false)
                    setIsClientb(false)
                    setIsEncarb(false)
                    setIsTeacherb(true)
                }
            }
            else
                setIsAuthb(false)
        }

    }
    useEffect(init, [])

    if(isAuthb){
        if (isTeacherb)
            return <Outlet/>
        else if (isClientb)
            return <Navigate to="/client"/>
        else if (isGerentb)
            return <Navigate to="/gerente" />
        else if (isEncarb)
            return <Navigate to="/encargado"/>
    }
    else{
        return <Navigate to="/"/>
    }


}



export default ClientPrivate