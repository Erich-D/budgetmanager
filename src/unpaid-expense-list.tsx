import { Expense, BudgetManagerAction } from "./budget-manager-reducer";


type unpaidExpenseProps = {
    unpaidExpense: Expense[];
    dispatch: React.Dispatch<BudgetManagerAction>
}

export function UnpaidExpenseList(props: unpaidExpenseProps){
    return(
        <ul>
            {props.unpaidExpense.map(ex => 
            <li>
                <button onClick={()=>props.dispatch({type:"DELETE_UNPAID", payload:ex.id})}>Delete</button>
                {`Expense Name: ${ex.name} Expense Cost: $${ex.cost} Is Essential: ${ex.essential}`}
                <button onClick={()=>props.dispatch({type:"MARK_PAID", payload:ex.id})}>Mark Paid</button>
            </li>)}
        </ul>
    )
}