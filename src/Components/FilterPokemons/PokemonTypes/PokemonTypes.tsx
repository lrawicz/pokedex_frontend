import './PokemonTypes.css';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
//import { Box } from '@mui/system';

export default function PokemonTypes() {
 
    const PokemonAllTypes =[
        {label:"Water"},
        {label:"Fire"},
        {label:"Ground"},
        {label:"Grass"},
        {label:"Electric"},
        {label:"Ghost"},
        {label:"Dragon"},
        {label:"Steel"}
    ]
  return (


    <Box sx={{ width: "100%" }}>
    <Paper elevation={3} >

          <Grid container spacing={0.5} justifyContent="center">
            <h3>Types:</h3>
            <Grid item >
                <Autocomplete disablePortal
                id="combo-box-pokemon-type01"
                options={PokemonAllTypes}
                sx={{ width: 150 }}
                renderInput={(params) => <TextField {...params} label="Type" />}
                />
            </Grid>

            <Grid item >
                <Autocomplete disablePortal
                id="combo-box-pokemon-type02"
                options={PokemonAllTypes}
                sx={{ width: 150 }}
                renderInput={(params) => <TextField {...params} label="Type" />}
                />
            </Grid>
          </Grid>
          <Grid container spacing={0.5} justifyContent="center">
            <h3>Egg Groups:</h3>
            <Grid item >
                <Autocomplete disablePortal
                id="combo-box-pokemon-eggGroups"
                options={PokemonAllTypes}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Type" />}
                />
            </Grid>
          </Grid>
    </Paper>
    </Box>

  );
}
