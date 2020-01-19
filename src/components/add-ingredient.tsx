import React from 'react';
import AddIngredientForm from './add-ingredient-form';
import { Typography } from '@material-ui/core';

type Props = {};
const AddIngredient: React.FC<Props> = () => {
  return (
    <div>
      <Typography variant="h3">Add new ingredient</Typography>

      <AddIngredientForm />
    </div>
  );
};

export default AddIngredient;
