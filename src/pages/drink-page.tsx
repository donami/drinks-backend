import React, { useEffect, useState } from 'react';
import AddDrink from '../components/add-drink';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDrinksIfNeeded } from '../redux/actions';
import Drinks from '../components/drinks';
import { Link, Switch, Route } from 'wouter';
import { getSelectedDrink, getDrinksLoading } from '../redux/selectors';
import Loader from '../components/loader';
import { Typography, Button } from '@material-ui/core';
import EditDrink from '../components/edit-drink';

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

  const handleSave = () => {
    setEditing(false);
  };

  if (loading) {
    return <Loader />;
  }

  if (!drink) {
    return null;
  }

  return (
    <div>
      <Typography variant='h5'>{drink.title}</Typography>

      {editing && (
        <React.Fragment>
          <EditDrink drink={drink} />
        </React.Fragment>
      )}

      {!editing && (
        <React.Fragment>
          <div dangerouslySetInnerHTML={{ __html: drink.description }} />
          <Button onClick={() => setEditing(true)}>Edit</Button>
        </React.Fragment>
      )}
    </div>
  );
};

export default DrinkPage;
