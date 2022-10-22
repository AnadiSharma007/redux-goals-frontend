import React, {useEffect} from 'react'
import { Button, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { deleteAPost } from '../features/post/postSlice';
import Edit from './edit'; 

const GoalsTable = ({posts}) => {

  const dispatch = useDispatch()
  
  const removePost = async (id) => {
    await dispatch(deleteAPost(id));
  }
  
  return (
    <div>
        <TableContainer>
  <Table variant='striped' colorScheme='teal'>
    <TableCaption>Posts List</TableCaption>
    <Thead>
      <Tr>
        <Th>Title</Th>
        <Th>Description</Th>
        <Th>Edit</Th>
        <Th>Delete</Th>
      </Tr>
    </Thead>
    <Tbody>
      { posts.length > 1  ? (<>{posts.map((post, index) => (
              <Tr key={index}>
              <Td>{post.title}</Td>
              <Td>{post.description}</Td>
              <Td><Edit title={post.title} description={post.description} postId={post._id}/></Td>
              <Td><Button colorScheme={'red'} onClick={() => removePost(post._id)}>Delete</Button></Td>
            </Tr>
      ) )}</>) : (
        <Tr key={posts._id}>
              <Td>{posts.title}</Td>
              <Td>{posts.description}</Td>
              <Td><Edit title={posts.title} description={posts.description} postId={posts._id}/></Td>
              <Td><Button colorScheme={'red'} onClick={() => removePost(posts._id)}>Delete</Button></Td>
            </Tr>
      )}

    </Tbody>
  </Table>
</TableContainer>
    </div>
  )
}

export default GoalsTable