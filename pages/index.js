import { useState, useEffect } from 'react'
import { Login, Agenda } from './../components'
import { fbClient } from '../config/firebase'
import { Container, Spinner } from '@chakra-ui/react'

export default function Home() {
  const [auth, setAuth] = useState({
    loading: true, 
    user: false
  })
  
  useEffect(() => {
    fbClient.auth().onAuthStateChanged(user => {      
      setAuth({
        loading: false,
        user
      })
    })
  }, [])

  if (auth.loading) {
    return (
      <Container centerContent p={4}>
        <Spinner />
      </Container>
    )
  }

  return !!auth.user ? <Agenda /> : <Login />
}
