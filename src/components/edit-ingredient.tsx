import React, { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
  IconButton,
} from '@material-ui/core';
import styled from 'styled-components';
import FormField from './form-field';
import { firestore } from '../config/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredientItems, getIngredientsForDrink } from '../redux/selectors';
import { addDrink, updateDrink, updateIngredient } from '../redux/actions';
import { Remove } from '@material-ui/icons';
import { Ingredient } from '../models/interface';

type Props = {
  ingredient: Ingredient;
};
const EditIngredient: React.FC<Props> = ({ ingredient }) => {
  const [title, setTitle] = useState(ingredient.title);
  const [description, setDescription] = useState(ingredient.description || '');
  const [image, setImage] = useState(ingredient.image || '');
  const dispatch = useDispatch();

  const allIngredients = useSelector(state => getIngredientItems(state));

  const handleSubmit = () => {
    const data = {
      id: ingredient.id,
      title,
      description,
      image,
    };

    dispatch(updateIngredient({ data }));
  };

  return (
    <Wrapper>
      <Typography variant='h3'>Edit ingredient</Typography>
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
        Save
      </Button>
      <Button variant='contained'>Cancel</Button>
    </Wrapper>
  );
};

export default EditIngredient;

const Wrapper = styled.div`
  padding: ${p => p.theme.spacing.normal};
`;
