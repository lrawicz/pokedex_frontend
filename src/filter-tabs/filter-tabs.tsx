import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {Grid,Box} from '@mui/material';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import SportsMmaIcon from '@mui/icons-material/SportsMma';
import AutoFixHigh from '@mui/icons-material/AutoFixHigh';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
// Own:
import {  ClassAbility, ClassStats} from '../Interface'
import { ClassMove} from './moves/classes'
import StatsTab from './stats/stats';
import AbiltiesTab from './abilities/abilities';
import MovesTab from './moves/moves';
import PokemonTab from './general/general'
import { GeneralData } from './general/interface';
interface TabPanelProps {
 children?: React.ReactNode;
 index: number;
 value: number;
}
type MyProps={
  //tabsArray: boolean[], 
  //value: number
}
type MyState ={
  tabsArray: boolean[], 
  value: number,
  stats: ClassStats
  abilityOptions: {trigger:string[],target:string[],effect:string[]},
  abilitySelected: ClassAbility,
  moves: ClassMove[],
  general: GeneralData

}
export default class Filters extends React.Component<MyProps, MyState> {

  constructor(props:MyProps){

    super(props)
    let move01:ClassMove = new ClassMove()
    move01.title= "01"
    let move02:ClassMove = new ClassMove()
    move02.title= "02"
    this.state ={
      tabsArray: [true,true,true,true,true],
      value:0,
      stats: new ClassStats(),
      abilityOptions:{
        trigger: ["trigger01","trigger02","trigger03"],
        target: ["asd2"],
        effect: ["asd3"]
      },
      abilitySelected: new ClassAbility(),
      moves:[move01,move02],
      general: new GeneralData()
    }
    //const [tabsArray, setTabsArray] = useState([true,true,true,true,true]);
    //const [value, setValue] = React.useState(0);
  }
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
  handleChange = (event: React.SyntheticEvent, newValue: number) => {
    this.setState({
      tabsArray:this.state.tabsArray,
      value: newValue
    })
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
    this.setState({stats: data});
  }
  getAbilityData = (data:ClassAbility) =>{
    this.setState({abilitySelected: data});
  }
  getMovesData = (data:ClassMove[]) =>{
    this.setState({moves: data});
  }
  getGeneralData = (data:GeneralData) =>{
    this.setState({general: data});
  }
  render() { return (
    <Box sx={{ width: '100%' }} justifyContent="space-between">

    <Grid  container display={"grid"} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Grid xs={8} item>
          <Tabs value={this.state.value} onChange={this.handleChange}  aria-label="basic tabs example">
            <Tab  label="General" icon={<CatchingPokemonIcon/>}  {... this.a11yProps(0)} />
            <Tab label="Stats"  icon={<AlignHorizontalLeftIcon/>}   {...this.a11yProps(1)} />
            <Tab  label="Ability" icon={<AutoFixHigh/>} {...this.a11yProps(2)}/>
            <Tab label="Moves" icon={<SportsMmaIcon/>} {...this.a11yProps(3)} />
            <Tab sx={{backgroundColor:"#998b82"}} label="Defensive" icon={<GppMaybeIcon/>} {...this.a11yProps(4)} />
            <Tab sx={{backgroundColor:"#998b82"}} label="Misc" value={7} icon={<MoreHorizIcon/>} {...this.a11yProps(5)} />
          </Tabs>
        </Grid>

    </Grid>
    <this.TabPanel value={this.state.value} index={0}>
      <PokemonTab data={this.state.general} sendToParent={this.getStatData}/>
    </this.TabPanel>
    <this.TabPanel value={this.state.value} index={1} >
      <StatsTab sendToParent={this.getStatData} stats={this.state.stats }/>
    </this.TabPanel>
    <this.TabPanel value={this.state.value} index={2}>
      <AbiltiesTab abilityOptions={this.state.abilityOptions} abilitySelected={this.state.abilitySelected} sendToParent={this.getAbilityData} />
    </this.TabPanel>
    <this.TabPanel value={this.state.value} index={3}>
     <MovesTab sendToParent={this.getMovesData} moves={this.state.moves}/>
    </this.TabPanel>
    <this.TabPanel value={this.state.value} index={4}>
      Defensive Data
    </this.TabPanel>
    <this.TabPanel value={this.state.value} index={5}>
      Misc.
    </this.TabPanel>
  </Box>
  )}
}