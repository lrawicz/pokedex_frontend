import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { TypeMove } from '../../../Interface';
import CloseIcon from '@mui/icons-material/Close';

import ComboBoxTags from '../../combo-box-tags/combo-box-tags'
import RangeBar from '../../range-bar/range-bar'
import Grid from '@mui/material/Grid';



const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));
  




  type MyProps={
    //tabsArray: boolean[], 
    //value: number
    sendToParent:(data: TypeMove[]) => void,
    moves:TypeMove[]

  }
type MyState ={
    expanded:number,
    moves:TypeMove[]

}
export default class movesTab extends React.Component<MyProps, MyState> {
    constructor(props:MyProps){
        super(props)
        this.state ={
            expanded:0,
            moves: props.moves
        }
        this.handleChange = this.handleChange.bind(this);
        this.removeMove = this.removeMove.bind(this);

        
    }
    handleChange(panelID: number){
        if (panelID === this.state.expanded){
            panelID =-1
        }
        this.setState({expanded:panelID})
        
    }
    removeMove(index:number){
        let temp_moves:TypeMove[]
        temp_moves =  this.state.moves
        temp_moves.splice(index,1)// Remove index move
        this.setState({moves: temp_moves}) 
        this.props.sendToParent(this.state.moves)
    }

    test(){}
    render() { 

    const show_moves = this.state.moves.map((item, i) => {
        return (
            <Accordion expanded={this.state.expanded === i} onChange={()=>{this.handleChange(i)}}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Grid container justifyContent="space-between">
                    <Grid><Typography>{item.title}</Typography> </Grid>
                    <Grid><CloseIcon  onClick={()=>this.removeMove(i)} sx={{color:"red"}}/></Grid>
                </Grid>
            </AccordionSummary>
            <AccordionDetails>
            <ComboBoxTags name={"moveNames"} items={["baton-pass","follow-me"]} label='Move names' selected={[]} sendToParent={this.test}></ComboBoxTags>
            <ComboBoxTags name={"damage_class"} items={["status","physical","special"]} label='Damage class' selected={[]} sendToParent={this.test}></ComboBoxTags>
            <ComboBoxTags name={"types"} items={["fire","water","grass"]} label='types' selected={[]} sendToParent={this.test}></ComboBoxTags>
            <ComboBoxTags name={"target"} items={["all-opponents","user"]} label='target' selected={[]} sendToParent={this.test}></ComboBoxTags>

            <RangeBar label='power' min={0} max={255} marks={[{label:"40", value:40},{label:"60", value:60},{label:"80", value:80},{label:"100", value:100},{label:"120", value:120},{label:"150", value:150}]} name='power' sendToParent={this.test} step={5} value={[0,255]} minDistante={0} disable={true}></RangeBar>
            <RangeBar label='priority' min={-7} max={5} marks={[{label:"0", value:0}]} name='priority' sendToParent={this.test} step={1} value={[-7,5]} minDistante={0} ></RangeBar>
            <RangeBar label='accuracy' min={0} max={100} marks={[{label:"70", value:70}]} name='accuracy' sendToParent={this.test} step={5} value={[0,100]} minDistante={0} ></RangeBar>

            <RangeBar label='change state' min={-6} max={6} marks={[{label:"-2", value:-2},{label:"-1", value:-1},{label:"1", value:1},{label:"2", value:2}]} name='chance_stat' sendToParent={this.test} step={1} value={[-6,6]} minDistante={0} ></RangeBar>
            <RangeBar label='effect chance' min={0} max={100} marks={[{label:"50", value:50},{label:"70", value:70}]} name='effect_chance' sendToParent={this.test} step={5} value={[0,100]} minDistante={0} ></RangeBar>
            <ComboBoxTags name={"status_effect"} items={["asleep","burned"]} label='status effect' selected={[]} sendToParent={this.test}></ComboBoxTags>
            <ComboBoxTags name={"category"} items={["damage","net-good-stats"]} label='category' selected={[]} sendToParent={this.test}></ComboBoxTags>
            

            </AccordionDetails>
        </Accordion>
        );
        });
    
    return (
        <div>
            {show_moves}
            + add move 
        </div>
  )}
}


