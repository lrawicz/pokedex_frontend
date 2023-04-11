import * as React from 'react';

import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Grid';
import { MarkOptions } from 'perf_hooks';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { endianness } from 'os';

type mark ={
    value:number,
    label:string
}
type MyProps={
    sendToParent:any,
    min:number,
    max:number,
    value:number[],
    name: string,
    label: string,
    marks: mark[],
    step: number,
    minDistante: number,
    disable?:boolean
  }
type MyState ={
    min:number,
    max:number,
    value:number[],
    name: string,
    label: string,
    marks: mark[],
    step: number,
    minDistante: number,
    enable:boolean
}

export default class ComboBox extends React.Component<MyProps, MyState> {
    constructor(props:MyProps){
        super(props)
        this.state = {
            value: this.props.value,
            min: this.props.min,
            max: this.props.max,
            name: this.props.name,
            label: this.props.label,
            marks: [{value:this.props.min,label:this.props.min.toString()}, ...this.props.marks,{value:this.props.max,label:this.props.max.toString()}],
            step: this.props.step,
            minDistante: this.props.minDistante,
            enable:true

        }
        this.handleChange = this.handleChange.bind(this);
        this.disableBar = this.disableBar.bind(this);


    }
    handleChange(event: Event,newValue: number | number[],activeThumb: number){
        if (!Array.isArray(newValue)) {
          return;
        }
        if (newValue[1] - newValue[0] < this.state.minDistante) {
          if (activeThumb === 0) {
            const clamped = Math.min(newValue[0], 100 - this.state.minDistante);
            this.setState({value: [clamped, clamped + this.state.minDistante]});
          } else {
            const clamped = Math.max(newValue[1], this.state.minDistante);
            this.setState({value: [clamped - this.state.minDistante, clamped]});
          }
        } else {
          this.setState({value: newValue as number[]});
        }
        this.props.sendToParent(this.state.name, {"min":this.state.value[0],"max":this.state.value[1]})
      };
    disableBar(event: React.ChangeEvent<HTMLInputElement>, checked: boolean){
        this.setState({enable: checked})
    };
    render() {
      return (
        <Grid container justifyContent="center">
            <Grid item xs={2}><h3>{this.state.label}:</h3></Grid>
            <Grid item xs={5}>
                <Slider 
                    id={this.state.name}
                    getAriaLabel={() => 'Minimum distance shift'}
                    value={this.state.value}
                    onChange={this.handleChange}
                    disableSwap
                    min={this.state.min}
                    max={this.state.max}
                    valueLabelDisplay="auto"
                    sx={{ width: "90%" }}
                    step={this.state.step}
                    marks={this.state.marks}
                    disabled={!this.state.enable}

            />
            </Grid>
            {this.props.disable ? <Grid item xs={0}><FormControlLabel control={<Switch onChange={this.disableBar} defaultChecked />} label={this.state.enable? "Enable":"Disable"} /></Grid>: null}
      </Grid>
      )
    }
}
