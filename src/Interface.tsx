export type TypeMinMax ={
  min: number
  max: number
}
export type TypeStatsNames ="hp"| "attack" | "specialAttack"  | "defense" | "specialDefense" | "speed"
export type TypePokemonType = "water" | "fire"
export type TypeDamageClass = "physical" | "special" | "status"
export type TypeCondition = "burned" | "frozen" | "asleep"
export type TypeMoveProperties = "title" | "names" | "damageClass" | "types" | "target" | "power" | "priority" | "accurrency" | "changeState" | "effectChance" | "statusEffect" | "category"
export type TypeStats ={
    hp: TypeMinMax
    attack: TypeMinMax
    specialAttack: TypeMinMax
    defense: TypeMinMax
    specialDefense: TypeMinMax
    speed: TypeMinMax
  }

export type TypeAbility ={
    trigger: string[]
    target: string[]
    effect: string[]
  }

export type TypeMove ={
  title: string
  names: string[]
  damageClass: TypeDamageClass[]
  types: TypePokemonType[]
  target: string[]
  power: {min:number,max:number,enable:boolean}
  priority: TypeMinMax
  accurrency:TypeMinMax
  changeState:TypeMinMax
  effectChance: TypeMinMax
  statusEffect:string[]
  category:string[]
}

export class ClassMove implements TypeMove{
  title: string =""
  names: string[] = []
  damageClass: TypeDamageClass[] =[]
  types: TypePokemonType[] =[]
  target: string[]   =[]
  power ={min:0,max:255, enable:true}
  priority: TypeMinMax  ={"min":-7,"max":5}
  accurrency:TypeMinMax ={"min":0,"max":100}
  changeState:TypeMinMax ={"min":0,"max":100}
  effectChance: TypeMinMax ={"min":0,"max":100}
  statusEffect:string[]  =[]
  category:string[]  =[]
}