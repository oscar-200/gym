import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom"



const HomePrivate = () => {
    const [isAuthLog, setIsAuthLog] = useState(false);
    const [isGerenta, setIsGerenta] = useState(true);
    const [isClienta, setIsClienta] = useState(true);
    const [isEncara, setIsEncara] = useState(true);
    const [isTeachera, setIsTeachera] = useState(true); 

    const init = () => {
        if (!localStorage.getItem("auth")) {
            setIsAuthLog(false)
        }
        else {
            const auth = JSON.parse(localStorage.getItem('auth'))
            if (auth) {
                setIsAuthLog(true)
                if (auth[0] === 'g') {
                    setIsTeachera(false)
                    setIsGerenta(true)
                    setIsClienta(false)
                    setIsEncara(false)
                }
                else if (auth[0] === 'c') {
                    setIsTeachera(false)
                    setIsGerenta(false)
                    setIsClienta(true)
                    setIsEncara(false)
                }
                else if (auth[0] === 'e') {
                    setIsTeachera(false)
                    setIsGerenta(false)
                    setIsClienta(false)
                    setIsEncara(true)
                }
                else if(auth[0] === 'm'){
                    setIsGerenta(false)
                    setIsClienta(false)
                    setIsEncara(false)
                    setIsTeachera(true)
                }
            }
            else
                setIsAuthLog(false)
        }
    }
    useEffect(init, [])

    
    if(isAuthLog){
        if(isGerenta)
            return <Navigate to="/gerente"/>
        else if(isClienta)
            return <Navigate to="/client"/>
        else if(isEncara)
            return <Navigate to="/encargado"/>
        else if(isTeachera)
            return <Navigate to="/maestro"/>
    }
    else{
        return <Outlet/>
    }
}

export default HomePrivate