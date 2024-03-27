import React, { useState } from "react";
import { fetchPokemons, fetchSingleType, fetchTypes } from "../../api";
import { useQuery } from "react-query";
import styles from "./Home.module.scss";
import { Link } from "react-router-dom";
import LoaderIcon from "../icons/LoaderIcon";
import NotFound from "../icons/NotFoundIcon";
import PokemonList from "../common/PokemonList";
import Pagination from "../common/Pagination";

const Home = () => {
  const [start, setStart] = useState(0);
  const [nbResults, setNbResults] = useState(0);
  const [type, setType] = useState(null);

  let { data: types } = useQuery(["getTypes"], async () => {
    try {
      const res = await fetchTypes();
      return res.data.results.map((el) => {
        return {
          ...el,
          id: parseInt(el.url.split("/type/")[1].split("/")[0]),
        };
      });
    } catch (error) {
      console.error(error);
    }
  });

  let { data: pokemons, isFetching: fetchingPokemons } = useQuery(
    ["getPokemons", start, type],
    async () => {
      try {
        let res;
        let ids = [];
        if (type) {
          res = await fetchSingleType({ id: parseInt(type.id) });
          setNbResults(res.data.pokemon.length);

          ids = res.data.pokemon
            .map((el) =>
              parseInt(el.pokemon.url.split("/pokemon/")[1].split("/")[0])
            )
            .slice(start, start + 20);
        } else {
          res = await fetchPokemons({ start });
          setNbResults(res.data.count);
          ids = res.data.results.map((el) =>
            parseInt(el.url.split("/pokemon/")[1].split("/")[0])
          );
        }

        const detailedResults = await Promise.allSettled(
          ids.map((id) => {
            return fetchPokemons({ id });
          })
        );

        return detailedResults
          .filter((el) => el.status === "fulfilled")
          .map((el) => el.value.data);
      } catch (error) {
        console.error(error);
      }
    }
  );

  return (
    <div className={styles.homePage}>
      {types && (
        <ul className={styles.typesList}>
          {types.map((el) => (
            <li
              className={
                type && parseInt(el.id) === parseInt(type.id)
                  ? styles.active
                  : ""
              }
              key={el.id}
              onClick={() => {
                setStart(0);
                setType(
                  type && parseInt(el.id) === parseInt(type.id) ? null : el
                );
              }}
            >
              {el.name}
            </li>
          ))}
        </ul>
      )}
      {!fetchingPokemons && pokemons.length === 0 && <NotFound />}
      {fetchingPokemons && (
        <div className={styles.loader}>
          <LoaderIcon />
          <p>Loading Pokemons...</p>
        </div>
      )}

      {pokemons && (
        <>
          <PokemonList pokemons={pokemons} />
          <Pagination
            start={start}
            setStart={setStart}
            nbResults={nbResults}
            limit={20}
          />
        </>
      )}
    </div>
  );
};

export default Home;
