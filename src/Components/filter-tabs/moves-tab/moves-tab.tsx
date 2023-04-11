import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { ClassMove,TypeMoveProperties } from '../../../Interface';
import CloseIcon from '@mui/icons-material/Close';

import ComboBoxTags from '../../combo-box-tags/combo-box-tags'
import RangeBar from '../../range-bar/range-bar'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import MovesDialog from './moves-dialog'
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
    sendToParent:(data: ClassMove[]) => void,
    moves:ClassMove[]
  }
  type MyState ={
    expanded:number,
    moves:ClassMove[]
    test:boolean

}
export default class movesTab extends React.Component<MyProps, MyState> {
    constructor(props:MyProps){
        super(props)
        this.state ={
            expanded:0,
            moves: this.props.moves,
            test: false
          }
        this.changePanel = this.changePanel.bind(this);
        this.getData = this.getData.bind(this);
        this.addMove = this.addMove.bind(this);
        this.removeMove = this.removeMove.bind(this);
        this.DialogOpen = this.DialogOpen.bind(this);
    }
    changePanel(panelID: number){
        if (panelID === this.state.expanded){
            panelID =-1
        }
        this.setState({expanded:panelID})
    }
    removeMove(index:number){
        let temp_moves:ClassMove[]
        temp_moves =  this.state.moves
        temp_moves.splice(index,1)// Remove index move
        this.setState({moves: temp_moves}) 
        this.props.sendToParent(this.state.moves)
    }

    getData(prop:keyof ClassMove,data:any,moveIndex?:number, enable?:boolean){
        if (typeof(moveIndex) !== "number"){return}
        let temp_move:ClassMove = this.state.moves[moveIndex]
        let temp_moves:ClassMove[] = this.state.moves
        temp_move[prop as keyof ClassMove].value = data
        temp_moves[moveIndex] =  temp_move
        this.setState({moves: temp_moves})
        this.props.sendToParent(this.state.moves)
      }
    DialogOpen(indexMove:number){
      let temp_move:ClassMove =  this.state.moves[indexMove]
      let temp_moves:ClassMove[] =  this.state.moves
      temp_move.dialog.value = true
      temp_moves[indexMove] = temp_move
      this.setState({
        moves:temp_moves
      })
      this.setState({expanded:indexMove})
      //this.forceUpdate();
    }
    addMove(){
      let temp_move = new ClassMove
      let temp_moves = this.state.moves
      temp_move.title.value = (this.state.moves.length +1).toString()
      temp_moves.push(temp_move)
      this.setState({
        moves: temp_moves
      })
      this.props.sendToParent(this.state.moves)
    }
    test(){

    }
    //
    render() {
    const show_moves = this.state.moves.map((item, i) => {
        return (
          <Accordion key={i} expanded={this.state.expanded === i} >
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Grid container justifyContent="space-between" >
                    <Grid onClick={()=>{this.changePanel(i)}}  width={"95%"}>{item.title.value} </Grid>
                    <Grid>
                      <EditIcon onClick={()=>this.DialogOpen(i)} sx={{color:"blue"}}/>
                      <CloseIcon  onClick={()=>this.removeMove(i)} sx={{color:"red"}}/>
                    </Grid>
                </Grid>
            </AccordionSummary>
            <AccordionDetails>

            <MovesDialog sendToParent={this.test} move={item}/>

              {/*names*/}
              {(item.names.enable===true)?
                  <ComboBoxTags moveIndex={i} name='names' label='Names'
                  items={['baton-pass','follow-me']}
                  value={item.names.value}
                  sendToParent={this.getData}/>
              :null}

              {/*damageClass*/}
              {(item.damageClass.enable===true)?
                  <ComboBoxTags moveIndex={i} label='Damage class' name='damageClass'
                  items={['status','physical','special']}
                  value={item.damageClass.value}
                  sendToParent={this.getData}/>
              :null}

              {/*types*/}
              {(item.types.enable===true)?
                  <ComboBoxTags moveIndex={i} label='types' name='types'
                  items={["fire","water","grass"]}
                  value={item.types.value}
                  sendToParent={this.getData}/>
              :null}

              {/*target*/}
              {(item.target.enable===true)?
                <ComboBoxTags moveIndex={i} label='target' name='target'
                items={["all-opponents","user"]}
                value={item.target.value}
                sendToParent={this.getData}/>
              :null}

              {/*power*/}
              {(item.power.enable===true)?
                <RangeBar moveIndex={i} label='power' name='power'
                min={0} max={255} step={5} minDistante={0}
                value={item.power.value}
                marks={[
                        {label:"40", value:40},{label:"60", value:60},
                        {label:"80", value:80},{label:"100", value:100},
                        {label:"120", value:120},{label:"150", value:150}
                ]}
                sendToParent={this.getData}/>
              :null}

              {/*priority*/}
              {(item.priority.enable===true)?
                <RangeBar moveIndex={i} label='priority' name='priority'
                min={-7} max={5} step={1} minDistante={0}
                marks={[{label:"0", value:0}]}
                value={item.priority.value}
                sendToParent={this.getData}/>
              :null}

              {/*accuracy*/}
              {(item.accurrency.enable===true)?
                <RangeBar moveIndex={i} label='Accuracy'  name='accuracy'
                min={0} max={100} step={5} minDistante={0}
                value={item.accurrency.value}
                marks={[{label:"70", value:70}]}
                sendToParent={this.getData}/>
              :null}

              {/*changeState*/}
              {(item.changeState.enable===true)?
                <RangeBar moveIndex={i} label='change state'  name='changeState'
                min={-6} max={6} step={1} minDistante={0}
                value={item.changeState.value}
                marks={[
                  {label:"-2", value:-2},{label:"-1", value:-1},
                  {label:"1", value:1},{label:"2", value:2}
                ]}
                sendToParent={this.getData}/>
              :null}

              {/*changeState*/}
              {(item.changeState.enable===true)?
                <RangeBar moveIndex={i} label='effect chance' name='effectChance'
                min={0} max={100} step={5} minDistante={0}
                marks={[{label:"50", value:50},{label:"70", value:70}]}
                value={item.changeState.value}
                sendToParent={this.getData}/>
              :null}

              {/*statusEffect*/}
              {(item.statusEffect.enable===true)?
                <ComboBoxTags moveIndex={i} label='status effect' name={"statusEffect"}
                items={["asleep","burned"]}
                value={item.statusEffect.value}
                sendToParent={this.getData}/>
              :null}

              {/*category*/}
              {(item.category.enable===true)?
                <ComboBoxTags moveIndex={i}  label='category' name={"category"}
                items={["damage","net-good-stats"]}
                value={item.category.value}
                sendToParent={this.getData}/>
              :null}

            </AccordionDetails>
        </Accordion>
        );
        });
    return (
        <Box>
            {show_moves}
            <Button onClick={this.addMove} variant="contained">add move</Button>
        </Box>
  )}
}


