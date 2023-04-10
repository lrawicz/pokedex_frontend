
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
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type MyProps={
    ability:TypeAbility
    sendToParent:any,
}
type MyState ={
  ability:TypeAbility
}
export default class AbilitiesTab extends React.Component<MyProps, MyState> {
  constructor(props:MyProps){
    super(props)
    this.state={
      ability: this.props.ability
    }
    this.abilityOnChange = this.abilityOnChange.bind(this);
  }
  //event: React.SyntheticEvent<Element,Event>, value: string[], reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails
  abilityOnChange(
    event: React.SyntheticEvent<Element,Event>, value: string[], reason: AutocompleteChangeReason, ID:string, details?: AutocompleteChangeDetails)
    {
      console.log("value:")
      console.log(value)
      console.log("ID:" + ID)
  }
  render() { return (
    <Box sx={{ width: "100%" }}>
      <Paper elevation={3} >
      <Grid container justifyContent="center">
            <Grid item xs={2}><h3>Trigger:</h3></Grid>
        <Autocomplete
          multiple
          id="trigger"
          onChange={(event: React.SyntheticEvent<Element,Event>, value: string[], reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails) => this.abilityOnChange(event,value,reason,"trigger",details,)}
          options={this.state.ability.trigger}
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
          style={{ width: 500 }}
          renderInput={(params) => (
            <TextField {...params} />
          )}
        />
      </Grid>
      <Grid container justifyContent="center">
      <Grid item xs={2}><h3>Target:</h3></Grid>

        <Autocomplete 
          multiple
          id="target"
          options={this.state.ability.target}
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
          style={{ width: 500 }}
          renderInput={(params) => (
            <TextField {...params} />
          )}
        />
      </Grid>
      <Grid container justifyContent="center">
      <Grid item xs={2}><h3>Effect:</h3></Grid>

        <Autocomplete 
          multiple
          id="effect"
          options={this.state.ability.effect}
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
          style={{ width: 500 }}
          renderInput={(params) => (
            <TextField {...params} />
          )}
        />
      </Grid>

      </Paper>
    </Box>
  )}

}