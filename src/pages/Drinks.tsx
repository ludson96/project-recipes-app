import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardList from '../components/CardList';

const Drinks: React.FC = () => {
  return (
    <div className="app-container">
      <Header title="Bebidas" showSearch />
      <main className="flex-1">
        <CardList />
      </main>
      <Footer />
    </div>
  );
};

export default Drinks;
