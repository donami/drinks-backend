import React from 'react';
import { Link, Switch, Route } from 'wouter';
import IngredientsPage from '../pages/ingredients-page';
import DrinksPage from '../pages/drinks-page';
import HomePage from '../pages/home-page';
import styled from 'styled-components';

type Props = {};
const Layout: React.FC<Props> = () => {
  return (
    <React.Fragment>
      <Header>
        <Logo>Drinks Admin</Logo>
        <Navigation>
          <Link href='/'>Dashboard</Link>
          <Link href='/drinks'>Drinks</Link>
          <Link href='/ingredients'>Ingredients</Link>
        </Navigation>
      </Header>

      <Main>
        <Switch>
          <Route path='/drinks/:any*' component={DrinksPage} />
          <Route path='/ingredients/:any*' component={IngredientsPage} />
          <Route path='/' component={HomePage} />
        </Switch>
      </Main>

      <Footer>Copyright (c)</Footer>
    </React.Fragment>
  );
};

export default Layout;

const Header = styled.header`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  max-height: 60px;
  background-color: ${p => p.theme.colors.primary};
`;

const Logo = styled.div`
  flex: 1;
  color: #fff;
  text-transform: uppercase;
  font-weight: 300;
`;

const Navigation = styled.nav`
  flex: 1;
  display: flex;
  justify-content: 'space-between';

  a {
    flex: 1;
    text-align: center;
    padding: 10px;
    color: #fff;
    text-transform: uppercase;
    font-weight: 300;
    border-bottom: 1px solid transparent;
    transition: all 200ms ease-in-out;

    &:hover {
      border-color: #fff;
    }
  }
`;

const Main = styled.main`
  padding: 20px;
  flex: 1;
`;

const Footer = styled.footer`
  padding: 20px;
  margin-top: ${p => p.theme.spacing.huge};
  background-color: ${p => p.theme.colors.grayDarker};
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  flex: 1;
  max-height: 60px;
`;
