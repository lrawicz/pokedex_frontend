
import './abilities-tab.css';

import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason } from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {TypeAbility} from '../../../Interface'
import ComboBoxTags from '../../combo-box-tags/combo-box-tags'
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type MyProps={
    abilityOptions:TypeAbility
    abilitySelected:TypeAbility

    sendToParent:any,
}
type MyState ={
  abilityOptions:TypeAbility
  abilitySelected:TypeAbility
}
export default class AbilitiesTab extends React.Component<MyProps, MyState> {
  constructor(props:MyProps){
    super(props)
    this.state={
      abilityOptions: this.props.abilityOptions,
      abilitySelected: this.props.abilitySelected,
    }
    this.abilityOnChange = this.abilityOnChange.bind(this);
    this.getData = this.getData.bind(this);
  }
  //event: React.SyntheticEvent<Element,Event>, value: string[], reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails
  abilityOnChange(
    event: React.SyntheticEvent<Element,Event>, value: string[], reason: AutocompleteChangeReason, ID: ("trigger" | "effect" | "target"), details?: AutocompleteChangeDetails)
    {
      let temp_ability:TypeAbility
      temp_ability = this.state.abilitySelected
      temp_ability[ID] = value
      this.setState({abilitySelected:temp_ability})
      this.props.sendToParent(this.state.abilitySelected)
  }
  getData(key:string,data:string[]){
    let tmp_abilitySelected = this.state.abilitySelected
    tmp_abilitySelected[key as keyof typeof this.state.abilitySelected] = data
    this.setState({
      abilitySelected:tmp_abilitySelected
    })
  }
  render() { return (
    <Box sx={{ width: "100%" }}>
      <Paper elevation={3} >


      <ComboBoxTags   label='Trigger' name='trigger'
        items={this.state.abilityOptions.trigger}
        value={this.state.abilitySelected.trigger}
        sendToParent={this.getData}/>

      <ComboBoxTags   label='Target' name='target'
        items={this.state.abilityOptions.target}
        value={this.state.abilitySelected.target}
        sendToParent={this.getData}/>


      <ComboBoxTags   label='Effect' name='effect'
        items={this.state.abilityOptions.effect}
        value={this.state.abilitySelected.effect}
        sendToParent={this.getData}/>
      </Paper>
    </Box>
  )}

}