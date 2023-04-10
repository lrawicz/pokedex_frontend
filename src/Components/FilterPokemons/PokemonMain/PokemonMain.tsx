//import './PokemonTypes.css';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
//import { Box } from '@mui/system';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export default function PokemonMain() {
 
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
    const  allEggGrups=["cosas","otras-cosas"]
  return (


    <Box sx={{ width: "50%" }}>
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
                id="combo-box-pokemon-type01"
                options={PokemonAllTypes}
                sx={{ width: 150 }}
                renderInput={(params) => <TextField {...params} label="Type" />}
                />
            </Grid>
          </Grid>
        <Grid container spacing={0.5} justifyContent="center">
            <Grid item >
            <h3>Egg Groups:</h3>
            </Grid  >

            <Grid item >

            <Autocomplete multiple
                id="trigger"
                options={allEggGrups}
                disableCloseOnSelect
                getOptionLabel={(option) => option}
                renderOption={(props, option, { selected }) => (
                    <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option}
                    </li>
                )}
                style={{ width: 300 }}
                renderInput={(params) => (
                    <TextField {...params} />
                )}
        />
          </Grid>
          </Grid>

    </Paper>
    </Box>

  );
}