import React from 'react'
import  { useContext, useEffect, useState, } from 'react'
import { UserContext } from '../UserContext';
import axios from 'axios';

import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    HStack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
    Switch,
  } from '@chakra-ui/react'
  //import { SmallCloseIcon } from '@chakra-ui/icons'
  
 
const Profile = () => {
    const {userInfo, setUserInfo} =useContext(UserContext)
  
      const [password, setPassword] = useState('');
      const [passwordagain, setPasswordAgain] = useState('');
      const [redirect, setRedirect] = useState(false);
  
      axios.defaults.withCredentials = true
  
      async function EditProfile(ev){
          
          ev.preventDefault();
          const data = {
            'password': password,
            'passwordagain': passwordagain,
          }

          // const data = new FormData();
          // data.set('password', password);
          // data.set('passwordagain', passwordagain);
          
  
  
          
          
          const res = await axios({
              method: "post",
              url: "http://localhost:4000/resetpass",
              data: data,
              
            })
  
          if(res.status == 200){
              
              
              setRedirect(true)
  
              
            } else{
              alert("Problem occured during post request");}
          
          
  
  
      }

  return (
    <form className='EditProfile' onSubmit={EditProfile}>

    <Flex
    minH={'100vh'}
    align={'center'}
    justify={'center'}
    bg={useColorModeValue('gray.50', 'gray.800')}>
    <Stack
      spacing={4}
      w={'full'}
      maxW={'md'}
      bg={useColorModeValue('white', 'gray.700')}
      rounded={'xl'}
      boxShadow={'lg'}
      p={6}
      my={12}>
      <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
        User Profile Edit
      </Heading>
      <FormControl id="userName">
        <FormLabel>User Icon</FormLabel>
        <Stack direction={['column', 'row']} spacing={6}>
          <Center>
            <Avatar size="xl" src="https://bit.ly/sage-adebayo">
              <AvatarBadge
                as={IconButton}
                size="sm"
                rounded="full"
                top="-10px"
                colorScheme="red"
                aria-label="remove Image"
               // icon={<SmallCloseIcon />}
              />
            </Avatar>
          </Center>
          <Center w="full">
            <Button w="full">Change Icon</Button>
          </Center>
        </Stack>
      </FormControl>
      
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          placeholder="password"
          _placeholder={{ color: 'gray.500' }}
          type="password"
          onChange={ev => setPassword(ev.target.value)}

        />
      </FormControl>

      <FormControl id="passwordagain" isRequired>
        <FormLabel>Repeat Password</FormLabel>
        <Input
          placeholder="password again"
          _placeholder={{ color: 'gray.500' }}
          type="password"
          onChange={ev => setPasswordAgain(ev.target.value)}

        />
      </FormControl>
      <FormControl display='flex' alignItems='center'>
  <FormLabel htmlFor='email-alerts' mb='0'>
    Enable email otp?
  </FormLabel>
  <Switch size='lg' id='email-alerts' />
</FormControl>
      <Stack spacing={6} direction={['column', 'row']}>
        <Button
          bg={'red.400'}
          color={'white'}
          w="full"
          _hover={{
            bg: 'red.500',
          }}>
          Cancel
        </Button>
        <Button
          type='submit'
          bg={'blue.400'}
          color={'white'}
          w="full"
          _hover={{
            bg: 'blue.500',
          }}>
          Submit
        </Button>
      </Stack>
    </Stack>
  </Flex>
  </form>
)
}


export default Profile
