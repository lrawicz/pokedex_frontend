import * as React from 'react';
import {Paper, Box, styled, Grid, Slider} from '@mui/material';
import './style.css'

type mark ={
    value:number,
    label:string
}
type MyProps={
  data:{value:number[],operator:"MinMax",enable?:boolean}
  min:number, max:number,
  name: string, label: string,
  marks: number[], step: number, minDistance: number,
  moveIndex?:number| undefined
  sendToParent:any,
}
type MyState ={
    data:{value:number[],operator:"MinMax",enable?:boolean}
    min:number, max:number,
    name: string, label: string,
    marks: mark[],step: number, minDistance: number,
    moveIndex?:number| undefined
}
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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
            data: this.props.data,
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
        let min:number = 0
        let max:number = 0

        if (activeThumb === 0) {
          const clamped = Math.min(newValue[0], newValue[1] - this.state.minDistance);
          min = clamped
          max = newValue[1]
        } else {
          const clamped = Math.max(newValue[1], newValue[0] + this.state.minDistance);
          max = clamped
          min = newValue[0]
        }
        this.setState({data: {...this.state.data,value:[min,max]}})
        this.props.sendToParent(this.state.name, this.state.data, this.state.moveIndex)
      };
    render() {
      return (

          <Box display={"grid"}  sx={{ flexGrow: 1 }}>

          <Grid justifySelf={"center"} container width={"60%"}  justifyContent="space-between" >
              <Grid item xs={2}>
                  <h3 className='display-table-cell'>{this.state.label}:</h3>
              </Grid>
              <Grid item xs={6.8} sx={{paddingRight:"1em"}}>
                  <Slider
                      id={this.state.name}
                      getAriaLabel={() => 'Minimum distance shift'}
                      value={this.state.data.value}
                      onChange={this.handleChange}
                      disableSwap
                      min={this.state.min}
                      max={this.state.max}
                      valueLabelDisplay="auto"
                      step={this.state.step}
                      marks={this.state.marks}
                      />
              </Grid>
          </Grid>
          </Box>
      )
    }
}
