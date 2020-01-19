import React, { useEffect } from 'react';
import AddDrink from '../components/add-drink';
import { useDispatch } from 'react-redux';
import { fetchDrinksIfNeeded } from '../redux/actions';
import Drinks from '../components/drinks';
import { Link, Switch, Route } from 'wouter';
import DrinkPage from './drink-page';
import Ingredients from '../components/ingredients';
import AddIngredient from '../components/add-ingredient';
import IngredientPage from './ingredient-page';
import SubNavigation from '../components/sub-navigation';

type Props = {};
const IngredientsPage: React.FC<Props> = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDrinksIfNeeded());
  }, [dispatch]);

  return (
    <div>
      <h1>Ingredients</h1>
      <SubNavigation>
        <Link href='/ingredients'>All ingredients</Link>
        <Link href='/ingredients/add'>Add Ingredient</Link>
      </SubNavigation>
      <div style={{ marginTop: 40 }}>
        <Switch>
          <Route path='/ingredients' component={Ingredients} />
          <Route path='/ingredients/add' component={AddIngredient} />
          <Route path='/ingredients/:id' component={IngredientPage} />
        </Switch>
      </div>
    </div>
  );
};

export default IngredientsPage;
