export class ClassStats{
    hp:{operator: "MinMax",value: number[]} = {operator: "MinMax", value:[]}
    attack:{operator: "MinMax",value: number[]} = {operator: "MinMax", value:[]}
    specialAttack:{operator: "MinMax",value: number[]} = {operator: "MinMax", value:[]}
    defense:{operator: "MinMax",value: number[]} = {operator: "MinMax", value:[]}
    specialDefense:{operator: "MinMax",value: number[]} = {operator: "MinMax", value:[]}
    speed:{operator: "MinMax",value: number[]} = {operator: "MinMax", value:[]}
  }

export type TypeStatsNames =  keyof ClassStats
