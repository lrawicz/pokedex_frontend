
export type TypePokemonType = "water" | "fire"
export type TypeDamageClass = "physical" | "special" | "status"
export type TypeCondition = "burned" | "frozen" | "asleep"

export type TypeAbility ={
    trigger: string[]
    target: string[]
    effect: string[]
  }

export let MovesLabel = {
  title:"Title",
  names:"Names",
  damageClass:"Damage Class",
  types: "Types",
  target: "Names",
  power: "Power",
  priority: "Priority",
  accurrency: "Accurrency",
  changeState: "Change State",
  effectChance: "Effect Chance",
  statusEffect: "Status Effect",
  category: "Category"
}
export class ClassMove {

  names:{value:string[],enable:boolean}  = {value:[],enable:true}
  damageClass:{value:string[],enable:boolean} = {value:[],enable:true}
  types:{value:string[],enable:boolean}  = {value:[],enable:true}
  target:{value:string[],enable:boolean} = {value:[],enable:false}
  power:{value:number[], enable:boolean}  = {value:[0,255], enable:true}
  priority:{value:number[], enable:boolean} = {value:[-7,5],enable:false}
  accurrency:{value:number[], enable:boolean} ={value:[0,100],enable:false}
  changeState:{value:number[], enable:boolean} ={value:[0,100],enable:false}
  effectChance:{value:number[], enable:boolean} ={value:[0,100],enable:false}
  statusEffect:{value:string[],enable:boolean}  ={value:[],enable:false}
  category:{value:string[],enable:boolean} = {value:[],enable:false}
  title    : {value:string, enable:boolean} = {value:"",enable:true}
  dialog   :{ value:boolean, enable:boolean} = {value:false,enable:true}
}
export class ClassStats{
  hp:number[] = [0,255]
  attack:number[] = [0,255]
  specialAttack:number[] = [0,255]
  defense:number[] = [0,255]
  specialDefense:number[] = [0,255]
  speed:number[] = [0,255]
}

export type TypeMoveProperties = keyof ClassMove
export type TypeStatsNames =  keyof ClassStats
