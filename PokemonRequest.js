import  axios from 'axios';


export async function pokemonData({pkmnName}){
  return await axios.get(`https://pokeapi.co/api/v2/pokemon/${pkmnName}`);
  }
export async function pokemonSpecies({pkmnName}){
  return await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pkmnName}`);
}
