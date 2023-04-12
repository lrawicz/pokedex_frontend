import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { ClassStats,TypeStatsNames} from '../../../Interface'
import StatItem from './stat-item/stat-item'
import RangerBar from '../../range-bar/range-bar'

type MyProps={
  sendToParent:any,
  stats: ClassStats,
}
type MyState ={
  stats:ClassStats
}
export default class StatsTab extends React.Component<MyProps, MyState>{
  constructor(props:any){ 
    super(props)
    this.getStatData = this.getStatData.bind(this);
    this.state = {
      stats: props.stats
    }
  }
  getStatData = (statName:TypeStatsNames,statValues:number[]) => {
    let newStats:ClassStats
    newStats = this.state.stats
    newStats[statName] = statValues
    this.setState({stats: newStats});
    console.log("stats")
    console.log(statValues)
    console.log(statName)


    this.props.sendToParent(this.state.stats)
  }

//props.sendStatsToParent(stats)
  render() { return (
    <Box sx={{ width: "100%" }}>
      <Paper elevation={3} >
      <h1>Stats</h1>
        <RangerBar name="hp" label='Hp'
            min={0} max={255} step={5} minDistance={0}
            sendToParent={this.getStatData}
            value={this.state.stats.hp}
            marks={[{value:130,label:"130"}]}/>

      <RangerBar  name="attack" label='Attack'
                  min={0} max={255} step={5} minDistance={0}
                  sendToParent={this.getStatData}
                  value={this.state.stats.attack}
                  marks={[{value:130,label:"130"}]}/>

      <RangerBar  name="defense" label='Defense'
                  min={0} max={255} step={5} minDistance={0}
                  sendToParent={this.getStatData}
                  value={this.state.stats.defense}
                  marks={[{value:130,label:"130"}]}/>

      <RangerBar  name="specialAttack" label='Special Attack'
                  min={0} max={255} step={5} minDistance={0}
                  sendToParent={this.getStatData}
                  value={this.state.stats.specialAttack}
                  marks={[{value:130,label:"130"}]}/>

      <RangerBar  name="specialDefense" label='Special Defense'
                  min={0} max={255} step={5} minDistance={0}
                  sendToParent={this.getStatData}
                  value={this.state.stats.specialDefense}
                  marks={[{value:130,label:"130"}]}/>

      <RangerBar  name="speed" label='Speed'
                  min={0} max={255} step={5} minDistance={0}
                  sendToParent={this.getStatData}
                  value={this.state.stats.speed}
                  marks={[{value:130,label:"130"}]}/>
      </Paper>
      </Box>
  );}
}