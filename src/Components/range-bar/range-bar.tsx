import * as React from 'react';

import Slider from '@mui/material/Slider';
import Grid from '@mui/material/Grid';

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
    marks: number[],
    step: number,
    minDistance: number,
    moveIndex?:number| undefined
  }
type MyState ={
    min:number,
    max:number,
    value:number[],
    name: string,
    label: string,
    marks: mark[],
    step: number,
    minDistance: number,
    moveIndex?:number| undefined

}

export default class ComboBox extends React.Component<MyProps, MyState> {
    constructor(props:MyProps){
        super(props)
        let temp_moveIndex = typeof(this.props.moveIndex)== "number"?  this.props.moveIndex:undefined
        let temp_marks:mark[] = []
        temp_marks.push({value:this.props.min,label:this.props.min.toString()})
        this.props.marks.forEach(element => {
          temp_marks.push({value:element,label:element.toString()})
        });
        temp_marks.push({value:this.props.max,label:this.props.max.toString()})

        this.state = {
            value: this.props.value,
            min: this.props.min,
            max: this.props.max,
            name: this.props.name,
            label: this.props.label,
            marks: temp_marks,
            step: this.props.step,
            minDistance: this.props.minDistance,
            moveIndex:temp_moveIndex
        }
        this.handleChange = this.handleChange.bind(this);

    }
    handleChange(event: Event,newValue: number | number[],activeThumb: number){
        if (!Array.isArray(newValue)) {
          return;
        }
        if (newValue[1] - newValue[0] < this.state.minDistance) {
          if (activeThumb === 0) {
            const clamped = Math.min(newValue[0], 100 - this.state.minDistance);
            this.setState({value: [clamped, clamped + this.state.minDistance]});
          } else {
            const clamped = Math.max(newValue[1], this.state.minDistance);
            this.setState({value: [clamped - this.state.minDistance, clamped]});
          }
        } else {
          this.setState({value: newValue as number[]});
        }
        this.props.sendToParent(this.state.name, this.state.value, this.state.moveIndex)
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

            />
            </Grid>
      </Grid>
      )
    }
}
