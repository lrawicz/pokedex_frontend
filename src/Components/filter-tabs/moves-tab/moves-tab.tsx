import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { TypeMinMax, TypeMove,TypeMoveProperties } from '../../../Interface';
import CloseIcon from '@mui/icons-material/Close';

import ComboBoxTags from '../../combo-box-tags/combo-box-tags'
import RangeBar from '../../range-bar/range-bar'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';



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
            moves: this.props.moves
        }
        this.handleChange = this.handleChange.bind(this);
        this.removeMove = this.removeMove.bind(this);
        this.getData = this.getData.bind(this);
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

    getData(prop:TypeMoveProperties,data:any,moveIndex?:number, enable?:boolean){
        if (typeof(moveIndex) == "number"){
            let temp_move: TypeMove = this.state.moves[moveIndex]
            let temp_moves: TypeMove[] = this.state.moves
            temp_move[prop] = data
            temp_moves[moveIndex] =  temp_move
            this.setState({
                moves: temp_moves
            })
        }
        this.props.sendToParent(this.state.moves)
    }
    //
    render() {
    const show_moves = this.state.moves.map((item, i) => {
        return (
          <Accordion key={i} expanded={this.state.expanded === i} onChange={()=>{this.handleChange(i)}}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Grid container justifyContent="space-between">
                    <Grid>{item.title} </Grid>
                    <Grid><CloseIcon  onClick={()=>this.removeMove(i)} sx={{color:"red"}}/></Grid>
                </Grid>
            </AccordionSummary>
            <AccordionDetails>
              {/*names*/}
                  <ComboBoxTags moveIndex={i} name='names' label='Names'
                  items={['baton-pass','follow-me']}
                  value={this.state.moves[i].names}
                  sendToParent={this.getData}/>

              {/*damageClass*/}
                  <ComboBoxTags moveIndex={i} label='Damage class' name='damageClass'
                  items={['status','physical','special']}
                  value={this.state.moves[i].damageClass}
                  sendToParent={this.getData}/>

              {/*types*/}
                  <ComboBoxTags moveIndex={i} label='types' name='types'
                  items={["fire","water","grass"]}
                  value={this.state.moves[i].types}
                  sendToParent={this.getData}/>

              {/*target*/}
                <ComboBoxTags moveIndex={i} label='target' name='target'
                items={["all-opponents","user"]}
                value={this.state.moves[i].target}
                sendToParent={this.getData}/>

              {/*power*/}
                <RangeBar moveIndex={i} label='power' name='power'
                min={0} max={255} step={5} minDistante={0}
                enable={this.state.moves[i].power.enable}
                value={[this.state.moves[i].power.min,this.state.moves[i].power.max]}
                marks={[
                        {label:"40", value:40},{label:"60", value:60},
                        {label:"80", value:80},{label:"100", value:100},
                        {label:"120", value:120},{label:"150", value:150}
                ]}
                sendToParent={this.getData}/>

              {/*priority*/}
              <RangeBar moveIndex={i} label='priority' name='priority'
                min={-7} max={5} step={1} minDistante={0}
                marks={[{label:"0", value:0}]}
                value={[this.state.moves[i].priority.min,this.state.moves[i].priority.max]}
                sendToParent={this.getData}/>

              {/*accuracy*/}
                <RangeBar moveIndex={i} label='Accuracy'  name='accuracy'
                min={0} max={100} step={5} minDistante={0}
                value={[this.state.moves[i].accurrency.min, this.state.moves[i].accurrency.max]}
                marks={[{label:"70", value:70}]}
                sendToParent={this.getData}/>

              {/*changeState*/}
                <RangeBar moveIndex={i} label='change state'  name='changeState'
                min={-6} max={6} step={1} minDistante={0}
                value={[this.state.moves[i].changeState.min, this.state.moves[i].changeState.max]}
                marks={[
                  {label:"-2", value:-2},{label:"-1", value:-1},
                  {label:"1", value:1},{label:"2", value:2}
                ]}
                sendToParent={this.getData}/>

              {/*changeState*/}
                <RangeBar moveIndex={i} label='effect chance' name='effectChance'
                min={0} max={100} step={5} minDistante={0}
                marks={[{label:"50", value:50},{label:"70", value:70}]}
                value={[this.state.moves[i].changeState.min,this.state.moves[i].changeState.max]}
                sendToParent={this.getData}/>

              {/*statusEffect*/}
                <ComboBoxTags moveIndex={i} label='status effect' name={"statusEffect"}
                items={["asleep","burned"]}
                value={this.state.moves[i].statusEffect}
                sendToParent={this.getData}/>

              {/*category*/}
              <ComboBoxTags moveIndex={i}  label='category' name={"category"}
              items={["damage","net-good-stats"]}
              value={this.state.moves[i].category}
              sendToParent={this.getData}/>

            </AccordionDetails>
        </Accordion>
        );
        });
    return (
        <Box>
            {show_moves}
            + add move 
        </Box>
  )}
}


