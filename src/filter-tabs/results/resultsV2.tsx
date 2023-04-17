import * as React from 'react';
import { Pokemon, getData } from './classes';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { ClassFilter } from '../classes';

type RowProps={
    //tabsArray: boolean[], 
    //value: number
    pokemon:Pokemon

  }
  type RowState ={
      pokemon:Pokemon
      open:boolean
  }
class Row extends React.Component<RowProps, RowState>{
    constructor(props:RowProps){
        super(props)
        this.state ={
            pokemon: props.pokemon,
            open:false
        }
    }
    render() { return (
    <React.Fragment> 
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {this.setState({open:!this.state.open})}}
          >
            {this.state.open? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            <img src={this.state.pokemon.sprite}></img>
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
            <h3>{this.state.pokemon.name}</h3>
            </TableCell>
        <TableCell >{this.state.pokemon.types[0]}</TableCell>
        <TableCell >{this.state.pokemon.ability}</TableCell>
        <TableCell >{this.state.pokemon.stats.hp}</TableCell>
        <TableCell >{this.state.pokemon.stats.attack}</TableCell>
        <TableCell >{this.state.pokemon.stats.defense}</TableCell>
        <TableCell >{this.state.pokemon.stats.specialAttack}</TableCell>
        <TableCell >{this.state.pokemon.stats.specialDefense}</TableCell>
        <TableCell >{this.state.pokemon.stats.speed}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Moves
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell> <h3>name</h3> </TableCell>
                    <TableCell> <h3>power</h3> </TableCell>
                    <TableCell> <h3>type</h3> </TableCell>
                    <TableCell> <h3>category</h3> </TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.pokemon.moves.map((move) => (
                    <TableRow key={move.name}>
                      <TableCell component="th" scope="row">{move.name}</TableCell>
                      <TableCell>{move.power}</TableCell>
                      <TableCell>{move.type}</TableCell>
                      <TableCell>{move.category}</TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

    </React.Fragment>

    
    )}
    }
  type ResultProps={
    //tabsArray: boolean[], 
    //value: number
    filter:ClassFilter

  }
  type ResultState ={
      data:Pokemon[],
      filter:ClassFilter
  }
  export default class ResultsV2 extends React.Component<ResultProps, ResultState> {
      constructor(props:ResultProps){
          super(props)
          this.state= {
            data: [],
            filter: props.filter

          }
          //this.state.data.
          /*useEffect(() => {
              ProductService.getProductsMini().then(data => setProducts(data));
          }, []);*/
      }
      componentDidMount() {
        let send_data:{[key: string]: any} = {}
        for (let clave in this.state.filter.general) {
            if (this.state.filter.general[clave as keyof typeof this.state.filter.general].value.length > 0){
                send_data[clave] = this.state.filter.general[clave as keyof typeof this.state.filter.general]
            }
        }
        send_data["stats"]= {}
        for (let clave in this.state.filter.stats) {
            if (this.state.filter.stats[clave as keyof typeof this.state.filter.stats].value.length > 0){
                send_data.stats[clave] = this.state.filter.stats[clave as keyof typeof this.state.filter.stats]
            }
        }
        send_data["ability"]= {}
        for (let clave in this.state.filter.ability) {
            if (this.state.filter.ability[clave as keyof typeof this.state.filter.ability].value.length > 0){
                send_data.ability[clave] = this.state.filter.ability[clave as keyof typeof this.state.filter.ability]
            }
        }

        fetch("http://localhost:8000/test")
            .then(response => {return response.json()})
            .then(data => {
                this.setState({data:data}) })
        fetch("http://localhost:8000/searchPokemons",{
                headers: {"Content-Type": "application/json"},   
                method: "POST",
                body: JSON.stringify(send_data)
            })
            .then(response => {return response.json()})
            .then(data => {
                this.setState({data:data}) 
            })
        }
    render() { return (
        <Paper  sx={{ width: '100%', overflow: 'hidden' }}>

                <TableContainer >
                <Table  size="small" aria-label="collapsible table">
                    <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Ability</TableCell>
                        <TableCell>HP</TableCell>
                        <TableCell>Atk</TableCell>
                        <TableCell>Def</TableCell>
                        <TableCell>SpA</TableCell>
                        <TableCell>SpD</TableCell>
                        <TableCell>Spe</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.data.map((pokemon) => (
                        <Row pokemon={pokemon}  />
                    ))}
                    
                    </TableBody>
                </Table>
                </TableContainer>
              </Paper>
      );
    }
    }

/*
    {this.state.data.map((row) => (
        <TableRow
        key={row.name}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
        <TableCell align="left">
        <img src={row.sprite} alt="" />{row.name}
        </TableCell>
        <TableCell align="left">{row.types[0]}</TableCell>
        </TableRow>
    ))}*/