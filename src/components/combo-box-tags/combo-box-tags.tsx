import * as React from 'react';

import {Box, Grid, Checkbox, TextField } from '@mui/material';
import Autocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason } from '@mui/material/Autocomplete';
import {ToggleButton, ToggleButtonGroup} from '@mui/material';

//Icons
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type MyProps={
    sendToParent:any,
    items:string[],
    name: string,
    label: string,
    data:{value:string[],operator:"or" | "and"},
    switchableOperator?:boolean,
    moveIndex?:number,
  }
type MyState ={
    items:string[],
    name: string,
    label: string,
    data:{value:string[],operator:"or" | "and"},
    moveIndex?:number| undefined,
    switchableOperator?:boolean,

}
export default class ComboBoxTags extends React.Component<MyProps, MyState> {
    constructor(props:MyProps){
        super(props)
        let temp_moveIndex = typeof(this.props.moveIndex)== "number"?  this.props.moveIndex:undefined
        this.state = {
            data: this.props.data,
            items: this.props.items,
            name: this.props.name,
            label: this.props.label,
            moveIndex: temp_moveIndex,
            switchableOperator: this.props.switchableOperator
        }
    }
    switchOperator(){
        let tmpData = this.state.data
        if (tmpData.operator === "or"){
            tmpData.operator = "and"
        }else{
            tmpData.operator = "or"
        }
        this.setState({data: tmpData})
    }
    componentDidUpdate(prevProps: MyProps) {
        if (prevProps.items !== this.props.items) {
          this.setState({ items: this.props.items, data: this.props.data });
        }
      }
    OnValueChange=(event: React.SyntheticEvent<Element,Event>, tmp_value: string[], reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails)=>{
        this.setState({data: {...this.state.data,value:tmp_value}})
        this.props.sendToParent(this.state.name, {...this.state.data,value:tmp_value}, this.state.moveIndex)
    }
    render() {
        return (


        <Grid justifySelf={"center"} container width={"100%"}  justifyContent="space-between"  >
            <Grid item xs={1}>
                <h3>{this.state.label}:</h3>
            </Grid>
            <Grid item    xs={6}>
                <Grid container direction="row">
                    <Grid item xs={2}>
                        {this.state.switchableOperator?
                            <ToggleButtonGroup
                                    disabled={false}
                                    value={this.state.data.operator}
                                    exclusive
                                    onChange={()=>{this.switchOperator()}}
                                    aria-label="text alignment"
                                    >
                                    <ToggleButton value="and" >
                                        AND
                                    </ToggleButton>
                                    <ToggleButton value="or" >
                                        OR
                                    </ToggleButton>
                            </ToggleButtonGroup>
                        :null}
                    </Grid>
                    <Grid item xs={10}>
                        <Autocomplete
                                multiple
                                id={this.state.name}
                                onChange={this.OnValueChange}
                                options={this.state.items}
                                value={this.state.data.value}
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

                </Grid>
            <Grid xs={1} item/>

        </Grid>
        
        )
    }
}
