import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { TouchableOpacity, View, ImageBackground, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {pokemonData, pokemonSpecies} from './PokemonRequest';

export default function PokeCard({ Pokemon, onPress}){

  const[pokemonImgUrl, setPokemonImgUrl] = useState(null);
  const [pokemonId, setPokemonId] = useState(null);
  useEffect( ()=>{
    const fetchPokemonImgUrl = async () =>{
      try{
        const imgResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${Pokemon.pokemon_species.name}`);
        setPokemonImgUrl(imgResponse.data.sprites.front_default);
        const idResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${Pokemon.pokemon_species.name}`);
        setPokemonId(idResponse.data.pokedex_numbers[0].entry_number.toString());
    }
      catch(erro){
        return null;
      }

      };
      fetchPokemonImgUrl();
  }, [Pokemon.entry_number])

  return(
    <TouchableOpacity
      onPress={onPress}
      >
      <View
      style={{
        width:100,
        height:100,
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'#fafafa',
        margin:5,
        fontSize:10,
        borderRadius:15
      }}
      >
      <ImageBackground
      style={{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50,
      }}
      source={{ uri:  pokemonImgUrl }}
      resizeMode='strech'
      >
      </ImageBackground>
      <View style={{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop:'-25%'
        }}>
        <Text>
        #{pokemonId}
        </Text>
        <Text
          style={{
            fontSize:10,
          }}
        > {Pokemon.pokemon_species.name.toUpperCase()}</Text>
      </View>
      </View>
    </TouchableOpacity>
  )
}