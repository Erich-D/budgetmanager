import { useReducer } from "react"
import { budgetManagerReducer, BudgetManagerState } from "./budget-manager-reducer"
import { DisplayNumber } from "./display-banner";
import { PaidExpenseList } from "./paid-expense-list";
import { UnpaidExpenseList } from "./unpaid-expense-list";

const initialBudgetState: BudgetManagerState = {
    nameInput: "",
    costInput: 0,
    essentialInput: false,
    unpaidCosts: [],
    paidCosts: [],
    totalCosts: 0
}

export function BudgetManager(){

    const [budgetState, dispatch] = useReducer(budgetManagerReducer, initialBudgetState);

    return <>
        <h1>Budget Manager</h1>
        <h3>New Expense</h3>
        <label htmlFor="name">Expense Name</label>
        <input id="name" type="text" onChange={(event)=>dispatch({type:"SET_EXPENSE_NAME", payload:event.target.value})}/>
        <label htmlFor="cost">expense Cost</label>
        <input id="cost" type="number" onChange={(e)=>dispatch({type:"SET_EXPENSE_COST", payload:Number(e.target.value)})}/>
        <label htmlFor="essential">Essential</label>
        <input id="essential" type="checkbox" value='true' onChange={(e)=>dispatch({type:"SET_ESSENTIAL", payload:e.target.checked})}/>
        <button onClick={()=>dispatch({type:"ADD_EXPENSE"})}>Add New Expense</button>
        <h3>Unpaid Costs</h3>
        <UnpaidExpenseList unpaidExpense={budgetState.unpaidCosts} dispatch={dispatch}/>
        <h3>Paid Costs</h3>
        <PaidExpenseList paidExpense={budgetState.paidCosts} dispatch={dispatch}/>
        <DisplayNumber title="Total Costs" value={budgetState.totalCosts} prefix={"$"}/>
    </>
}