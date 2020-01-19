import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDrinksIfNeeded } from '../redux/actions';
import {
  getIngredientsLoading,
  getSelectedIngredient,
} from '../redux/selectors';
import Loader from '../components/loader';
import { Typography, Button } from '@material-ui/core';
import EditIngredient from '../components/edit-ingredient';
import styled from 'styled-components';

type Props = {
  params: any;
};
const IngredientPage: React.FC<Props> = ({ params }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchDrinksIfNeeded());
    dispatch({
      type: 'SELECT_INGREDIENT',
      payload: {
        itemId: params.id,
      },
    });
  }, [dispatch]);

  const ingredient = useSelector(state => getSelectedIngredient(state));
  const loading = useSelector(state => getIngredientsLoading(state));

  if (loading) {
    return <Loader />;
  }

  if (!ingredient) {
    return null;
  }

  return (
    <div>
      <Typography variant="h5">{ingredient.title}</Typography>

      {editing && (
        <React.Fragment>
          <EditIngredient ingredient={ingredient} />
        </React.Fragment>
      )}

      {!editing && (
        <React.Fragment>
          <div>
            <Button onClick={() => setEditing(true)}>Edit</Button>
          </div>
          {ingredient.image && <Image src={ingredient.image} alt="" />}
        </React.Fragment>
      )}
    </div>
  );
};

export default IngredientPage;

const Image = styled.img`
  max-width: 120px;
`;
