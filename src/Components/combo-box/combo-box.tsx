import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';

type MyProps={
    sendToParent:any,
    items:string[],
    selectedValue:string | undefined,
    name: string,
    label: string,
    moveIndex?: number| undefined
  }
type MyState ={
    items:string[],
    selectedValue:string| undefined,
    name: string,
    label: string,
    moveIndex: number| undefined
}
export default class ComboBox extends React.Component<MyProps, MyState> {
    constructor(props:MyProps){
        super(props)
        let temp_moveIndex = typeof(this.props.moveIndex)== "number"?  this.props.moveIndex:undefined
        this.state = {
            items:this.props.items,
            selectedValue:this.props.selectedValue,
            name: this.props.name,
            label: this.props.label,
            moveIndex: temp_moveIndex
        }
    }
    handleChange=(event:SelectChangeEvent<string>,child:React.ReactNode)=>{
        this.setState({
            selectedValue: event.target.value
        })
        this.props.sendToParent(this.state.name, this.state.selectedValue, this.state.moveIndex)
    }

    render() {
        const menuItems = this.state.items.map((item, i) =>{
            return(
            <MenuItem value={item}>{item}</MenuItem>
            )
        });
        return (
            <Box sx={{ minWidth: 120 }}>
                <Grid container spacing={2}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                    <Grid item xs={1}>
                        <h3>{this.state.name}:</h3>
                    </Grid>

                    <Grid item xs={5} >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">{this.state.name}</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.selectedValue}
                            label={this.state.name}
                            onChange={this.handleChange}
                            >
                            {menuItems}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}
