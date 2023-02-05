

export type Expense = {
    id: number,
    name: string,
    cost: number,
    essential: boolean
}

export type BudgetManagerState = {
    editMode: boolean,
    editId: number,
    maxBudget: number,
    nameInput: string,
    costInput: number,
    essentialInput: boolean,
    essentialSortInput: boolean,
    costSortInput: boolean,
    unpaidCosts: Expense[],
    paidCosts: Expense[],
    totalCosts: number
}

type EditExpense = {type:"EDIT_EXPENSE", payload:number};
type SetMaxBudget = {type:"SET_MAX_BUDGET", payload:number};
type SetExpenseName = {type:"SET_EXPENSE_NAME", payload:string};
type SetExpenseCost = {type:"SET_EXPENSE_COST", payload:number};
type SetEssential = {type:"SET_ESSENTIAL", payload:boolean};
type SetEssentialSort = {type:"SET_ESSENTIAL_SORT", payload:boolean};
type SetCostSort = {type:"SET_COST_SORT", payload:boolean};
type AddExpense = {type:"ADD_EXPENSE"};
type DeleteUnpaidExpense = {type:"DELETE_UNPAID", payload:number};
type DeletePaidExpense = {type:"DELETE_PAID", payload:number};
type MarkExpensePaid = {type:"MARK_PAID", payload:number};
export type BudgetManagerAction = EditExpense | SetMaxBudget | SetExpenseName | SetExpenseCost | SetEssential | AddExpense | DeleteUnpaidExpense | DeletePaidExpense | MarkExpensePaid | SetEssentialSort | SetCostSort;

export function budgetManagerReducer(state: BudgetManagerState, action: BudgetManagerAction): BudgetManagerState{
    const newState: BudgetManagerState = JSON.parse(JSON.stringify(state));

    switch(action.type){

        case "EDIT_EXPENSE":{
            const expense: Expense | undefined = newState.unpaidCosts.find(expense => expense.id === action.payload);
            if(!expense){return newState}
            newState.editMode = true;
            newState.editId = expense.id;
            newState.costInput = expense.cost;
            newState.nameInput = expense.name;
            newState.essentialInput = expense.essential
            return newState
        }

        case "SET_MAX_BUDGET":{
            newState.maxBudget = action.payload;
            //budgetExceded();
            return newState;
        }

        case "SET_EXPENSE_NAME":{
            newState.nameInput = action.payload;
            return newState;
        }

        case "SET_EXPENSE_COST":{
            newState.costInput = action.payload;
            return newState;
        }

        case "SET_ESSENTIAL":{
            console.log(action.payload)
            newState.essentialInput = action.payload;
            return newState;
        }

        case "SET_ESSENTIAL_SORT":{
            console.log(action.payload)
            newState.essentialSortInput = action.payload;
            sortArrays();
            return newState;
        }

        case "SET_COST_SORT":{
            console.log(action.payload)
            newState.costSortInput = action.payload;
            sortArrays();
            return newState;
        }

        case "ADD_EXPENSE":{
            if(!newState.nameInput || !newState.costInput){alert("New Expense must include both name and amount!"); return newState;}
            if(newState.editMode){
                const expense: Expense | undefined = newState.unpaidCosts.find(expense => expense.id === newState.editId);
                if(!expense){return newState}
                expense.name = newState.nameInput;
                expense.cost = newState.costInput;
                expense.essential = newState.essentialInput;
            }else{
                const expense: Expense = {id: Math.random(), name: newState.nameInput, cost: newState.costInput, essential: newState.essentialInput};
                newState.unpaidCosts.push(expense);
            }
            sortArrays();
            updateTotalCosts(newState);
            budgetExceded();
            clearInputs();
            return newState;
        }

        case "DELETE_UNPAID":{
            newState.unpaidCosts = newState.unpaidCosts.filter(expense => expense.id !== action.payload);
            sortArrays();
            updateTotalCosts(newState);
            budgetExceded();
            return newState;
        }

        case "DELETE_PAID":{
            newState.paidCosts = newState.paidCosts.filter(expense => expense.id !== action.payload);
            sortArrays();
            updateTotalCosts(newState);
            budgetExceded();
            return newState;
        }

        case "MARK_PAID":{
            const expense: Expense | undefined = newState.unpaidCosts.find(expense => expense.id === action.payload);
            if(!expense){return newState}
            newState.unpaidCosts = newState.unpaidCosts.filter(expense => expense.id !== action.payload);
            newState.paidCosts.push(expense);
            sortArrays();
            return newState;
        }
    }

    function updateTotalCosts(state: BudgetManagerState){
        state.totalCosts = 0;
        state.paidCosts.forEach((e)=>newState.totalCosts+=e.cost)
        state.unpaidCosts.forEach((e)=>newState.totalCosts+=e.cost)
    }

    function sortByEssential(array: Expense[]){
        array.sort((a,b) => Number(b.essential) - Number(a.essential))
    }

    function sortByCost(array: Expense[]){
        array.sort((a,b) => b.cost - a.cost)
    }

    function sortByEssentialAndCost(array: Expense[]){
        sortByCost(array);
        sortByEssential(array);
    }

    function sortArrays(){
        if(newState.essentialSortInput && newState.costSortInput){
            sortByEssentialAndCost(newState.unpaidCosts);
            sortByEssentialAndCost(newState.paidCosts);
        }else if(newState.essentialSortInput){
            sortByEssential(newState.unpaidCosts);
            sortByEssential(newState.paidCosts);
        }else if(newState.costSortInput){
            sortByCost(newState.unpaidCosts);
            sortByCost(newState.paidCosts);
        }
    }

    function budgetExceded(){
        if(newState.totalCosts > newState.maxBudget){alert("Maximum budget has been exceeded! Consider reducing non essential costs.")}
    }

    function clearInputs(){
        newState.editId = 0;
        newState.nameInput = '';
        newState.costInput = 0;
        newState.essentialInput = false;
        newState.editMode = false;
    }
}