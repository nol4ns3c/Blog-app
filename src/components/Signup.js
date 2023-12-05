import React from 'react'
import { useState } from 'react'
import { Input, InputGroup, Button, InputRightElement, Flex, Box, Text, FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react'
import axios from 'axios';
import { useToast } from '@chakra-ui/react'
import { Navigate } from 'react-router-dom'

const Signup = () => {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [redirect, setRedirect] = useState(false);

  const isErrore = email === ''
  const isErroru = username === ''
  const isErrorp = password === ''
  const toast = useToast()

  
  async function signup(ev){
    ev.preventDefault()
    const errormsg = ''
    
    const config = {
      'email': email, 
      'username':username,
      'password': password,
      headers:{'Content-Type':'application/json'}}

      try {
    const res = await axios.post("http://localhost:4000/signup",config)
    ToastSuccess()
    setRedirect(true)
    
        
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
                title: 'Account created succesfully',
                description: "",
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
            
         
        )
      }

  if(redirect){
    return <Navigate to={'/login'} />
  }
  return (
    
<div>
<form className='Signup' onSubmit={signup}>
<Flex gap={3}flexDirection={"column"} justifyContent={"center"} alignItems={"center"} margin={"1em auto"}  p={'1em'} pt={'10em'}>
  <Box>
    <Text fontSize={'5xl'} fontFamily={'mono'}>Signup</Text>
  </Box>
  
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

  <FormControl isInvalid={isErroru}>
      <FormLabel>Username</FormLabel>
      <InputGroup size='lg'>

      <Input
    pr='4.5rem'
    placeholder='Enter Username'
    value={username}
    onChange={ev => setUsername(ev.target.value)}
  />
  </InputGroup>  
    {!isErroru ? (
        <FormHelperText>
        </FormHelperText>
      ) : (
        <FormErrorMessage>Username is required.</FormErrorMessage>
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
<Button colorScheme='blue' type='submit'>Register</Button>
</Box>

</Flex> 
</form>
</div>
)
}



export default Signup
