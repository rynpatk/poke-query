import React from 'react';
import { useQuery } from 'react-query';

import './App.css';

const API_URL = 'https://pokeapi-graphiql.herokuapp.com';

const POKEMON_QUERY = (pokeId) => `
  query {
    pokemon(number: ${pokeId}) {
      name
    }
  }
`;

const Pokemon = ({ pokeId }) => {
  const opts = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: POKEMON_QUERY(pokeId) })
  };

  const fetchPokemon = async () => {
    return await (await fetch(API_URL, opts)).json();
  }

  const { status, data, error } = useQuery('pokemon', fetchPokemon);

  const renderContents = () => {
    if (status === 'loading') return <p>loading...</p>;
    if (error) return <p>woops!</p>;
    
    const { data: { pokemon } } = data;

    return (
      <>
        <p>{pokemon.name}</p>
      </>
    );
  }

  return (
    <div>
      {renderContents()}
    </div>
  )
}

const App = () => {
  const pokemonIdsToFetch = [148];

  return (
    <div>
      {pokemonIdsToFetch.map((id) => {
        return (
          <Pokemon key={id} pokeId={id} />
        );
      })}
    </div>
  );
}

export default App;
