import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'

import { 
  Container, 
  Box, 
  Text, 
  Input, 
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  InputGroup, 
  InputLeftAddon, 
  InputRightAddon
} from '@chakra-ui/react'

import { Logo, useAuth } from './../components'

const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('Preenchimento obrigatório'),
  password: yup.string().min(6, 'Mínimo de 6 caracteres').required('Preenchimento obrigatório'),
  username: yup.string().required('Preenchimento obrigatório'),
})

export default function Home() {
  const [auth, { signup }] = useAuth()
  const router = useRouter()
  
  const formik = useFormik({
    onSubmit: signup,
    validationSchema,
    initialValues: {
      email: '',
      username: '',
      password: ''
    }
  })
  
  useEffect(() => {
    auth.user && router.push('/agenda')
  }, [auth.user])
  
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
        
        <FormControl id="username" p={4} isRequired>
          <InputGroup size="lg">
            <InputLeftAddon children="http://clocker/" />
            <Input placeholder="meusite" 
              autoComplete="off" isRequired
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <InputRightAddon children=".com" />
          </InputGroup>
          {formik.touched.username && 
            <FormHelperText textColor="red">
              {formik.errors.username}
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
      
      <Link href="/">Já tem uma conta? Acesse!</Link>
    </Container>
  )
}

// Chakra-UI: ver na documentação (chakra-ui.com)
// Container centerContent: centraliza o conteúdo
// p={4} é o padding, mas a escala não é em pixels
// mt={8} é o margin-top, escala do Chakra

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
