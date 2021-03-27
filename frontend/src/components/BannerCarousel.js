import React from 'react';
import { Carousel } from 'react-bootstrap';

const BannerCarousel = () => {
  return (
    <Carousel className="carousel">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/banner-1.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>The perfect jewelry for your 'I Dos'</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/banner-2.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Find a ring to dazzle her</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/banner-3.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Free shipping on all orders over $200</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>
  );
};

export default BannerCarousel;
