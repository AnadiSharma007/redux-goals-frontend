import React from 'react'
import {FormLabel, Input} from '@chakra-ui/react'

const FormRow = ({type, name, value,  handleChange}) => {
  return (
    <div>
          <FormLabel>{`${name[0].toUpperCase()}${name.substring(1)}`}</FormLabel>
          <Input type={type} name={name} value={value} onChange={handleChange} />
        </div>
  )
}

export default FormRow