import React, { useContext } from 'react'
import { useState, Redire } from 'react'
import { Input, InputGroup, Button, InputRightElement, Flex, Box, Text, FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'

import axios from 'axios';
import { Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext';


const Login = () => {

  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const [redirect, setRedirect] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {setUserInfo} = useContext(UserContext)
  const toast = useToast()
  const isErrore = email === ''
  const isErrorp = password === ''



  async function login(ev){
    ev.preventDefault()
    axios.defaults.withCredentials = true
    const config = {
      'email':email,
      'password': password,
      headers:{'Content-Type':'application/json'},
      //withCredentials: true,
    }

      try {
          const res = await axios.post("http://localhost:4000/login",config)
          if(res.status == 200){
            //console.log(res.data.username)
            setUserInfo(res.data.username)
            ToastSuccess()
              //console.log(userInfo.data.username)
            setRedirect(true)

            
          } 
      } catch (error) {

        const errormsg = error.response.data.error
        ToastError(errormsg)

        
      }
    }

      function ToastError(errormsg) {
    
        return (
         // console.log(errormsg)
        
              toast({
                title: errormsg,
                description: "",
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
            
         
        )
      }
      function ToastSuccess() {
    
        return (
         // console.log(errormsg) 
        
              toast({
                title: 'Successful login',
                description: "",
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
            
         
        )
      }
    
    if(redirect) {
      return <Navigate to={'/'} />
    } 
    
  return (
    
<div>
<form className='Login' onSubmit={login}>
<Flex gap={3}flexDirection={"column"} justifyContent={"center"} alignItems={"center"} margin={"1em auto"}  p={'1em'} pt={'10em'}>
  <Box>
  <FormControl isInvalid={isErrore}>
      <FormLabel>Email</FormLabel>
      <InputGroup size='lg'>

      <Input
    pr='4.5rem'
    placeholder='Enter Email'
    value={email}
    onChange={ev => setEmail(ev.target.value)}
  />
  </InputGroup>  
    {!isErrore ? (
        <FormHelperText>
        </FormHelperText>
      ) : (
        <FormErrorMessage>Email is required.</FormErrorMessage>
      )}
    </FormControl>


  
  </Box>
  
  <Box>
  <FormControl isInvalid={isErrorp}>
      <FormLabel>Password</FormLabel>
      <InputGroup size='lg'>

      <Input
    pr='4.5rem'
    type={show ? 'text' : 'password'}
    placeholder='Enter password'
    value={password}
    onChange={ev => setPassword(ev.target.value)}
  />
  <InputRightElement width='4.5rem'>
    <Button h='1.75rem' size='sm' onClick={handleClick}>
      {show ? 'Hide' : 'Show'}
    </Button>
  </InputRightElement>
  </InputGroup>  
    {!isErrorp ? (
        <FormHelperText>
        </FormHelperText>
      ) : (
        <FormErrorMessage>Password is required.</FormErrorMessage>
      )}
    </FormControl>

</Box>
<Box>
<Button colorScheme='blue' type='submit'>Login</Button>
</Box>
</Flex> 
</form>
</div>
)
}



export default Login
