import React from 'react';
import { Switch, Route, Link } from 'wouter';
import ReduxToastr from 'react-redux-toastr';
import './App.css';
import HomePage from './pages/home-page';
import { GlobalStyle } from './themes/global';
import { ThemeProvider } from 'styled-components';
import { myTheme } from './themes/default-theme';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import DrinksPage from './pages/drinks-page';
import IngredientsPage from './pages/ingredients-page';
import Layout from './components/layout';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={myTheme}>
        <GlobalStyle />
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates
          position='top-left'
          // getState={(state: any) => state.toastr} // This is the default
          transitionIn='fadeIn'
          transitionOut='fadeOut'
          progressBar
          closeOnToastrClick
        />
        <Layout />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
