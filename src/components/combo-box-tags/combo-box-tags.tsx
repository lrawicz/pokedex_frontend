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
    name: string,
    label: string,
    data:{value:string[],operator:"OneOf" | "ContainsAll"},
    switchableOperator?:boolean,
    moveIndex?:number,
  }
type MyState ={
    items:string[],
    name: string,
    label: string,
    data:{value:string[],operator:"OneOf" | "ContainsAll"},
    moveIndex?:number| undefined,
    switchableOperator?:boolean,

}
export default class ComboBoxTags extends React.Component<MyProps, MyState> {
    constructor(props:MyProps){
        super(props)
        let temp_moveIndex = typeof(this.props.moveIndex)== "number"?  this.props.moveIndex:undefined
        this.state = {
            data:this.props.data,
            items:this.props.items,
            name: this.props.name,
            label: this.props.label,
            moveIndex: temp_moveIndex,
            switchableOperator: this.props.switchableOperator
        }
    }
    componentDidUpdate(prevProps: MyProps) {
        if (prevProps.items !== this.props.items) {
          this.setState({ items: this.props.items, data: this.props.data });
        }
      }
    OnValueChange=(event: React.SyntheticEvent<Element,Event>, tmp_value: string[], reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails)=>{
        let tmp_data:{value:string[],operator:"OneOf" | "ContainsAll"}  =this.state.data
        tmp_data["value"] = tmp_value
        this.setState({data: tmp_data})
        this.props.sendToParent(this.state.name, tmp_data, this.state.moveIndex)
    }
    OnOperatorChange=(event: React.SyntheticEvent<Element,Event>, tmp_value: string | null, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails)=>{
        let tmp_data:{value:string[],operator:"OneOf" | "ContainsAll"}  =this.state.data
        if (tmp_value == "OneOf"){
            tmp_data["operator"] = "OneOf"
        }else{
            tmp_data["operator"] = "ContainsAll"
        }
        this.setState({data: tmp_data})
        this.props.sendToParent(this.state.name, tmp_data, this.state.moveIndex)
    }

    render() {
        return (

        <Box display={"grid"}  sx={{ flexGrow: 1 }}>

        <Grid justifySelf={"center"} container width={"60%"}  justifyContent="space-between" >
            <Grid item xs={2}>
                <h3 className='display-table-cell'>{this.state.label}:</h3>
            </Grid>
            {this.state.switchableOperator? 
                <Grid item xs={3}>
                <Autocomplete
                    onChange={this.OnOperatorChange}
                    options={["OneOf","ContainsAll"]}
                    value="ContainsAll"
                    disableCloseOnSelect
                    getOptionLabel={(option) => option} 
                    renderOption={(props, option) => (
                        <li {...props}>
                        {option}
                        </li>
                    )}
                    renderInput={(params) => (
                        <TextField {...params} />
                    )}
                    />
                </Grid>
            :null}
            <Grid item xs={7}>
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
        </Box>
        
        )
    }
}
