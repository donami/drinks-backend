import React, { useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
  IconButton,
} from '@material-ui/core';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addIngredient } from '../redux/actions';

type Props = {};
const AddIngredient: React.FC<Props> = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const data = {
      title,
      description,
      image,
    };

    dispatch(addIngredient({ data }));
  };

  return (
    <Wrapper>
      <Typography variant='h3'>Add new ingredient</Typography>
      <FormControl fullWidth margin='normal' variant='outlined'>
        <InputLabel htmlFor='input-title'>Title</InputLabel>
        <OutlinedInput
          id='input-title'
          value={title}
          onChange={event => {
            setTitle(event.target.value);
          }}
          labelWidth={35}
        />
      </FormControl>
      <FormControl fullWidth margin='normal' variant='outlined'>
        <InputLabel htmlFor='input-image'>Image</InputLabel>
        <OutlinedInput
          id='input-image'
          value={image}
          onChange={event => {
            setImage(event.target.value);
          }}
          labelWidth={35}
        />
      </FormControl>
      <FormControl fullWidth margin='normal' variant='outlined'>
        <InputLabel htmlFor='input-description'>Description</InputLabel>
        <OutlinedInput
          id='input-description'
          value={description}
          multiline
          onChange={event => {
            setDescription(event.target.value);
          }}
          labelWidth={85}
        />
      </FormControl>

      <Button variant='contained' color='primary' onClick={handleSubmit}>
        Add
      </Button>
      <Button variant='contained'>Cancel</Button>
    </Wrapper>
  );
};

export default AddIngredient;

const Wrapper = styled.div`
  padding: ${p => p.theme.spacing.normal};
`;
