

import * as React from 'react';
import {Box,Paper} from '@mui/material';
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
import './abilities-tab.css';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
type MyProps={
    abilitySelected:ClassAbility

    sendToParent:any,
}
type MyState ={
  abilityOptions:{trigger:string[],target:string[],effect:string[], names:string[]}
  abilitySelected:ClassAbility
  abilityResult:string[]
}
export default class AbilitiesTab extends React.Component<MyProps, MyState> {
  constructor(props:MyProps){
    super(props)
    this.state={
      abilityOptions: {trigger:[],target:[],effect:[],names:[]},
      abilitySelected: this.props.abilitySelected,
      abilityResult: ["simple","intimidate"]
    }
    this.abilityOnChange = this.abilityOnChange.bind(this);
    this.getData = this.getData.bind(this);
  }
  componentDidMount(): void {
    let cat_ability:string[] = ["trigger","target","effect"]
    cat_ability.forEach(abilityCategory => {
      fetch("http://localhost:8000/abilityKeys?category=" + abilityCategory)
      .then(response => {return response.json()})
      .then(data => {
        this.setState({abilityOptions: {...this.state.abilityOptions,[abilityCategory]:data}})
          })
      })

      fetch("http://localhost:8000/abilityNames")
      .then(response => {return response.json()})
      .then(data => {
        this.setState({abilityOptions: 
          {...this.state.abilityOptions,names:data}})
        })
    
    }

  
  //event: React.SyntheticEvent<Element,Event>, value: string[], reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails
  abilityOnChange(
    event: React.SyntheticEvent<Element,Event>, value: string[], reason: AutocompleteChangeReason, ID: ("trigger" | "effect" | "target"), details?: AutocompleteChangeDetails)
    {
      let temp_ability:ClassAbility
      temp_ability = this.state.abilitySelected
      temp_ability[ID].value = value
      this.setState({abilitySelected:temp_ability})
      this.props.sendToParent(this.state.abilitySelected)
  }
  getData(key:string,data:{value:string[],operator:("OneOf"|"ContainsAll")}){
    let tmp_abilitySelected = this.state.abilitySelected
    tmp_abilitySelected[key as keyof typeof this.state.abilitySelected] = data
    this.setState({
      abilitySelected:tmp_abilitySelected
    })
  }
  results(){
    return this.state.abilityResult.map((item, index) => (
      <Chip label={item} variant="outlined" />
    ));
  }
  render() { return (
    <Box sx={{ width: "100%" }}>
      <Paper elevation={3} >

        <Stack direction="column" spacing={2}>
          <ComboBoxTags   label='Names' name='names'
            items={this.state.abilityOptions.names}
            data={this.state.abilitySelected.names}
            sendToParent={this.getData}/>
            
           <Divider />

          <ComboBoxTags   label='Trigger' name='trigger'
            items={this.state.abilityOptions.trigger}
            data={this.state.abilitySelected.trigger}
            sendToParent={this.getData}/>

          <ComboBoxTags   label='Target' name='target'
            items={this.state.abilityOptions.target}
            data={this.state.abilitySelected.target}
            sendToParent={this.getData}/>


          <ComboBoxTags   label='Effect' name='effect'
            items={this.state.abilityOptions.effect}
            data={this.state.abilitySelected.effect}
            sendToParent={this.getData}/>
            
            <Divider />

          <div onClick={()=>{console.log("hola")}} style={{ display: 'flex', justifyContent: 'center' }}>
            <Fab  disabled aria-label="add">
              <SearchIcon    color="primary" />
            </Fab>
          </div>

      <div onClick={()=>{console.log("hola")}} style={{ display: 'flex', justifyContent: 'center' }}>
      <Stack direction="row" spacing={1}>
        {this.results()}
        </Stack>
      </div>
      </Stack>
      </Paper>
    </Box>

  )}

}