import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { ClassStats,TypeStatsNames} from '../../../Interface'
import StatItem from './stat-item/stat-item'

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

    this.props.sendToParent(this.state.stats)
  }

//props.sendStatsToParent(stats)
  render() { return (
    <Box sx={{ width: "100%" }}>
      <Paper elevation={3} >
      <h1>Stats</h1>
        <StatItem sendToParent={this.getStatData} name="hp" value={this.state.stats.hp}  />
        <StatItem sendToParent={this.getStatData} name="attack" value={this.state.stats.attack} />
        <StatItem sendToParent={this.getStatData} name="specialAttack" value={this.state.stats.specialAttack} />
        <StatItem sendToParent={this.getStatData} name="defense" value={this.state.stats.defense} />
        <StatItem sendToParent={this.getStatData} name="specialDefense" value={this.state.stats.specialDefense} />
      </Paper>
      </Box>
  );}
}