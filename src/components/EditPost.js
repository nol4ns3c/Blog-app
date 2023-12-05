import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css' ;
import { Navigate, useParams } from 'react-router-dom';

import { Input, Flex, InputGroup, Box, Text, Button } from '@chakra-ui/react'
import axios from 'axios';


const EditPost = () => {
    const {id} = useParams()
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    axios.defaults.withCredentials = true


    useEffect(() =>{
        axios({
            method: "get",
            url: "http://localhost:4000/post/" + id,
            
           
          }).then(postInfo =>{
            setTitle(postInfo.data.title)
            setSummary(postInfo.data.summary)
            setContent(postInfo.data.content)
          }

          )
        
    }, [])

    async function editPost(ev){
        
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('id', id);
        data.set('content', content);
        if (files?.[0]){
            data.set('file', files?.[0]);

        }


        
        console.log(data.get('title'))
        
        const res = await axios({
            method: "put",
            url: "http://localhost:4000/post/"  ,
            data: data,
           
          })
        

        if(res.status == 200){
            
            
            setRedirect(true)

            
          } else{
            alert("Problem occured during post request");}
        
        


    }

    if(redirect) {
        return <Navigate to={'/post/' + id} />
          } 
    return (
    <>
    <form onSubmit={editPost}>
    
    <Flex gap={4} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} margin={"1em auto"}  p={'5em'} >

    <Box flexGrow={'1'}>
    <Text fontSize={'5xl'} fontFamily={'mono'}>Edit Post</Text>
    
    </Box>
    <Flex flexDirection={"row"} gap={'10em'} alignItems={"center"}>
    <Box pt={'3em'}>
    <Input 

    type='file'
    //value={file}
    onChange={ev => setFiles(ev.target.files)}
    marginTop={'5em'}

     />
    </Box>

    <Box>
    <Button colorScheme='blue' type='submit'>Submit</Button>

    </Box>
    </Flex>
    <Box width={'50em'}>    

    <Input 
    type = {'title'}
    value={title}
    onChange={ev => setTitle(ev.target.value)}
    placeholder={'Title'}
    htmlSize={'75'} />
    </Box>

    <Box width={'50em'}>     

    <Input 
    type='summary'
    value={summary}
    onChange={ev => setSummary(ev.target.value)}
    height={'5em'}
    placeholder={'Summary'}
     />
    </Box>


    <Box width={'50em'} height={'10em'}>
        <ReactQuill value={content} onChange={newValue => setContent(newValue)}/>
    </Box >

    
    </Flex>

    </form>
    </>
  )
}

export default EditPost
