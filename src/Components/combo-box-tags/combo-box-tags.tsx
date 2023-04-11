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
    selected:string[],
    name: string,
    label: string

  }
type MyState ={
    items:string[],
    selected:string[],
    name: string,
    label: string
}
export default class ComboBoxTags extends React.Component<MyProps, MyState> {
    constructor(props:MyProps){
        super(props)
        this.state = {
            items:this.props.items,
            selected:this.props.selected,
            name: this.props.name,
            label: this.props.label
        }
    }
    OnChange=(event: React.SyntheticEvent<Element,Event>, value: string[], reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails)=>{
        console.log(event)
        this.setState({
            selected: value
        })
        this.props.sendToParent(this.state.name,this.state.selected)
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
                    defaultValue={this.state.selected}
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
