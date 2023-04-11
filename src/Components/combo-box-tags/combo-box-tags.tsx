import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason } from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type MyProps={
    sendToParent:any,
    items:string[],
    value:string[],
    name: string,
    label: string,
    moveIndex?:number
  }
type MyState ={
    items:string[],
    value:string[],
    name: string,
    label: string,
    moveIndex?:number| undefined

}
export default class ComboBoxTags extends React.Component<MyProps, MyState> {
    constructor(props:MyProps){
        super(props)
        let temp_moveIndex = typeof(this.props.moveIndex)== "number"?  this.props.moveIndex:undefined
        this.state = {
            items:this.props.items,
            value:this.props.value,
            name: this.props.name,
            label: this.props.label,
            moveIndex: temp_moveIndex
        }
    }
    OnChange=(event: React.SyntheticEvent<Element,Event>, tmp_value: string[], reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails)=>{
        this.setState({
            value: tmp_value
        })
        this.props.sendToParent(this.state.name, tmp_value, this.state.moveIndex)
    }

    render() {

        return (
            <Box sx={{ minWidth: 120 }}>
            <Grid container justifyContent="center">
                <Grid item xs={2}><h3>{this.state.label}:</h3></Grid>
                <Grid item xs={5}>
                    <Autocomplete
                    multiple
                    id={this.state.name}
                    onChange={this.OnChange}
                    options={this.state.items}
                    value={this.state.value}
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
                    renderInput={(params) => (
                        <TextField {...params} />
                    )}
                    />

                </Grid>
                </Grid>
            </Box>
        )
    }
}
