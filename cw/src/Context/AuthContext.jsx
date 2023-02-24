import React, { useState } from 'react'

export const AuthContext=React.createContext();

const AuthContextProvider = ({children}) => {
    const [isAuth , setIsAuth] = useState(false)
    const [token , setToken] = useState(null)
 
    const login = (token) => {
        setIsAuth(true)
        setToken(token)
    }

    const logout = () => {
             setToken(null)
             setIsAuth(false)
    }
  return (
   <AuthContext.Provider value={{isAuth , setIsAuth,  login , token ,   logout}}>
          
     {children}
   </AuthContext.Provider>
  )
}

export default AuthContextProvider