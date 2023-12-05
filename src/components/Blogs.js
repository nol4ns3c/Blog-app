import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Post from './Post';
import { Card, Flex, CardHeader, CardBody, CardFooter, Image, Stack, Text, Button, Heading } from '@chakra-ui/react';


const Blogs = () => {

  const [posts,setPosts] = useState([])

  useEffect(() =>{
    axios({
      method: "get",
      url: "http://localhost:4000/posts",
      
    }).then(res => {
      const posts = res.data
      
      setPosts(posts);
    })
    
  }, [])
  return (
    <>
    <Flex gap={5} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} margin={"2em auto"} width={"70em"}>


      {posts.length > 0 && posts.map(post =>(
        <Post {...post}/>
      ))}
      </Flex>
    </> )

      
}

export default Blogs
