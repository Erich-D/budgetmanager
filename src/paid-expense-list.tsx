import { Expense, BudgetManagerAction } from "./budget-manager-reducer";


type paidExpenseProps = {
    paidExpense: Expense[];
    dispatch: React.Dispatch<BudgetManagerAction>
}

export function PaidExpenseList(props: paidExpenseProps){
    return(
        <ul>
            {props.paidExpense.map(ex => 
            <li>
                <button onClick={()=>props.dispatch({type:"DELETE_PAID", payload:ex.id})}>Delete</button>
                {`Expense Name: ${ex.name} Expense Cost: $${ex.cost} Is Essential: ${ex.essential}`}
            </li>)}
        </ul>
    )
}
//onClick={()=>props.dispatch({type:"DELETE_PAID", payload:ex.id})}
//{props.dispatch ? <button onClick={()=>props.dispatch({type:"DELETE_PAID", payload:ex.id})}>Delete</button>:<button>Delete</button>}