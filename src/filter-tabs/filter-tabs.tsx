import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {Grid,Box} from '@mui/material';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';

//icons
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SportsMmaIcon from '@mui/icons-material/SportsMma';
import AutoFixHigh from '@mui/icons-material/AutoFixHigh';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';

// Own:
import { ClassStats } from './stats/classes';
import { ClassGeneralData } from './general/classes';
import { ClassAbility } from './abilities/classes';
import { ClassMove} from './moves/classes'

import StatsTab from './stats/stats';
import AbiltiesTab from './abilities/abilities';
import MovesTab from './moves/moves';
import PokemonTab from './general/general'
import Results from './results/resultsV2';
import { ClassFilter } from './classes';
interface TabPanelProps {
 children?: React.ReactNode;
 index: number;
 value: number;
}
type MyProps={
  //tabsArray: boolean[], 
  //value: number
  sendToParent:any
}
type MyState ={
  tabsArray: boolean[], 
  value: number,
  filter:ClassFilter,
  abilityOptions:{trigger:string[],target:string[],effect:string[]}
}
export default class Filters extends React.Component<MyProps, MyState> {

  constructor(props:MyProps){

    super(props)
   
    this.state ={
      tabsArray: [true,true,true,true,true],
      value:0,
      filter: new ClassFilter(),
      abilityOptions:{
        trigger: ["trigger01","trigger02","trigger03"],
        target: ["asd2"],
        effect: ["asd3"]
      }
      }
    }
    //const [tabsArray, setTabsArray] = useState([true,true,true,true,true]);
    //const [value, setValue] = React.useState(0);
  TabPanel(props:TabPanelProps ) {
    const { children, value, index, ...other } = props;
  
    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </Box>
    );
  }
  a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  tabChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue<7){
      this.setState({
        tabsArray:this.state.tabsArray,
        value: newValue
      })
    }else{
      console.log("hola")
    }
  }
  tabOnClick = (event: React.SyntheticEvent,index:number) => {
    let temp_array =  this.state.tabsArray
    temp_array[index] = !temp_array[index]
    this.setState({
      tabsArray:  temp_array,
      value: this.state.value
    })
    
  }
  getStatData = (data:ClassStats) =>{
    this.setState({filter:{...this.state.filter, stats: data}});

  }
  getAbilityData = (data:ClassAbility) =>{
    this.setState({filter:{...this.state.filter, ability: data}});

  }
  getMovesData = (data:ClassMove[]) =>{
    this.setState({filter:{...this.state.filter, moves: data}});

  }
  getClassGeneralData = (data:ClassGeneralData) =>{
    this.setState({filter:{...this.state.filter, general: data}});
  }

  render() { return (
    <Box sx={{ width: '100%' }} justifyContent="space-between">

    <Grid  container display={"grid"} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Grid xs={8} item>
          <Tabs value={this.state.value} onChange={this.tabChange}  aria-label="basic tabs example">
            <Tab  label="General" icon={<CatchingPokemonIcon/>}  {... this.a11yProps(0)} />
            <Tab  label="Stats"  icon={<AlignHorizontalLeftIcon/>}   {...this.a11yProps(1)} />
            <Tab  label="Ability" icon={<AutoFixHigh/>} {...this.a11yProps(2)}/>
            <Tab  label="Moves" icon={<SportsMmaIcon/>} {...this.a11yProps(3)} />
            <Tab sx={{backgroundColor:"#998b82"}} label="Defensive" icon={<GppMaybeIcon/>} {...this.a11yProps(4)} />
            <Tab sx={{backgroundColor:"#998b82"}} label="Misc" icon={<MoreHorizIcon/>} {...this.a11yProps(5)} />
            <Tab sx={{backgroundColor:"#8fd053"}} label="Filter" icon={<FilterAltIcon/>} {...this.a11yProps(6)} />

          </Tabs>
        </Grid>

    </Grid>
    <this.TabPanel value={this.state.value} index={0}>
      <PokemonTab data={this.state.filter.general} sendToParent={this.getStatData}/>
    </this.TabPanel>
    <this.TabPanel value={this.state.value} index={1} >
      <StatsTab sendToParent={this.getStatData} stats={this.state.filter.stats }/>
    </this.TabPanel>
    <this.TabPanel value={this.state.value} index={2}>
      <AbiltiesTab abilityOptions={this.state.abilityOptions} abilitySelected={this.state.filter.ability} sendToParent={this.getAbilityData} />
    </this.TabPanel>
    <this.TabPanel value={this.state.value} index={3}>
     <MovesTab sendToParent={this.getMovesData} moves={this.state.filter.moves}/>
    </this.TabPanel>
    <this.TabPanel value={this.state.value} index={4}>
      Defensive Data
    </this.TabPanel>
    <this.TabPanel value={this.state.value} index={5}>
      Misc.
    </this.TabPanel>
    <this.TabPanel value={this.state.value} index={6}>
      <Results filter={this.state.filter}/>
    </this.TabPanel>
  </Box>
  )}
}