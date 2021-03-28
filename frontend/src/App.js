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
import OrderPage from './pages/OrderPage';
import CompletedOrderPage from './pages/CompletedOrderPage';
import AdminProductsPage from './pages/AdminProductsPage';
import AdminProductEditPage from './pages/AdminProductEditPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import WishlistPage from './pages/WishlistPage';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="pb-3">
        <Route path="/" component={Home} exact />
        <Route path="/search/:keyword" component={Home} exact />
        <Route path="/collections/:cat" component={Home} exact />
        <Route path="/search/:keyword/page/:pageNumber" component={Home} exact />
        <Route path="/collections/:cat/page/:pageNumber" component={Home} exact />
        <Route path="/page/:pageNumber" component={Home} />
        <Container>
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/bag/:id?" component={BagPage} />
          <Route path="/wishlist" component={WishlistPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path='/login' component={SignInPage} />
          <Route path="/profile" component={UserAccountPage} />
          <Route path="/payment" component={PaymentPage} />
          <Route path="/orders/:id" component={CompletedOrderPage} />
          <Route path="/order" component={OrderPage} />
          <Route path="/admin/products" component={AdminProductsPage} exact />
          <Route path="/admin/products/:pageNumber" component={AdminProductsPage} exact />
          <Route path="/admin/orders" component={AdminOrdersPage} />
          <Route path="/admin/product/:id/edit" component={AdminProductEditPage} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
