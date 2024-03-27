import React from "react";
import { Link } from "react-router-dom";
import styles from "./PokemonList.module.scss";

const PokemonList = ({ pokemons }) => {
  if (!pokemons || pokemons.length === 0) {
    return null;
  }
  return (
    <div className={styles.pokemonsList}>
      {pokemons.map((pokemon) => (
        <Link
          to={`/pokemon/${pokemon.id}`}
          className={styles.item}
          key={pokemon.id}
        >
          <div
            className={styles.img}
            style={{
              backgroundImage: `url(${pokemon.sprites.front_default})`,
            }}
          ></div>
          <div className={styles.id_xp}>
            <span>{`#${pokemon.id}`}</span>
            {pokemon.base_experience && (
              <span>{`EXP: ${pokemon.base_experience}`}</span>
            )}
          </div>
          <div className={styles.name}>{pokemon.name}</div>
          <ul className={styles.types}>
            {pokemon.types.map((type, i) => (
              <li key={i}> {type.type.name}</li>
            ))}
          </ul>
        </Link>
      ))}
    </div>
  );
};

export default PokemonList;
