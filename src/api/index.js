import axios from "axios";
import { TTP_API_URL } from "../utils/consts";

export const fetchTypes = () => {
  const requestUrl = `${TTP_API_URL}/type`;

  return axios.get(requestUrl, {
    params: {},
  });
};

export const fetchPokemons = ({ id, start = 0 }) => {
  const requestUrl = id
    ? `${TTP_API_URL}/pokemon/${id}`
    : `${TTP_API_URL}/pokemon`;
  let params = {
    offset: start,
    limit: 20,
  };
  return axios.get(requestUrl, { params });
};

export const fetchSingleType = ({ id }) => {
  const requestUrl = `${TTP_API_URL}/type/${id}`;

  return axios.get(requestUrl, {
    params: {},
  });
};

export const fetchSpecies = ({ id }) => {
  const requestUrl = `${TTP_API_URL}/pokemon-species/${id}`;

  return axios.get(requestUrl, {
    params: {},
  });
};
export const fetchEvolutions = ({ id }) => {
  const requestUrl = `${TTP_API_URL}/evolution-chain/${id}`;

  return axios.get(requestUrl, {
    params: {},
  });
};
