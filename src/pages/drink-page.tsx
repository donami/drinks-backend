import React, { useEffect, useState } from 'react';
import AddDrink from '../components/add-drink';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDrinksIfNeeded } from '../redux/actions';
import Drinks from '../components/drinks';
import { Link, Switch, Route } from 'wouter';
import {
  getSelectedDrink,
  getDrinksLoading,
  getIngredientsForDrink,
} from '../redux/selectors';
import Loader from '../components/loader';
import { Typography, Button } from '@material-ui/core';
import EditDrink from '../components/edit-drink';
import styled from 'styled-components';

type Props = {
  params: any;
};
const DrinkPage: React.FC<Props> = ({ params }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    dispatch(fetchDrinksIfNeeded());
    dispatch({
      type: 'SELECT_DRINK',
      payload: {
        itemId: params.id,
      },
    });
  }, [dispatch]);

  const drink = useSelector(state => getSelectedDrink(state));
  const loading = useSelector(state => getDrinksLoading(state));

  const selectedIngredients = useSelector(state =>
    getIngredientsForDrink(state)
  );

  if (loading) {
    return <Loader />;
  }

  if (!drink) {
    return null;
  }

  return (
    <Wrapper>
      <Typography variant="h5">{drink.title}</Typography>

      {editing && (
        <React.Fragment>
          <EditDrink drink={drink} />
        </React.Fragment>
      )}

      {!editing && (
        <React.Fragment>
          {drink.image && <Image src={drink.image} alt="" />}
          <Block dangerouslySetInnerHTML={{ __html: drink.description }} />

          <Block>
            <Typography variant="h5">Instructions</Typography>
            {!!drink.instructions.length && (
              <ol>
                {drink.instructions.map((item: any, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>
            )}
            {!drink.instructions.length && (
              <p>No instructions for this drink added.</p>
            )}
          </Block>

          <Block>
            <Typography variant="h5">Ingredients</Typography>
            {!selectedIngredients.length && (
              <p>No ingredients added for this drink.</p>
            )}
            {!!selectedIngredients.length && (
              <ul>
                {selectedIngredients
                  .filter((item: any) => !!item.ingredient)
                  .map((item: any) => (
                    <li key={item.ingredient.id}>
                      <Link to={`/ingredients/${item.ingredient.id}`}>
                        {item.ingredient.title}
                      </Link>{' '}
                      - {item.amount}
                    </li>
                  ))}
              </ul>
            )}
          </Block>

          {drink.source && (
            <Block>
              <p>Source: {drink.source}</p>
            </Block>
          )}

          <Button onClick={() => setEditing(true)}>Edit</Button>
        </React.Fragment>
      )}
    </Wrapper>
  );
};

export default DrinkPage;

const Wrapper = styled.div`
  ul,
  ol {
    margin-left: ${p => p.theme.spacing.normal};
  }
`;

const Block = styled.div`
  margin-bottom: ${p => p.theme.spacing.normal};
`;

const Image = styled.img`
  max-width: 120px;
`;
