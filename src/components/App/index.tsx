import React from 'react';
import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom';
import styled from 'styled-components';
import Header from '../Header';
import Home from '../../routes/Home';
import Products from '../../routes/Products';
import Wishlist from '../../routes/Wishlist';

const Container = styled(Layout)`
  width:375px;
  margin:0 auto;
  background-color:#e0e0e0;
`;

const Content = styled(Layout.Content)`
  width:100%;
`;

const Footer = styled(Layout.Footer)`
  width:100%;
  background:#eee;
  padding:32px 16px;
`;

const RouterContent = () => (
  <Container>
    <Header />
    <Content>
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/products" component={Products} />
        <Route exact={true} path="/wishlist" component={Wishlist} />
        <Redirect from={'*'} to={'/'} />
      </Switch>
    </Content>
    <Footer>Copyright © 2019 All rights reserved</Footer>
  </Container>
);

const WrappedRoutes = withRouter(RouterContent);

class App extends React.Component {
  render() {
    return (
      <Router>
        <WrappedRoutes />
      </Router>
    )
  }
}

export default App;
