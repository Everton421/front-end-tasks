
'use client'
import React, {   createContext, useContext, useEffect, useState } from "react";
  type user = { 
        email: string,
        senha:string,
        token: string
    }


const AuthContext = createContext({});
  
export const AuthProvider = ( {children} :Readonly<{ children: React.ReactNode ;} > )=>{

    const [ user, setUser ] = useState<user | null >(null); 
    const [ loading, setloading ] = useState<boolean>(true); // para saber se já foi verificado o localStorage

      useEffect(()=>{
        const storedUser = localStorage.getItem('authUser');

        if(storedUser)  {
            try{
                setUser(JSON.parse(storedUser));
            }catch(e){
                console.error('Erro ao transformar usuario do localStorage ', e );
                localStorage.removeItem('authUser');
            }
        }
        setloading(false);
    },[]);


    const logout = ()=>{
        setUser(null);
        localStorage.removeItem('authUser')
    }
    
    const value = {
        user,
        setUser,
        loading,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            { children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>{
    return useContext(AuthContext)
}