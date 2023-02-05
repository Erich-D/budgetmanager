import { useReducer } from "react"
import { budgetManagerReducer, BudgetManagerState } from "./budget-manager-reducer"
import { DisplayNumber } from "./display-banner";
import { PaidExpenseList } from "./paid-expense-list";
import { UnpaidExpenseList } from "./unpaid-expense-list";

const initialBudgetState: BudgetManagerState = {
    editMode: false,
    editId: 0,
    maxBudget: 2500,
    nameInput: "",
    costInput: 0,
    essentialInput: false,
    essentialSortInput: false,
    costSortInput: false,
    unpaidCosts: [
        {id:Math.random(),name:"TV",cost:200,essential:false},
        {id:Math.random(),name:"Power",cost:45,essential:true},
        {id:Math.random(),name:"Phone",cost:145,essential:false},
        {id:Math.random(),name:"Car Payment",cost:400,essential:true},
        {id:Math.random(),name:"Entertainment",cost:120,essential:false},
        {id:Math.random(),name:"Rent",cost:1145,essential:true}
    ],
    paidCosts: [],
    totalCosts: 2055
}

export function BudgetManager(){

    const [budgetState, dispatch] = useReducer(budgetManagerReducer, initialBudgetState);

    return <>
        <h1>Budget Manager</h1>
        <h3>Set Budget</h3>
        <label htmlFor="budget">Max Budget</label>
        <input id="budget" type="number" value={budgetState.maxBudget} onChange={(e)=>dispatch({type:"SET_MAX_BUDGET", payload:Number(e.target.value)})}/>
        <h3>{budgetState.editMode ? `Edit Expense ${budgetState.nameInput}`:'New Expense'}</h3>
        <label htmlFor="name">Expense Name</label>
        <input id="name" type="text" value={budgetState.nameInput} onChange={(event)=>dispatch({type:"SET_EXPENSE_NAME", payload:event.target.value})}/>
        <label htmlFor="cost">expense Cost</label>
        <input id="cost" type="number" value={budgetState.costInput} onChange={(e)=>dispatch({type:"SET_EXPENSE_COST", payload:Number(e.target.value)})}/>
        <label htmlFor="essential">Essential</label>
        <input id="essential" type="checkbox" checked={budgetState.essentialInput} onChange={(e)=>dispatch({type:"SET_ESSENTIAL", payload:e.target.checked})}/>
        <button onClick={()=>dispatch({type:"ADD_EXPENSE"})}>{budgetState.editMode ? 'Edit Expense':'Add New Expense'}</button>
        <label htmlFor="essentialsort">Sort By Essential</label>
        <input id="essentialsort" type="checkbox" value='true' onChange={(e)=>dispatch({type:"SET_ESSENTIAL_SORT", payload:e.target.checked})}/>
        <label htmlFor="costsort">Sort By Cost</label>
        <input id="costsort" type="checkbox" value='true' onChange={(e)=>dispatch({type:"SET_COST_SORT", payload:e.target.checked})}/>
        <h3>Unpaid Costs</h3>
        <UnpaidExpenseList unpaidExpense={budgetState.unpaidCosts} dispatch={dispatch}/>
        <h3>Paid Costs</h3>
        <PaidExpenseList paidExpense={budgetState.paidCosts} dispatch={dispatch}/>
        <DisplayNumber title="Total Costs" value={budgetState.totalCosts} prefix={"$"} overMax={budgetState.totalCosts>budgetState.maxBudget}/>
    </>
}