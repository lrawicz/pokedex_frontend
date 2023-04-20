import * as React from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import {Grid, Box, Chip, Dialog} from '@mui/material';
import Typography from '@mui/material/Typography';

type MyProps={
    open:boolean,
    ability:any
}
type MyState ={
    open:boolean
    ability:any
}
export default class AbilityResponse extends React.Component<MyProps, MyState> {
    constructor(props:MyProps){
        super(props)
        this.state ={
            open: props.open,
            ability: props.ability
        }
    }
    componentDidUpdate(prevProps: MyProps) {
        if (prevProps.ability !== this.props.ability) {
          this.setState({ ability: this.props.ability });
        }
      }
    pokemonList(pokemonList:{ID:number,name:string}[]){
      
      return pokemonList.map((pokemon)=>(
        <Grid item xs={2} >
          <img width={"80em"} 
          onClick={()=>{navigator.clipboard.writeText(pokemon.name)}}
          src={"http://localhost:8000/png/pokemon?ID=" + pokemon.ID} 
          />
          <Box textAlign="center">
            {pokemon.name}
          </Box>
        </Grid >  

    ))
    }
    render() { return (
      <Grid item xs={3}>
          <Box textAlign="center">
              <Chip style={{ fontSize: '20px' }} color="primary" label={this.state.ability.name}
                  onClick={()=>{this.setState({open: true})}}
                  />
              <Dialog onClose={()=>{this.setState({open:false})}} open={this.state.open}>
                  <DialogTitle textAlign={"center"}>
                    <h3>
                    {this.state.ability.name}
                    </h3>
                    </DialogTitle>
                    <DialogContent >
                    <Typography textAlign={"center"}>
                      {this.state.ability.flavor_text} 
                    </Typography>

                      <Grid  container   alignItems="center" justifyContent="space-around" rowSpacing={2} >
                      {this.pokemonList(this.state.ability.pokemons)}
                    </Grid>
                    </DialogContent>
          </Dialog>
        </Box >
      </Grid>
    );
  }
}