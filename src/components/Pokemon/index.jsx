import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import LoaderIcon from "../icons/LoaderIcon";
import NotFound from "../icons/NotFoundIcon";

import styles from "./Pokemon.module.scss";
import { fetchPokemons, fetchSpecies, fetchEvolutions } from "../../api";
import PokemonList from "../common/PokemonList";

const Pokemon = () => {
  const { pokemonID } = useParams();
  const navigate = useNavigate();
  if (!pokemonID) {
    navigate("/");
  }

  let { data: pokemon, isFetching } = useQuery(
    ["getPokemon", pokemonID],
    async () => {
      if (pokemonID) {
        try {
          const res = await fetchPokemons({ id: parseInt(pokemonID) });
          const speciesRes = await fetchSpecies({
            id: parseInt(
              res.data.species.url.split("/pokemon-species/")[1].split("/")[0]
            ),
          });
          const evolutionsRes = await fetchEvolutions({
            id: parseInt(
              speciesRes.data.evolution_chain.url
                .split("/evolution-chain/")[1]
                .split("/")[0]
            ),
          });

          let evolutions = [];
          if (extractSpecies(evolutionsRes.data).length > 0) {
            const ids = extractSpecies(evolutionsRes.data).map((el) =>
              parseInt(el.url.split("/pokemon-species/")[1].split("/")[0])
            );
            const listRes = await Promise.allSettled(
              ids
                .filter((el) => parseInt(el) !== parseInt(pokemonID))
                .map((id) => {
                  return fetchPokemons({ id });
                })
            );
            evolutions = listRes
              .filter((el) => el.status === "fulfilled")
              .map((el) => el.value.data);
          }
          return {
            ...res.data,
            speciesData: speciesRes.data ? speciesRes.data : null,
            evolutions,
          };
        } catch (error) {
          console.error(error);
        }
      }
    }
  );

  function extractSpecies(data) {
    const speciesList = [];

    function extractSpeciesRecursive(data) {
      if (typeof data === "object" && data !== null) {
        if (data.hasOwnProperty("species")) {
          speciesList.push(data["species"]);
        }
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            extractSpeciesRecursive(data[key]);
          }
        }
      } else if (Array.isArray(data)) {
        data.forEach((item) => extractSpeciesRecursive(item));
      }
    }

    extractSpeciesRecursive(data);
    return speciesList;
  }

  console.log(pokemon);

  if (isFetching) {
    return (
      <div className={styles.loader}>
        <LoaderIcon />
        <p>Loading Pokemon...</p>
      </div>
    );
  }

  if (!isFetching && !pokemon) {
    return <NotFound />;
  }
  return (
    <div className={styles.pokemonPage}>
      <div className={styles.top}>
        <div className={styles.left}>
          <div className={styles.name}>{pokemon.name}</div>
          <div className={styles.description}>
            {pokemon?.speciesData?.flavor_text_entries &&
            pokemon?.speciesData?.flavor_text_entries.length > 0
              ? pokemon?.speciesData?.flavor_text_entries[0]?.flavor_text
              : ""}
          </div>
          <div className={styles.info}>
            <span className={styles.section_title}>species : </span>
            <div className={styles.value}>{pokemon.species.name}</div>
          </div>
          <div className={styles.info}>
            <span className={styles.section_title}>height : </span>
            <div className={styles.value}>{pokemon.height}</div>
          </div>
          <div className={styles.info}>
            <span className={styles.section_title}>weight : </span>
            <div className={styles.value}>{pokemon.weight}</div>
          </div>
          <div className={styles.info}>
            <span className={styles.section_title}>habitat : </span>
            <div className={styles.value}>
              {pokemon.speciesData.habitat.name}
            </div>
          </div>
          <div className={styles.info}>
            <span className={styles.section_title}>Base experience : </span>
            <div className={styles.value}>{pokemon.base_experience}</div>
          </div>
          <div className={styles.info}>
            <span className={styles.section_title}>abilities : </span>
            <ul className={styles.abilities}>
              {pokemon.abilities.map((el, i) => (
                <li key={i}>{el.ability.name}</li>
              ))}
            </ul>
          </div>
          <div className={styles.info}>
            <span className={styles.section_title}>types : </span>
            <ul className={styles.types}>
              {pokemon.types.map((el, i) => (
                <Link
                  to={`/type/${el.type.url.split("/type/")[1].split("/")[0]}`}
                  key={i}
                >
                  {el.type.name}
                </Link>
              ))}
            </ul>
          </div>
          <div className={styles.info}>
            <span className={styles.section_title}>stats : </span>
            <ul className={styles.types}>
              {pokemon.stats.map((el, i) => (
                <li key={i}>{`${el.stat.name} : ${el.base_stat}`}</li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className={styles.img}
          style={{
            backgroundImage: `url(${pokemon.sprites.front_default})`,
            backgroundColor: pokemon?.speciesData?.color?.name,
          }}
        ></div>
      </div>
      {pokemon.evolutions.length > 0 && (
        <>
          <div className={styles.title}>Evolutions</div>
          <PokemonList pokemons={pokemon.evolutions} />
        </>
      )}
    </div>
  );
};

export default Pokemon;
