import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import BagPage from './pages/BagPage';
import CheckoutPage from './pages/CheckoutPage';
import SignInPage from './pages/SignInPage';
import UserAccountPage from './pages/UserAccountPage';
import PaymentPage from './pages/PaymentPage';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={Home} exact />
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/bag/:id?" component={BagPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path='/login' component={SignInPage} />
          <Route path="/profile" component={UserAccountPage} />
          <Route path="/payment" component={PaymentPage} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
