import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDrinksIfNeeded } from '../redux/actions';

type Props = {};
const HomePage: React.FC<Props> = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDrinksIfNeeded());
  }, [dispatch]);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default HomePage;
