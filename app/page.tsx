"use client";

import React, { useState, useEffect } from 'react';
import SearchForm from "./components/SearchForm";
import StartupCard from "./components/StartupCard";

async function getCockTails() {

  const cocktails = [];
  const seenIds = new Set();

  for (let i = 0; i < 5; i++) {
    const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php',{
      cache: 'no-store',
    });
    const data = await res.json();
    //console.log("Cocktail: ",data);
    const drink = data.drinks[0];

    if(!seenIds.has(drink.idDrink)){
      cocktails.push(drink);
      seenIds.add(drink.idDrink);
    }

    await new Promise(resolve => setTimeout(resolve, 300));
  }
  return cocktails;
  // const posts = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  // const data = await posts.json();
  // console.log(data);
  // return data;
}

async function searchCocktails(query?:string) {
  const cocktails = [];

  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log("Cocktail: ",data);
  const drink = data.drinks[0];
  cocktails.push(drink);

  return cocktails;
}

type Cocktail = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  // Add other relevant properties from the API response
};

export default function Home({searchParams}:{
  searchParams: Promise<{query?:string}>
}) {

  const [cocktails, setCocktails] = useState<Cocktail[]>([]); // State to store cocktails
  const [favorites, setFavorites] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(""); 

  const addToFavorites = (idDrink: string) => {
    const selectedCocktail = cocktails.find((cocktail) => cocktail.idDrink === idDrink);

    if (selectedCocktail && !favorites.find((fav) => fav.idDrink === idDrink)) {
      setFavorites([...favorites, selectedCocktail]); // Add it to the favorites state
    }
  };

  const handleSearch = async (query: string) => {
    setQuery(query);
    setLoading(true);
    const newCocktails = await searchCocktails(query);
    console.log("Requested Cocktail: ",newCocktails);
    setCocktails(newCocktails);
    setLoading(false);
  }

  const handleRefresh = async () => {
    setLoading(true); // Optional: Show loading indicator
    const newCocktails = await getCockTails();
    setCocktails(newCocktails); // Update the state with new cocktails
    setLoading(false); // Optional: Hide loading indicator
  };

  useEffect(() => {
    const fetchInitialCocktails = async () => {
      const initialCocktails = await getCockTails();
      setCocktails(initialCocktails); // Set the cocktails state
    };

    fetchInitialCocktails();
  }, []);

  useEffect(() => {
    // Update query if passed from URL searchParams
    const fetchQuery = async () => {
      const params = await searchParams;
      setQuery(params.query || "");
    };

    fetchQuery();
  }, [searchParams]);

  // const posts = await getCockTails();
  // const query = (await searchParams).query;

  return (
    <>
    <h1 style={{ textAlign: "center" }}>Welcome To The Cocktail Stores</h1>

    <section className="section_container">
    <SearchForm onSearch = {handleSearch}/>
    
      <p className="text-30-semibold">
        {query? `Search results for "${query}"` : 'All Cocktails'}
      </p>

      <ul className="mt-7 card_grid">
        {cocktails?.length> 0 ? (
          cocktails.map((cocktail:StartupCardType, index:number) => (
            <StartupCard 
              key={cocktail.idDrink}
              idDrink={cocktail.idDrink}
              strDrink={cocktail.strDrink}
              strDrinkThumb={cocktail.strDrinkThumb} 
              //post={cocktail} 
              onAdd={addToFavorites}
            />
          ))
        ):(
          <p className="no-result">No Cocktail Found</p>
        )}

      </ul>

      <button onClick={handleRefresh} className="refresh-button">
          {loading ? "Loading..." : "Refresh Cocktails"}
        </button>

        {favorites.length > 0 && (
          <section className="favorites-section">
            <h2 className="favorites-title">Your Favorites</h2>
            <ul className="favorites-list">
            {favorites.map((fav) => (
              <li key={fav.idDrink} className="favorite-item">
                <img src={fav.strDrinkThumb} alt={fav.strDrink} className="favorite-img" />
                <p>{fav.strDrink}</p>
              </li>
            ))}
            </ul>
          </section>
        )}
    </section>
    </>
  );
}
