// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const UserContext = createContext({});

// export function UserContextProvider({ children }) {
//     const [user, setUser] = useState({});
//     useEffect(() => {
//         async function fetchUserData() {
//             try {
//                 const data = await axios.get('http://localhost:3000/api/auth/profile');
//                 console.log(data);
//                 setUser(data);
//             } catch (error) {
//                 console.error("Error fetching user profile:", error);
//             }
//         }

//         fetchUserData(); 

//     }, []); 

//     return (
//         <UserContext.Provider value={{ user, setUser }}>
//             {children}
//         </UserContext.Provider>
//     );
// }


import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { decodeToken } from 'react-jwt'

export const AuthContext = createContext(null)

export const AuthProvider = (props) => {

    const [ token, setToken ] = useState("")
    const [ isLoggedIn, setIsLoggedIn ] = useState("")
    const [ user, setUser ] =  useState("")

    useEffect(()=>{
        
        const jwttoken = localStorage.getItem("access_token")
        if(jwttoken){
            setToken(jwttoken)
            setIsLoggedIn(true)
            const decodedData = decodeToken(jwttoken)
            setUser(decodedData.user)
        }
    }, [token])

    

    const login = (token) => {
        localStorage.setItem("access_token", token)
        setToken(token)
        setIsLoggedIn(true)
    }
    const logout = () =>{
        localStorage.removeItem("access_token")
        setToken(null)
        setIsLoggedIn(false)
    }
    
    return(
        <AuthContext.Provider value={{token, isLoggedIn, login, logout, user, setUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>{
    const authContext = useContext(AuthContext)
    return authContext
}