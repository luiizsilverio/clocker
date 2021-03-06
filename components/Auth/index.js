import { useState, useEffect, createContext, useContext } from 'react'
import axios from 'axios'

import { fbClient, persistenceMode } from '../../config/firebase/client'

const AuthContext = createContext([{}, () => {}])

export const login = async ({ email, password }) => {
  fbClient.auth().setPersistence(persistenceMode)

  try {
    await fbClient.auth()
      .signInWithEmailAndPassword(email, password)        
            
    return fbClient.auth().currentUser    
    
  } catch (err) {
    console.error('LOGIN ERROR:', error)
  }
}

export const logout = () => fbClient.auth().signOut()

export const signup = async ({ email, password, username }) => {
  try {    
    await fbClient.auth().createUserWithEmailAndPassword(email, password)

    const user = await login({ email, password })    
    const token = await user.getIdToken()

    const { data } = await axios({
      method: 'post',
      url: '/api/profile',
      data: { username },        
      headers: {
        'Authorization': `Bearer ${token}`
      }        
    })
    
    console.log('signup:data', data)
  } catch (err) {
    console.error('SIGNUP ERROR:', error)
  }
}

export const useAuth = () => {
  const [auth] = useContext(AuthContext)

  return [auth, { login, logout, signup }]
}

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({    
    loading: true, 
    user: false
  })  

  useEffect(() => {
    const unsubscribe = fbClient.auth().onAuthStateChanged(user => {      
      setAuth({
        loading: false,
        user
      })
    })

    return () => unsubscribe()
  }, [])
  
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  )
}