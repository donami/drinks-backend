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
import FormField from './form-field';
import AddIngredientToDrink from './add-ingredient-to-drink';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredientItems } from '../redux/selectors';
import { addDrink } from '../redux/actions';
import { Remove } from '@material-ui/icons';
import AddInstruction from './add-instruction';
import Instruction from './instruction';
import { useLocation } from 'wouter';

type Props = {};
const AddDrink: React.FC<Props> = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [source, setSource] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState<any>([]);
  const [instructions, setInstructions] = useState<string[]>([]);
  const dispatch = useDispatch();
  const [location, setLocation] = useLocation();

  const allIngredients = useSelector(state => getIngredientItems(state));

  const handleSubmit = () => {
    const data = {
      title,
      description,
      image,
      instructions,
      source,
      ingredients: ingredients.map((item: any) => {
        return {
          amount: item.amount,
          ingredientId: item.ingredient.id,
        };
      }),
    };

    dispatch(
      addDrink({
        data,
        callback: (id: string) => {
          setLocation(`/drinks/${id}`);
        },
      })
    );
  };

  const handleDeleteInstruction = (index: number) => {
    const newInstructions = [
      ...instructions.slice(0, index),
      ...instructions.slice(index + 1),
    ];

    setInstructions(newInstructions);
  };

  const handleUpdateInstruction = (index: number, value: string) => {
    const newInstructions = [
      ...instructions.slice(0, index),
      value,
      ...instructions.slice(index + 1),
    ];

    setInstructions(newInstructions);
  };

  return (
    <Wrapper>
      <Typography variant="h5">Add new drink</Typography>
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel htmlFor="input-title">Title</InputLabel>
        <OutlinedInput
          id="input-title"
          value={title}
          onChange={event => {
            setTitle(event.target.value);
          }}
          labelWidth={35}
        />
      </FormControl>
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel htmlFor="input-image">Image</InputLabel>
        <OutlinedInput
          id="input-image"
          value={image}
          onChange={event => {
            setImage(event.target.value);
          }}
          labelWidth={35}
        />
      </FormControl>
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel htmlFor="input-description">Description</InputLabel>
        <OutlinedInput
          id="input-description"
          value={description}
          multiline
          onChange={event => {
            setDescription(event.target.value);
          }}
          labelWidth={85}
        />
      </FormControl>
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel htmlFor="input-description">Source</InputLabel>
        <OutlinedInput
          id="input-description"
          value={source}
          multiline
          onChange={event => {
            setSource(event.target.value);
          }}
          labelWidth={85}
        />
      </FormControl>
      <FormField>
        <div style={{ display: 'flex' }}>
          <Typography variant="h5" gutterBottom>
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
              handleDelete={() => handleDeleteInstruction(index)}
              handleUpdate={(value: string) =>
                handleUpdateInstruction(index, value)
              }
            />
          );
        })}
      </FormField>
      <FormField>
        <Typography variant="h5" gutterBottom>
          Ingredients
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {!ingredients.length && (
            <p>
              <em>No ingredients added yet.</em>
            </p>
          )}
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
                      aria-label="delete"
                      onClick={() => {
                        setIngredients([
                          ...ingredients.slice(0, ingredients.indexOf(item)),
                          ...ingredients.slice(ingredients.indexOf(item) + 1),
                        ]);
                      }}
                    >
                      <Remove color="error" />
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
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Add
      </Button>
      <Button variant="contained">Cancel</Button>
    </Wrapper>
  );
};

export default AddDrink;

const Wrapper = styled.div`
  padding: ${p => p.theme.spacing.normal};
`;
