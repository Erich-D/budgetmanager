


export function BudgetManager(){



    return <>
        <h1>Budget Manager</h1>
        <h3>New Expense</h3>
        <label htmlFor="name">Expense Name</label>
        <input id="name" type="text" />
        <label htmlFor="cost">expense Cost</label>
        <input id="cost" type="number" />
        <label htmlFor="essential">Essential</label>
        <input id="essential" type="checkbox" value='true'/>
        <button>Add New Expense</button>
        <h3>Unpaid Costs</h3>
        <ul>
            <li><button>Delete</button> costs <button>Mark Paid</button></li>
        </ul>
        <h3>Paid Costs</h3>
        <ul>
            <li><button>Delete</button> costs</li>
        </ul>
        <h3>Total Costs</h3>
        <h5>total here</h5>
    </>
}