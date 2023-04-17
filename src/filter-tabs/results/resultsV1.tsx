import * as React from 'react';
import './AccordionDemo.css';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { experimentalStyled as styled } from '@mui/material/styles';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

//Own:
import { getDataV1,Pokemon } from './classes';
function createData(
  hp: number,
  attack: number,
  defense: number,
  specialAttack: number,
  specialDefense: number,
  speed: number,
) {
  return { hp, attack, defense, specialAttack, specialDefense, speed };
}

const rows = [
  createData(200, 190, 180, 195, 185, 150),
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'left',
  display:"grid",
  color: theme.palette.text.secondary,
}));

type pokemonShow={id:number,name:string, type01:string}
type MyProps={
  //tabsArray: boolean[], 
  //value: number
}
type MyState ={
    data:Pokemon[] 
}
export default class ResultsV1 extends React.Component<MyProps, MyState> {
    constructor(props:MyProps){
        super(props)
        this.state= {
            data: getDataV1()
        }
        //this.state.data.
        /*useEffect(() => {
            ProductService.getProductsMini().then(data => setProducts(data));
        }, []);*/
    }

  render() { return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {
        this.state.data.map((_, index) => (
        <Paper elevation={3}  className="grid-container">
          <img className="poke_img"
            style={{display:"block", marginLeft:"0",marginRight:"auto"}} 
            src={this.state.data[index].sprite} alt={this.state.data[index].name}/>
          <div className="poke_name">{this.state.data[index].id} - {this.state.data[index].name}</div>  
          <div className="poke_abilty">Ability</div>
          <div className="poke_type">Type - Type</div>

          <div className="poke_stats">

          <TableContainer component={Paper}>
            <Table  aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">HP</TableCell>
                  <TableCell align="right">Atk</TableCell>
                  <TableCell align="right">Def</TableCell>
                  <TableCell align="right">SpA</TableCell>
                  <TableCell align="right">SpD</TableCell>
                  <TableCell align="right">Spe</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{row.hp}</TableCell>
                    <TableCell align="right">{row.attack}</TableCell>
                    <TableCell align="right">{row.defense}</TableCell>
                    <TableCell align="right">{row.specialAttack}</TableCell>
                    <TableCell align="right">{row.specialDefense}</TableCell>
                    <TableCell align="right">{row.speed}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>


          </div>
        </Paper>
      ))}
    </Grid>
  )} 

}
