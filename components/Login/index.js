import Link from 'next/link'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { 
  Container, 
  Box, 
  Text, 
  Input, 
  Button,
  FormControl,
  FormLabel,
  FormHelperText
} from '@chakra-ui/react'

import { Logo } from './../Logo'
//import { Logo } from '../components/Logo'
import { fbClient } from '../../config/firebase'
import { persistenceMode } from '../../config/firebase/client'

/* exemplo de schema do yup ***
let schema = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required().positive().integer(),
  email: yup.string().email(),
  website: yup.string().url(),
  createdOn: yup.date().default(function () {
    return new Date();
  }),
});
*/

const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('Preenchimento obrigatório'),
  password: yup.string().required('Preenchimento obrigatório')  
})

export const Login = () => {
  const formik = useFormik({
    onSubmit: async (values, form) => {      
      fbClient.auth().setPersistence(persistenceMode)

      try {
        const user = await fbClient.auth()
          .signInWithEmailAndPassword(values.email, values.password)        
                
      } catch (err) {
        console.error(error)
      }
    },
    validationSchema,
    initialValues: {
      email: '',
      username: '',
      password: ''
    }
  })

  return (
    <Container centerContent p={4}>
      <Logo />
      <Box p={4} mt={8}>
        <Text>Crie sua agenda compartilhada</Text>
      </Box>

      <Box>
        <FormControl id="email" isRequired p={4}>
          <FormLabel>Digite seu e-mail</FormLabel>
          <Input type="email" size="lg"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />        
          {formik.touched.email && 
            <FormHelperText textColor="red">
              {formik.errors.email}
            </FormHelperText>
          }
        </FormControl>
        
        <FormControl id="password" isRequired p={4}>
          <FormLabel>Digite a Senha</FormLabel>
          <Input type="password" size="lg"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />    
          {formik.touched.password &&     
            <FormHelperText textColor="red">
              {formik.errors.password}
            </FormHelperText>
          }
        </FormControl>       
        
        <Box p={4}>
          <Button width="100%" 
            colorScheme="blue"
            onClick={formik.handleSubmit}
            isLoading={formik.isSubmitting}
          >
            Entrar
          </Button>
        </Box>
      </Box>
      
      <Link href="/signup">Ainda não tem uma conta? Cadastre-se</Link>
    </Container>
  )
}

// Chakra-UI: ver na documentação (chakra-ui.com)
// Container centerContent: centraliza o conteúdo
// p={4} é o padding, mas a escala não é em pixels
// mt={8} é o margin-top, escala do Chakra
