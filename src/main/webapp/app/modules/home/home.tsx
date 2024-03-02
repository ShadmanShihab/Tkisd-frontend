import Card from 'app/components/Card/Card';
import { EmblaCarousel } from 'app/components/EmblaCarousel';
import HeroCarousel from 'app/components/HeroCarousel';
import React from 'react';

import './home.css';
import './home.scss';
// import { Translate } from 'react-jhipster';
// import { Link } from 'react-router-dom';
// import { Alert, Col, Row } from 'reactstrap';

// import { useAppSelector } from 'app/config/store';

// const slides = [
//   {
//     url: 'https://images.pexels.com/photos/819519/pexels-photo-819519.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//   },
//   {
//     url: 'https://images.pexels.com/photos/1320755/pexels-photo-1320755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//   },
//   {
//     url: 'https://images.pexels.com/photos/800658/pexels-photo-800658.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load',
//   },
// ];

const cardData = [
  {
    id: 1,
    imageurl: 'https://images.pexels.com/photos/6796574/pexels-photo-6796574.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load',
    name: 'Sport sneaker',
    price: '$20.99',
    description: 'some description about product..',
  },
  {
    id: 2,
    imageurl: 'https://images.pexels.com/photos/10740865/pexels-photo-10740865.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load',
    name: 'Sport sneaker',
    price: '$20.99',
    description: 'some description about product..',
  },
  {
    id: 3,
    imageurl: 'https://images.pexels.com/photos/6796574/pexels-photo-6796574.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load',
    name: 'Sport sneaker',
    price: '$20.99',
    description: 'some description about product..',
  },
  {
    id: 4,
    imageurl: 'https://images.pexels.com/photos/10740865/pexels-photo-10740865.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load',
    name: 'Sport sneaker',
    price: '$20.99',
    description: 'some description about product..',
  },
  {
    id: 5,
    imageurl: 'https://images.pexels.com/photos/6796574/pexels-photo-6796574.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load',
    name: 'Sport sneaker',
    price: '$20.99',
    description: 'some description about product..',
  },
  {
    id: 6,
    imageurl: 'https://images.pexels.com/photos/10740865/pexels-photo-10740865.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load',
    name: 'Sport sneaker',
    price: '$20.99',
    description: 'some description about product..',
  },
];

const productCatagories = cardData.map(item => <Card name={item.name} url={item.imageurl} price={item.price} desc={item.description} />);

export const Home = () => {
  return (
    <div>
      <section className="hero_area">
        <EmblaCarousel />
      </section>
      <section className="categories">
        <h2>Categories</h2>
        <div className="cat-products">{productCatagories}</div>
        <button className="rounded-button button4">View All Products</button>
      </section>
      <section>
        <HeroCarousel />
      </section>
    </div>
  );
};

export default Home;
