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
import AddIngredientToDrink from './add-ingredient-to-drink';
import { firestore } from '../config/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredientItems, getIngredientsForDrink } from '../redux/selectors';
import { addDrink, updateDrink } from '../redux/actions';
import { Remove } from '@material-ui/icons';
import { Drink } from '../models/interface';
import AddInstruction from './add-instruction';
import Instruction from './instruction';

type Props = {
  drink: Drink;
};
const EditDrink: React.FC<Props> = ({ drink }) => {
  const [title, setTitle] = useState(drink.title);
  const [description, setDescription] = useState(drink.description || '');
  const [image, setImage] = useState(drink.image || '');
  const [ingredients, setIngredients] = useState<any>([]);
  const [instructions, setInstructions] = useState<string[]>(
    drink.instructions || []
  );

  const dispatch = useDispatch();

  const allIngredients = useSelector(state => getIngredientItems(state));
  const selectedIngredients = useSelector(state =>
    getIngredientsForDrink(state)
  );

  useEffect(() => {
    setIngredients(selectedIngredients);
  }, []);

  const handleSubmit = () => {
    const data = {
      id: drink.id,
      title,
      description,
      image,
      instructions,
      ingredients: ingredients.map((item: any) => {
        return {
          amount: item.amount,
          ingredientId: item.ingredient.id,
        };
      }),
    };

    dispatch(updateDrink({ data }));
  };

  const handleUpdateInstruction = (index: number, value: string) => {
    const newInstructions = [
      ...instructions.slice(0, index),
      value,
      ...instructions.slice(index + 1),
    ];

    setInstructions(newInstructions);
  };

  const handleDeleteInstruction = (index: number) => {
    const newInstructions = [
      ...instructions.slice(0, index),
      ...instructions.slice(index + 1),
    ];

    setInstructions(newInstructions);
  };

  return (
    <Wrapper>
      <Typography variant='h3'>Edit drink</Typography>
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
      <FormField>
        <div style={{ display: 'flex' }}>
          <Typography variant='h5' gutterBottom>
            Instructions
          </Typography>
          <AddInstruction
            onSubmit={(data: any) => {
              setInstructions(instructions.concat(data));
            }}
          />
        </div>
        {!instructions.length && (
          <p>
            <em>No instructions added.</em>
          </p>
        )}
        {instructions.map((instruction, index) => {
          return (
            <Instruction
              key={instruction}
              index={index}
              instruction={instruction}
              handleUpdate={(value: string) =>
                handleUpdateInstruction(index, value)
              }
              handleDelete={() => handleDeleteInstruction(index)}
            />
          );
          // return (
          //   <div key={index}>
          //     {index + 1}. {instruction}
          //   </div>
          // );
        })}
      </FormField>
      <FormField>
        <Typography variant='h5' gutterBottom>
          Ingredients
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {!ingredients.length && <p>No ingredients added yet.</p>}
          {!!ingredients.length && (
            <div
              style={{
                maxWidth: '200px',
                flex: 1,
              }}
            >
              {ingredients.map((item: any, id: number) => {
                return (
                  <div
                    key={id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderBottom: '1px solid #eee',
                    }}
                  >
                    {item.ingredient.title}
                    <IconButton
                      aria-label='delete'
                      onClick={() => {
                        setIngredients([
                          ...ingredients.slice(0, ingredients.indexOf(item)),
                          ...ingredients.slice(ingredients.indexOf(item) + 1),
                        ]);
                      }}
                    >
                      <Remove color='error' />
                    </IconButton>
                  </div>
                );
              })}
            </div>
          )}
          <AddIngredientToDrink
            ingredients={allIngredients}
            onSubmit={(data: any) => {
              setIngredients(ingredients.concat(data));
            }}
          />
        </div>
      </FormField>
      <Button variant='contained' color='primary' onClick={handleSubmit}>
        Save
      </Button>
      <Button variant='contained'>Cancel</Button>
    </Wrapper>
  );
};

export default EditDrink;

const Wrapper = styled.div`
  padding: ${p => p.theme.spacing.normal};
`;
