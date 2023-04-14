
export type TypeDamageClass = "physical" | "special" | "status"
export type TypeCondition = "burned" | "frozen" | "asleep"


export interface moveProperty { enable:boolean, value:any}



export class ClassAbility{
  trigger: {value: string[], operator:"OneOf" | "ContainsAll"} = {value:[],operator:"ContainsAll"}
  target: {value: string[], operator:"OneOf" | "ContainsAll"} = {value:[],operator:"ContainsAll"}
  effect: {value: string[], operator:"OneOf" | "ContainsAll"} = {value:[],operator:"ContainsAll"}
}
export class ClassStats{
  hp:{operator: "MinMax",value: number[]} = {operator: "MinMax", value:[0,255]}
  attack:{operator: "MinMax",value: number[]} = {operator: "MinMax", value:[0,255]}
  specialAttack:{operator: "MinMax",value: number[]} = {operator: "MinMax", value:[0,255]}
  defense:{operator: "MinMax",value: number[]} = {operator: "MinMax", value:[0,255]}
  specialDefense:{operator: "MinMax",value: number[]} = {operator: "MinMax", value:[0,255]}
  speed:{operator: "MinMax",value: number[]} = {operator: "MinMax", value:[0,255]}
}

export type TypeStatsNames =  keyof ClassStats
