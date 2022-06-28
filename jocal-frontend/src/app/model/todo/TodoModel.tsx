export enum TodoPrio {
    LOW = "Low",
    MED = "Medium",
    HIGH = "High",
}

export enum TodoPrioNumber {
    LOW = 2,
    MED = 1,
    HIGH = 0,
}



export interface ITodo {
    id: number,
    description: string;
    prio: number;
}




export const NullTodo: ITodo = {description: "", id: -1, prio: TodoPrioNumber.HIGH}

