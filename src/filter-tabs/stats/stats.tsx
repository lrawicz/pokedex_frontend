import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { ClassStats,TypeStatsNames} from '../../Interface'
import RangerBar from '../../components/range-bar/range-bar'

type MyProps={
  sendToParent:any,
  stats: ClassStats,
}
type MyState ={
  stats:ClassStats
}
export default class StatsTab extends React.Component<MyProps, MyState>{
  constructor(props:MyProps){ 
    super(props)
    this.getFilterDataFromChild = this.getFilterDataFromChild.bind(this);
    this.state = {
      stats: props.stats
    }
  }
  getFilterDataFromChild = (statName:TypeStatsNames,statValues:number[]) => {
    let newStats:ClassStats
    newStats = this.state.stats
    newStats[statName].value = statValues
    this.setState({stats: newStats});
    this.props.sendToParent(this.state.stats)
  }

//props.sendStatsToParent(stats)
  render() { return (
    <Box sx={{ width: "100%" }}>
      <Paper elevation={3} >

      <RangerBar name="hp" label='Hp'
                  min={0} max={255} step={5} minDistance={0}
                  sendToParent={this.getFilterDataFromChild}
                  data={this.state.stats.hp}
                  marks={[100,130]}/>

      <RangerBar  name="attack" label='Attack'
                  min={0} max={255} step={5} minDistance={0}
                  sendToParent={this.getFilterDataFromChild}
                  data={this.state.stats.attack}
                  marks={[100,130]}/>

      <RangerBar  name="defense" label='Defense'
                  min={0} max={255} step={5} minDistance={0}
                  sendToParent={this.getFilterDataFromChild}
                  data={this.state.stats.defense}
                  marks={[100,130]}/>

      <RangerBar  name="specialAttack" label='Special Attack'
                  min={0} max={255} step={5} minDistance={0}
                  sendToParent={this.getFilterDataFromChild}
                  data={this.state.stats.specialAttack}
                  marks={[100,130]}/>

      <RangerBar  name="specialDefense" label='Special Defense'
                  min={0} max={255} step={5} minDistance={0}
                  sendToParent={this.getFilterDataFromChild}
                  data={this.state.stats.specialDefense}
                  marks={[100,130]}/>

      <RangerBar  name="speed" label='Speed'
                  min={0} max={255} step={5} minDistance={0}
                  sendToParent={this.getFilterDataFromChild}
                  data={this.state.stats.speed}
                  marks={[100,130]}/>
      </Paper>
      </Box>
  );}
}