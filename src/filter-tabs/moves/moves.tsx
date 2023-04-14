import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {AccordionSummaryProps,} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

import {Grid,Box} from '@mui/material';

//Icons
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
// Own:
import RangeBar from '../../components/range-bar/range-bar'
import ComboBoxTags from '../../components/combo-box-tags/combo-box-tags'
import MovesDialog from './moves-dialog'
import { moveProperty } from '../../Interface';
import { TypeMoveData, ClassMove, ClassMoveData, TypeMoveDataProp} from './classes'

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
    test:boolean,
    posibleTypes:string[]

}
export default class movesTab extends React.Component<MyProps, MyState> {
    constructor(props:MyProps){
        super(props)
        this.changePanel = this.changePanel.bind(this);
        this.getFilterDataFromChild = this.getFilterDataFromChild.bind(this);
        this.addMove = this.addMove.bind(this);
        this.removeMove = this.removeMove.bind(this);
        this.DialogOpen = this.DialogOpen.bind(this);
        this.changeConfig = this.changeConfig.bind(this);
        //this.getPokemonTypes = this.getPokemonTypes.bind(this);
        
        //let posibleTypes:string[] = this.getPokemonTypes()
        this.state ={
            expanded:0,
            moves: this.props.moves,
            test: false,
            posibleTypes: []
          }
        }
    componentDidMount() {
      fetch("https://pokeapi.co/api/v2/type")
        .then(response => {
          return response.json()
        })
        .then(data => {
          let tmp_type: string[] = []
          data.results.forEach((element: any) => {
            tmp_type.push(element.name)
          })
          this.setState((prevState) => ({
            posibleTypes: [...prevState.posibleTypes, ...tmp_type]
          }))
        })
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

    getFilterDataFromChild(key:string,data:any,moveIndex?:number, enable?:boolean){
        if (typeof(moveIndex) === "number"){
          let temp_move:ClassMove = this.state.moves[moveIndex]
          let temp_moves:ClassMove[] = this.state.moves
          temp_move.data[key as keyof typeof temp_move.data] = data
          temp_moves[moveIndex] =  temp_move
          this.setState({moves: temp_moves})
          this.props.sendToParent(this.state.moves)
        }
    }
    DialogOpen(indexMove:number){
      let temp_move:ClassMove =  this.state.moves[indexMove]
      let temp_moves:ClassMove[] =  this.state.moves
      temp_move.dialog = true
      temp_moves[indexMove] = temp_move
      this.setState({
        moves:temp_moves
      })
      this.setState({expanded:indexMove})
      //this.forceUpdate();
    }
    addMove(){
      let temp_move = new ClassMove()
      let temp_moves = this.state.moves
      temp_move.title = (this.state.moves.length +1).toString()
      temp_moves.push(temp_move)
      this.setState({
        moves: temp_moves
      })
      this.props.sendToParent(this.state.moves)
    }
    changeConfig(data:ClassMove, index:number){
      let temp_moves = this.state.moves
      temp_moves[index] = data
      this.setState({
        moves: temp_moves
      })
    }
    //
    render() {
    const show_moves = this.state.moves.map((item, i) => {
        return (
          <Accordion key={i} expanded={this.state.expanded === i} >
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Grid container justifyContent="space-between" >
                    <Grid onMouseDown={()=>{this.changePanel(i)}}  width={"95%"}>{item.title} </Grid>
                    <Grid >
                      <EditIcon onClick={()=>this.DialogOpen(i)} sx={{color:"blue"}}/>
                      <CloseIcon  onClick={()=>this.removeMove(i)} sx={{color:"red"}}/>
                    </Grid>
                </Grid>
            </AccordionSummary>
            <AccordionDetails>

            <MovesDialog sendToParent={this.changeConfig} move={item} moveIndex={i}/>

              {/*names*/}
              {(item.data.names.enable===true)?
                  <ComboBoxTags moveIndex={i} name='names' label='Names'
                  items={['baton-pass','follow-me']}
                  data={item.data.names}
                  sendToParent={this.getFilterDataFromChild}/>
              :null}

              {/*damageClass*/}
              {(item.data.damageClass.enable===true)?
                  <ComboBoxTags moveIndex={i} label='Damage class' name='damageClass'
                  items={['status','physical','special']}
                  data={item.data.damageClass}
                  sendToParent={this.getFilterDataFromChild}/>
              :null}

              {/*types*/}
              {(item.data.types.enable===true)?
                  <ComboBoxTags moveIndex={i} label='types' name='types'
                  items={this.state.posibleTypes}
                  data={item.data.types}
                  sendToParent={this.getFilterDataFromChild}/>
              :null}

              {/*target*/}
              {(item.data.target.enable===true)?
                <ComboBoxTags moveIndex={i} label='target' name='target'
                items={["all-opponents","user"]}
                data={item.data.target}
                sendToParent={this.getFilterDataFromChild}/>
              :null}

              {/*power*/}
              {(item.data.power.enable===true)?
                <RangeBar moveIndex={i} label='power' name='power'
                min={0} max={255} step={5} minDistance={0}
                data={item.data.power}
                marks={[40,80,100,120,150]}
                sendToParent={this.getFilterDataFromChild}/>
              :null}

              {/*priority*/}
              {(item.data.priority.enable===true)?
                <RangeBar moveIndex={i} label='priority' name='priority'
                min={-7} max={5} step={1} minDistance={0}
                marks={[0]}
                data={item.data.priority}
                sendToParent={this.getFilterDataFromChild}/>
              :null}

              {/*accuracy*/}
              {(item.data.accurrency.enable===true)?
                <RangeBar moveIndex={i} label='Accuracy'  name='accuracy'
                min={0} max={100} step={5} minDistance={0}
                data={item.data.accurrency}
                marks={[70]}
                sendToParent={this.getFilterDataFromChild}/>
              :null}


              {/*effectChance*/}
              {(item.data.effectChance.enable===true)?
                <RangeBar moveIndex={i} label='effect chance' name='effectChance'
                min={0} max={100} step={5} minDistance={0}
                marks={[50,70]}
                data={item.data.effectChance}
                sendToParent={this.getFilterDataFromChild}/>
              :null}

              {/*statusEffect*/}
              {(item.data.statusEffect.enable===true)?
                <ComboBoxTags moveIndex={i} label='status effect' name={"statusEffect"}
                items={["asleep","burned"]}
                data={item.data.statusEffect}
                sendToParent={this.getFilterDataFromChild}/>
              :null}

              {/*category*/}
              {/* ADD OPERATOR*/}
              {(item.data.category.enable===true)?
                <ComboBoxTags moveIndex={i}  label='category' name={"category"}
                items={["damage","net-good-stats"]}
                data={item.data.category}
                sendToParent={this.getFilterDataFromChild}/>
              :null}
            </AccordionDetails>
        </Accordion>
        );
        });
    return (
        <Box>
            {show_moves}
            <Accordion onClick={this.addMove} key={99} expanded={false} >
            <AccordionSummary sx={{ backgroundColor: "#1976d2"}}
              expandIcon={<AddCircleIcon />} 
              color="secondary" 
              aria-controls="panel1d-content" 
              id="panel1d-header">
                <Grid    container justifyContent="space-between" >
                    <Grid   color={"white"} width={"95%"}>New Move </Grid>
                </Grid>
            </AccordionSummary>
            <AccordionDetails>
            </AccordionDetails>
            </Accordion>
        </Box>
  )}
}


