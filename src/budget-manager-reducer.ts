

export type Expense = {
    id: number,
    name: string,
    cost: number,
    essential: boolean
}

export type BudgetManagerState = {
    nameInput: string,
    costInput: number,
    essentialInput: boolean,
    unpaidCosts: Expense[],
    paidCosts: Expense[],
    totalCosts: number
}

type SetExpenseName = {type:"SET_EXPENSE_NAME", payload:string};
type SetExpenseCost = {type:"SET_EXPENSE_COST", payload:number};
type SetEssential = {type:"SET_ESSENTIAL", payload:string | undefined};
type AddExpense = {type:"ADD_EXPENSE"};
type DeleteUnpaidExpense = {type:"DELETE_UNPAID", payload:number};
type DeletePaidExpense = {type:"DELETE_PAID", payload:number};
type MarkExpensePaid = {type:"MARK_PAID", payload:number};
type BudgetManagerAction = SetExpenseName | SetExpenseCost | SetEssential | AddExpense | DeleteUnpaidExpense | DeletePaidExpense | MarkExpensePaid;

export function budgetManagerReducer(state: BudgetManagerState, action: BudgetManagerAction): BudgetManagerState{
    const newState: BudgetManagerState = JSON.parse(JSON.stringify(state));

    switch(action.type){

        case "SET_EXPENSE_NAME":{
            newState.nameInput = action.payload;
            return newState;
        }

        case "SET_EXPENSE_COST":{
            newState.costInput = action.payload;
            return newState;
        }

        case "SET_ESSENTIAL":{
            newState.essentialInput = action.payload ? true:false;
            return newState;
        }

        case "ADD_EXPENSE":{
            const expense: Expense = {id: Math.random(), name: newState.nameInput, cost: newState.costInput, essential: newState.essentialInput};
            newState.unpaidCosts.push(expense)
            return newState;
        }

        case "DELETE_UNPAID":{
            newState.unpaidCosts = newState.unpaidCosts.filter(expense => expense.id !== action.payload);
            return newState;
        }

        case "DELETE_PAID":{
            newState.paidCosts = newState.paidCosts.filter(expense => expense.id !== action.payload);
            return newState;
        }

        case "MARK_PAID":{
            const expense: Expense | undefined = newState.unpaidCosts.find(expense => expense.id === action.payload);
            if(!expense){return newState}
            newState.unpaidCosts = newState.unpaidCosts.filter(expense => expense.id !== action.payload);
            newState.paidCosts.push(expense);
            return newState;
        }
    }
}