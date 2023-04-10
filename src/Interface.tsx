export  type TypeStatValues={
    min: number ;
    max: number;
  }
export type TypeStatsNames ="hp"| "attack" | "specialAttack"  | "defense" | "specialDefense" | "speed"

export type TypeStats ={
    hp: TypeStatValues
    attack: TypeStatValues
    specialAttack: TypeStatValues
    defense: TypeStatValues
    specialDefense: TypeStatValues
    speed: TypeStatValues
  }

export type TypeAbility ={
    trigger: string[]
    target: string[]
    effect: string[]
  }