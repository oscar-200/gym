import { useEffect, useState } from "react";
import {Navigate , Outlet } from "react-router-dom"



const ManagerPrivate = () =>{
    const [isAuth, setIsAuth] = useState(true);
    const [isGerent, setIsGerent] = useState(true);
    const [isClient, setIsClient] = useState(true);
    const [isEncar, setIsEncar] = useState(true);
    const [isTeacher, setIsTeacher] = useState(true); 

    
    const init = () => {
        if(!localStorage.getItem("auth")){
            setIsAuth(false)
        }
        else{
            const auth = JSON.parse(localStorage.getItem('auth'))
            console.log(auth)
            if (auth) {
                setIsAuth(true)
                if (auth[0] === 'g') {
                    setIsTeacher(false)
                    setIsGerent(true)
                    setIsClient(false)
                    setIsEncar(false)
                }
                else if (auth[0] === 'c') {
                    setIsTeacher(false)
                    setIsGerent(false)
                    setIsClient(true)
                    setIsEncar(false)
                }
                else if (auth[0] === 'e') {
                    setIsTeacher(false)
                    setIsGerent(false)
                    setIsClient(false)
                    setIsEncar(true)
                }
                else if(auth[0] === 'm'){
                    setIsGerent(false)
                    setIsClient(false)
                    setIsEncar(false)
                    setIsTeacher(true)
                }
            }
            else
                setIsAuth(false)
            
        }
        
    }
    useEffect(init, [])

    if(isAuth){
        if(isGerent)
            return <Outlet/>
        else if(isClient)
            return <Navigate to="/client"/>
        else if(isEncar)
            return <Navigate to="/encargado"/>
        else if(isTeacher)
            return <Navigate to="/maestro"/>
    }
    else{
        return <Navigate to="/"/>
    }
}

export default ManagerPrivate