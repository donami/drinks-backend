import React, { useEffect } from 'react';
import AddDrink from '../components/add-drink';
import { useDispatch } from 'react-redux';
import { fetchDrinksIfNeeded } from '../redux/actions';
import Drinks from '../components/drinks';
import { Link, Switch, Route } from 'wouter';
import DrinkPage from './drink-page';
import SubNavigation from '../components/sub-navigation';

type Props = {};
const DrinksPage: React.FC<Props> = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDrinksIfNeeded());
  }, [dispatch]);

  return (
    <div>
      <h1>Drinks</h1>
      <SubNavigation>
        <Link href="/drinks">All drinks</Link>
        <Link href="/drinks/add">Add drink</Link>
      </SubNavigation>
      <div style={{ marginTop: 40 }}>
        <Switch>
          <Route path="/drinks" component={Drinks} />
          <Route path="/drinks/add" component={AddDrink} />
          <Route path="/drinks/:id" component={DrinkPage} />
        </Switch>
      </div>
    </div>
  );
};

export default DrinksPage;
