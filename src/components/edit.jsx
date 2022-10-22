import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import { updateAPost } from '../features/post/postSlice';



const Edit = ({title, description, postId}) => {
    const [updatedData, setUpdatedData] = useState({
      title,
      description,
    });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const dispatch = useDispatch()

  const handleChange = (e) => {
    try {
    
        setUpdatedData({...updatedData, [e.target.name]: e.target.value})
        console.log(updatedData)
    } catch (error) {
        console.error(error.message)
    }
  }

  
  const handleSubmit = (id) => {
    try {
       dispatch(updateAPost(id, updatedData))
    } catch (error) {
        console.log(error.message);
    }
  }

  const handleUpdateAndClose = async (id) => {
    await handleSubmit(id)
    onClose();
  }

  return (
    <>
      <Button onClick={onOpen}>Edit</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl >
              <FormLabel>Title</FormLabel>
              <Input ref={initialRef} value={updatedData.title} placeholder="title" name='title'  onChange={handleChange}/>

              <FormLabel>Description</FormLabel>
              <Input value={updatedData.description} placeholder="description" name='description' onChange={handleChange} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => handleUpdateAndClose(postId)} colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Edit;
