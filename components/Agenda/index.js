import { Button } from '@chakra-ui/react'
import { fbClient } from '../../config/firebase'

export const Agenda = () => {
  const logout = () => fbClient.auth().signOut()

  return (
    <div>
      <Button onClick={logout}>Sair</Button>
    </div>
  )
}
