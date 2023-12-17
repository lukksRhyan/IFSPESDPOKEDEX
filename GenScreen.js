import React, { useState, useEffect } from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import PokeCard from './PokeCard';

// Componente principal GenScreen
function GenScreen({ route }) {
  // Estados para gerenciar dados do Pokémon selecionado
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedPokemonData, setSelectedPokemonData] = useState(null);

  // Estado para armazenar a lista de Pokémon
  const [pokemonList, setPokemonList] = useState([]);

  // Obtém a geração do parâmetro de rota ou define como 'I' por padrão
  const { generation } = route.params ?? { generation: 'I' };

  // Função para buscar dados do Pokémon
  const fetchData = async (pokemon) => {
    try {
      // Requisições para diferentes endpoints da API
      const pokeGameInfo = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon_species.name}`
      );
      const pokeSpeciesInfo = await axios.get(pokemon.pokemon_species.url);
      const pokeEvolChain = await axios.get(
        pokeSpeciesInfo.data.evolution_chain.url
      );
      const cardsInfo = await axios.get(
        `https://api.pokemontcg.io/v2/cards?q=name:${pokemon.pokemon_species.name}`
      );

      // Mapeia as imagens dos cards
      const cardImages = cardsInfo.data.data.map((item) => item.images.large);

      // Lógica para obter informações de evolução
      let preEvol = pokeSpeciesInfo.data.evolves_from_species
        ? pokeSpeciesInfo.data.evolves_from_species
        : null;
      let currentSpecies = pokeEvolChain.data.chain;

      while (currentSpecies.species.name !== pokemon.pokemon_species.name) {
        currentSpecies = currentSpecies.evolves_to[0];
      }

      let evolution = currentSpecies.evolves_to[0]
        ? currentSpecies.evolves_to[0].species
        : null;

      // Define os dados do Pokémon selecionado
      setSelectedPokemonData({
        ingameData: pokeGameInfo.data,
        verseData: pokeSpeciesInfo.data,
        pre_evolution: preEvol,
        evolution: evolution,
        cards: cardImages,
      });
    } catch (error) {
      console.error('Erro na requisição de espécies', error);
    }
  };

  // Reseta o Pokémon selecionado
  const resetSelectedPokemon = () => {
    setSelectedPokemon(null);
    setSelectedPokemonData(null);
  };

  // Efeito para buscar a lista de Pokémon ao montar o componente
  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        // Requisição para obter a lista de Pokémon da geração atual
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokedex/${GenNumber(generation)}`
        );
        setPokemonList(response.data.pokemon_entries);
      } catch (error) {
        console.error('Erro na requisição', error);
      }
    };

    // Chama a função de busca ao montar o componente ou quando a geração muda
    fetchPokemonList();
  }, [generation]);

  // Renderização do componente
  return (
    <View style={{ height: '100%', backgroundColor: 'cyan' }}>
      {selectedPokemon &&
      selectedPokemonData &&
      selectedPokemonData.verseData &&
      selectedPokemonData.ingameData &&
      selectedPokemonData.cards ? (
        // Se um Pokémon estiver selecionado, renderiza os detalhes do Pokémon
        <View
          style={{
            width: '100%',
            flexDirection: 'column',
            backgroundColor: '#30a7d7',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          {/* Cabeçalho com botões */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              paddingHorizontal: 20,
            }}>
            <TouchableOpacity
              style={{ justifyContent: 'center', width: '100' }}>
              <Text style={{ fontSize: 24, fontWeight: 400, color: 'yellow' }}>
                ☆
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ justifyContent: 'center', width: '10%', height: '100%' }}
              onPress={resetSelectedPokemon}>
              <Text style={{ fontSize: 36, color: 'red' }}>x</Text>
            </TouchableOpacity>
          </View>

          {/* (Pré)Evolução */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 50,
              width: '100%',
            }}>
            {/* Pré-evolução */}
            {selectedPokemon &&
            selectedPokemonData &&
            selectedPokemonData.pre_evolution ? (
              <View>
                <Text
                  style={{
                    height: '100%',
                    fontSize: 15,
                    backgroundColor: 'grey',
                    fontWeight: 900,
                    borderRadius: 5,
                    padding: 5,
                  }}>
                  {selectedPokemon &&
                    selectedPokemonData &&
                    selectedPokemonData.pre_evolution &&
                    selectedPokemonData.pre_evolution.name.toUpperCase()}
                </Text>
              </View>
            ) : (
              <View style={{ width: '33%', height: '100%' }}></View>
            )}

            {/* Evolução */}
            {selectedPokemon &&
            selectedPokemonData &&
            selectedPokemonData.evolution ? (
              <View>
                <Text
                  style={{
                    height: '100%',
                    fontSize: 15,
                    backgroundColor: 'grey',
                    fontWeight: 900,
                    borderRadius: 5,
                    padding: 5,
                  }}>
                  {selectedPokemon &&
                    selectedPokemonData &&
                    selectedPokemonData.evolution &&
                    selectedPokemonData.evolution.name.toUpperCase()}
                </Text>
              </View>
            ) : (
              <View style={{ width: '33%' }}></View>
            )}
          </View>

          {/* Nome do Pokémon */}
          <Text
            style={{
              fontSize: 24,
              backgroundColor: 'white',
              padding: 6,
              borderRadius: 6,
            }}>
            {selectedPokemonData &&
              selectedPokemonData.verseData &&
              selectedPokemonData.verseData.name.toUpperCase()}
          </Text>

          {/* Imagem do Pokémon */}
          <ImageBackground
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                selectedPokemonData &&
                selectedPokemonData.verseData &&
                selectedPokemonData.verseData.id
              }.png`,
            }}
            style={{
              backgroundColor: 'white',
              height: 250,
              width: 250,
              borderRadius: 1000,
              marginTop: 25,
            }}
          />

          {/* Tipos do Pokémon */}
          <View
            style={{
              flexDirection: 'row',
              height: 50,
              width: '100%',
              justifyContent: 'space-around',
            }}>
            {selectedPokemonData?.ingameData?.types.map((type, index) => (
              <View
                key={index}
                style={{
                  paddingHorizontal: 10,
                  backgroundColor: typeColors[type.type.name],
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 9,
                  height: '100%',
                }}>
                <Text style={{ fontSize: 20, fontWeight: 900, color: 'white' }}>
                  {type.type.name.toUpperCase()}
                </Text>
              </View>
            ))}
          </View>

          {/* Descrição do Pokémon */}
          <View
            style={{
              width: '80%',
              alignItems: 'center',
              height: 200,
              backgroundColor: '#999999',
              marginTop: 10,
              borderRadius: 25,
            }}>
            <View
              style={{
                alignItems: 'flex-start',
                height: '15%',
                width: '100%',
                backgroundColor: '#555555',
              }}>
              <Text style={{ fontSize: 20, fontWeight: 900 }}>Descrição</Text>
            </View>
            <Text style={{ padding: 10, fontSize: 16, width: '90%' }}>
              {selectedPokemonData &&
                selectedPokemonData.verseData &&
                selectedPokemonData.verseData.flavor_text_entries[0]
                  .flavor_text}
            </Text>
          </View>

          {/* Lista de Cards do Pokémon */}
          <FlatList
            data={selectedPokemonData && selectedPokemonData.cards}
            style={{ height: '100%', width: '100%' }}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={{ margin: 5 }}>
                <ImageBackground
                  source={{ uri: item }}
                  style={{
                    width: 240,
                    height: 340,
                    borderRadius: 10,
                    overflow: 'hidden',
                  }}>
                  {/* Conteúdo adicional dentro do ImageBackground, se necessário */}
                </ImageBackground>
              </View>
            )}
          />
        </View>
      ) : (
        // Se nenhum Pokémon estiver selecionado, renderiza a lista de Pokémon
        <FlatList
          data={pokemonList}
          numColumns={3}
          style={{ alignItems: 'center', backgroundColor: '#30a7d7' }}
          keyExtractor={(item) => item.entry_number.toString()}
          renderItem={({ item }) => (
            <View>
              {/* Componente PokeCard para representar cada Pokémon na lista */}
              <PokeCard
                Pokemon={item}
                onPress={() => {
                  setSelectedPokemon(item);
                  fetchData(item);
                }}
              />
            </View>
          )}
        />
      )}
    </View>
  );
}

// Função utilitária para obter o número correspondente à geração em romano
function GenNumber(roman) {
  const romans = {
    I: 'kanto',
    II: 'original-johto',
    III: 'hoenn',
    IV: 'original-sinnoh',
    V: 'original-unova',
    VI: 'kalos-central',
    VII: 'original-alola',
    VIII: 'galar',
    IX: 'paldea',
  };

  return romans[roman];
}

// Cores correspondentes aos tipos de Pokémon
const typeColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

// Exporta o componente GenScreen como padrão
export default GenScreen;
