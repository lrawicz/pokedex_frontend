export class ClassStats{
    hp:{operator: "MinMax",value: number[]} = {operator: "MinMax", value:[0,255]}
    attack:{operator: "MinMax",value: number[]} = {operator: "MinMax", value:[0,255]}
    specialAttack:{operator: "MinMax",value: number[]} = {operator: "MinMax", value:[0,255]}
    defense:{operator: "MinMax",value: number[]} = {operator: "MinMax", value:[0,255]}
    specialDefense:{operator: "MinMax",value: number[]} = {operator: "MinMax", value:[0,255]}
    speed:{operator: "MinMax",value: number[]} = {operator: "MinMax", value:[0,255]}
  }

export type TypeStatsNames =  keyof ClassStats
