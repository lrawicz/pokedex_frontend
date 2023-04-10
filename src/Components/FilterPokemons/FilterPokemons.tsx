import './FilterPokemons.css';

import Box from '@mui/material/Box';
import Stats from '../filter-tabs/stats-tab/stats-tab'
import PokemonTypes from './PokemonMain/PokemonMain'


function valuetext(value: number) {
  return `${value}-test`;
}

const minDistance = 5;

export default function FilterPokemons() {

  return (
    <Box className="asd" justifyContent="center">
      <PokemonTypes/>
    </Box>
  );
}