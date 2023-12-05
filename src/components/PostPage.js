import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Flex, CardHeader, CardBody, CardFooter, Image, Stack, Text, Button, Heading, Box, Headning, Divider } from '@chakra-ui/react';
import { format } from 'date-fns'
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';


const PostPage = () => {
    const[postInfo, setPostInfo] = useState(null);
    const navigate = useNavigate();

    const {userInfo} = useContext(UserContext)
    const {id} = useParams();
   
    useEffect(() =>{
        
        axios({
            method: "get",
            url: "http://localhost:4000/post/" + id,
            
          }).then(res => {
            const post = res.data;
            
            setPostInfo(post);
          })
    },[]);

    function Delete(){
        axios({
            method: "delete",
            url: "http://localhost:4000/post/" + id,
            
          })

        navigate('/')

        
    }

    if (!postInfo) return ''
  return (  
    <div>
      <Flex gap={5} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} margin={"2em auto"} width={"70em"}>
  <Box>
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '600px' }}
    src={'http://localhost:4000/' + postInfo.cover}
    alt='no pic'
  />
    </Box>

    <Heading>{postInfo.title}</Heading>
    <Flex flexDirection={"row"} gap={'60em'} justify={'space-between'} >
    <Box>
    <Text>{postInfo.author.username}</Text>
    </Box>
    <Box>
    <Text>
      <time>{format(new Date(   postInfo.createdAt), 'MMM d, yyyy HH:mm')}</time>
      </Text>
      </Box>
      </Flex>
      
    <div dangerouslySetInnerHTML={{__html:postInfo.content}}>
        
    </div>
    {userInfo.id == postInfo.author._id && (
        <Button colorScheme='teal' onClick={() => navigate('/edit/' + postInfo._id)} > Edit Post</Button>
        

      )}
    {userInfo.id == postInfo.author._id && (
        <Button colorScheme='red' onClick={() => Delete()} > Delete Post</Button>
        

      )}
      

    </Flex>
    </div>
  )
}

export default PostPage
