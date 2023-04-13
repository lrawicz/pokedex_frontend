

import * as React from 'react';
import {Box,Paper} from '@mui/material';
import  { AutocompleteChangeDetails, AutocompleteChangeReason } from '@mui/material/Autocomplete';
//Icons
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
//Own:
import {TypeAbility} from '../../Interface'
import ComboBoxTags from '../../components/combo-box-tags/combo-box-tags'
import './abilities-tab.css';


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