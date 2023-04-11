import * as React from 'react';
import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Grid';
import './stat-item.css';
import {TypeMinMax, TypeStatsNames} from '../../../../Interface'


type MyProps={
  sendToParent:any,
  name: TypeStatsNames,
  value:TypeMinMax
}
type MyState ={
  name:string,
  value:number[]
}
export default class StatItem extends React.Component<MyProps, MyState> 
  {
  
  absoluteMaxValue:number
  absoluteMinValue:number
  marks:{value:number,label:string}[]
  minDistance:number
  step:number
  
//:{name:string, value:StatValues_int, sendToParent:any}
  constructor(props:MyProps){
    super(props)

    //General
    this.absoluteMinValue= 0;
    this.absoluteMaxValue= 255;
    this.step= 5
    this.minDistance = 0;
    this.marks = [
      {value: this.absoluteMinValue,label: this.absoluteMinValue.toString()},
      {value: 130,label: '130'},
      {value: this.absoluteMaxValue,label: this.absoluteMaxValue.toString()}
    ]
    
    //Specific
    this.state = {
      name: props.name,
      value: [props.value.min,props.value.max]
    }
    if (this.state.name =="hp"){
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event: Event,newValue: number | number[],activeThumb: number){
      if (!Array.isArray(newValue)) {
        return;
      }



      if (newValue[1] - newValue[0] < this.minDistance) {
        if (activeThumb === 0) {
          const clamped = Math.min(newValue[0], 100 - this.minDistance);
          this.setState({value: [clamped, clamped + this.minDistance]});
        } else {
          const clamped = Math.max(newValue[1], this.minDistance);
          this.setState({value: [clamped - this.minDistance, clamped]});
        }
      } else {
        this.setState({value: newValue as number[]});
      }
      this.props.sendToParent(this.state.name, {"min":this.state.value[0],"max":this.state.value[1]})
    };
  render() {
    return (<Grid container justifyContent="center">
      <Grid item xs={2}><h3>{this.state.name}:</h3></Grid>
      <Grid item xs={5}>
        <Slider 
          id={"stat-" + this.state.name}
          getAriaLabel={() => 'Minimum distance shift'}
          value={this.state.value}
          onChange={this.handleChange}
          disableSwap
          min={this.absoluteMinValue}
          max={this.absoluteMaxValue}
          valueLabelDisplay="auto"
          sx={{ width: "90%" }}
          step={this.step}
          marks={this.marks}

          />
      </Grid>
    </Grid>
    )
  }

}

