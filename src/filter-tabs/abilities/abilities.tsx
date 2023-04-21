

import * as React from 'react';
import {Box,Grid,Paper} from '@mui/material';
import  { AutocompleteChangeDetails, AutocompleteChangeReason } from '@mui/material/Autocomplete';
import Fab from '@mui/material/Fab';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

//Icons
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SearchIcon from '@mui/icons-material/Search';
//Own:
import { ClassAbility} from './classes'
import ComboBoxTags from '../../components/combo-box-tags/combo-box-tags'
import './abilities.css';
import AbilityResponse from './ability-response';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
interface Dictionary{
  [clave: string]: any
}
type MyProps={
    abilityFilter:ClassAbility
    sendToParent:any,
}
type MyState ={
  abilityOptions:{trigger:string[],target:string[],effect:string[], names:string[]}
  abilityFilter:ClassAbility
  abilityResult:Dictionary[];
  openDialog:string
}
export default class AbilitiesTab extends React.Component<MyProps, MyState> {
  constructor(props:MyProps){
    super(props)
    this.state={
      abilityOptions: {trigger:[],target:[],effect:[],names:[]},
      abilityFilter: this.props.abilityFilter,
      abilityResult: [],
      openDialog:""
    }
    this.abilityOnChange = this.abilityOnChange.bind(this);
    this.getData = this.getData.bind(this);
  }

  async componentDidMount() {

      await fetch("http://localhost:8000/abilityOptions")
      .then(response => {return response.json()})
      .then(data => {
        this.setState({abilityOptions: data})
        })
    
    }

  searchAbilities(): void{
    let send_data:any = {}
    for (let clave in this.state.abilityFilter) {
        if (this.state.abilityFilter[clave as keyof typeof this.state.abilityFilter].value.length > 0){
            send_data[clave] = this.state.abilityFilter[clave as keyof typeof this.state.abilityFilter]
        }
    }
    let url = "http://localhost:8000/searchAbilities"
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(send_data)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        this.setState({abilityResult: data})
      })
    .catch(error => console.error(error));


  }
  //event: React.SyntheticEvent<Element,Event>, value: string[], reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails
  abilityOnChange(
    event: React.SyntheticEvent<Element,Event>, value: string[], reason: AutocompleteChangeReason, ID: ("trigger" | "effect" | "target"), details?: AutocompleteChangeDetails)
    {
      let temp_ability:ClassAbility
      temp_ability = this.state.abilityFilter
      temp_ability[ID].value = value
      this.setState({abilityFilter:temp_ability})
      this.props.sendToParent(this.state.abilityFilter)
  }
  getData(key:string,data:{value:string[],operator:("OneOf"|"ContainsAll")}){
    let tmp_abilityFilter = this.state.abilityFilter
    tmp_abilityFilter[key as keyof typeof this.state.abilityFilter] = data
    this.setState({
      abilityFilter:tmp_abilityFilter
    })
  }
  results(){
    return this.state.abilityResult.map((item, index) => (
          <AbilityResponse open={false} ability={item}/>
    ));
  }
  render() { return (
    <Box sx={{ width: "100%" }}>
      <Paper elevation={3} >

        <Stack direction="column" spacing={2}>
          <ComboBoxTags   label='Names' name='name'
            items={this.state.abilityOptions.names}
            data={this.state.abilityFilter.name}
            sendToParent={this.getData}/>
            
           <Divider />

          <ComboBoxTags   label='Trigger' name='trigger'
            items={this.state.abilityOptions.trigger}
            data={this.state.abilityFilter.trigger}
            sendToParent={this.getData}/>

          <ComboBoxTags   label='Target' name='target'
            items={this.state.abilityOptions.target}
            data={this.state.abilityFilter.target}
            sendToParent={this.getData}/>


          <ComboBoxTags   label='Effect' name='effect'
            items={this.state.abilityOptions.effect}
            data={this.state.abilityFilter.effect}
            sendToParent={this.getData}/>
            
            <Divider />

          <div onClick={()=>{this.searchAbilities()}} style={{ display: 'flex', justifyContent: 'center' }}>
            <Fab  disabled aria-label="add">
              <SearchIcon    color="primary" />
            </Fab>
          </div>

      <div onClick={()=>{console.log("hola")}} style={{ display: 'flex', justifyContent: 'center' }}>
        <Grid  container   alignItems="center" justifyContent="center" rowSpacing={1} >
          {this.results()}
        </Grid>
        </div>
        </Stack>
      </Paper>
    </Box>

)}
//<Stack direction="row" spacing={1}>
//</Stack>

}