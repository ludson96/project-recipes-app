import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardList from '../components/CardList';

const Meals: React.FC = () => {
  return (
    <div className="app-container">
      <Header title="Refeições" showSearch />
      <main className="flex-1">
        <CardList />
      </main>
      <Footer />
    </div>
  );
};

export default Meals;
