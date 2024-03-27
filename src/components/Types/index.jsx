import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";

import styles from "./Types.module.scss";
import { fetchPokemons, fetchSingleType } from "../../api";
import LoaderIcon from "../icons/LoaderIcon";
import NotFound from "../icons/NotFoundIcon";
import PokemonList from "../common/PokemonList";
import Pagination from "../common/Pagination";

const Types = () => {
  const { typeID } = useParams();
  const [start, setStart] = useState(0);
  const [nbResults, setNbResults] = useState(0);
  const navigate = useNavigate();

  if (!typeID) {
    navigate("/");
  }

  let { data, isFetching } = useQuery(
    ["getPokemonsByType", start, typeID],
    async () => {
      if (typeID) {
        try {
          const res = await fetchSingleType({ id: parseInt(typeID) });

          setNbResults(res.data.pokemon.length);

          const ids = res.data.pokemon
            .map((el) =>
              parseInt(el.pokemon.url.split("/pokemon/")[1].split("/")[0])
            )
            .slice(start, start + 20);

          const detailedResults = await Promise.allSettled(
            ids.map((id) => {
              return fetchPokemons({ id });
            })
          );

          return {
            pokemons: detailedResults
              .filter((el) => el.status === "fulfilled")
              .map((el) => el.value.data),
            type: res.data.name,
          };
        } catch (error) {
          console.error(error);
        }
      }
    }
  );

  if (isFetching) {
    return (
      <div className={styles.loader}>
        <LoaderIcon />
        <p>Loading Pokemons...</p>
      </div>
    );
  }

  if (!isFetching && !data) {
    return <NotFound />;
  }

  return (
    <div className={styles.typesPage}>
      <div
        className={styles.page_title}
      >{`Pokemons of type "${data.type}"`}</div>
      <PokemonList pokemons={data.pokemons} />
      <Pagination
        limit={20}
        start={start}
        setStart={setStart}
        nbResults={nbResults}
      />
    </div>
  );
};

export default Types;
