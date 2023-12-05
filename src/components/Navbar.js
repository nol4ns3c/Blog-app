import React, { useContext, useEffect, useState } from 'react'
import { Flex, Spacer, Box, Heading, Button, ButtonGroup, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import axios from 'axios';
import { UserContext } from '../UserContext';

const Navbar = () => {
  const {userInfo, setUserInfo} =useContext(UserContext)

  

  
  useEffect(() => {
    axios.defaults.withCredentials = true

    axios.get("http://localhost:4000/profile")
    .then(  response =>{
        setUserInfo(response.data)

        }
          
        )

      }
    
    

  , [])  

  function logout(){
    axios.defaults.withCredentials = true

    // axios.get("http://localhost:4000/profile")
    
    axios.post("http://localhost:4000/logout")
    setUserInfo(null)
      }

  const navigate = useNavigate();
  const username = userInfo?.username;

  return (<div>


  { <Flex minWidth='max-content' alignItems='center' gap='2' backgroundColor='#38ad73' direction={'row'}>
  
  <Box p='2'>
    <Heading size='md' onClick={() => navigate('/')}>My App</Heading>
  </Box>
  <Box p='2' ml='700px'>
    <a href=''>About</a>
  </Box>
  <Box p='2' ml='100px'>
    <a href=''>Blogs</a>
  </Box>
  <Box p='2' ml='100px'>
    <a href=''>Contact</a>
  </Box>
  <Spacer />
  {username && (
    <ButtonGroup gap='2' m='10px'>
      <Text>Welcome  {username}</Text>
    <Button colorScheme='teal' onClick={() => navigate('/create')} > Create Post</Button>
    <Menu>
  <MenuButton as={Button} colorScheme='pink'>
    Profile
  </MenuButton>
  <MenuList>
    <MenuGroup title='Profile'>
      <MenuItem onClick={() => navigate('/profile')}>Settings</MenuItem>
      <MenuItem onClick={logout}>Logout </MenuItem>
    </MenuGroup>
    <MenuDivider />
    <MenuGroup title='Help'>
      <MenuItem>Docs</MenuItem> 
      <MenuItem>FAQ</MenuItem>
    </MenuGroup>
  </MenuList>
</Menu>
    <Button colorScheme='teal'onClick={logout}>Logout</Button>
   </ButtonGroup>
  )}
  {
    !username && (
    <ButtonGroup gap='2' m='10px'>
    <Button colorScheme='teal' onClick={() => navigate('/signup')} > Sign Up</Button>
    <Button colorScheme='teal'onClick={() => navigate('/login')}>Log in</Button>
   </ButtonGroup>
    )
  }
  
</Flex> 
}
</div>)
}

export default Navbar
