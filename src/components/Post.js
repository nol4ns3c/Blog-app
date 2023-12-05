import React from 'react'
import { Card, Flex, CardHeader, CardBody, CardFooter, Image, Stack, Text, Button, Heading, Box } from '@chakra-ui/react'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'

export default  function Post({_id, title, summary, cover, context, createdAt, author},)  { 
  const navigate = useNavigate();
  const path = '/post/' + _id
  return (
    
    
    <div>
      <Box>
      <Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
  
>
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '200px' }}
    src={'http://localhost:4000/' + cover}
    alt='no pic'
  />

  <Stack>
    <CardBody>
      <Heading size='md'>{title}</Heading>

      <Text py='2'>
        {summary}
      </Text>
      <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
      <Text>
        {author.username}
      </Text>
    </CardBody>

    <CardFooter>
      <Button variant='solid' colorScheme='blue' onClick={() => navigate(path)}>
        Read More
      </Button>
    </CardFooter>
  </Stack>
</Card>
</Box>

    </div>
  )
}




