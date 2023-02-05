import { BudgetManagerState, budgetManagerReducer } from "../budget-manager-reducer"


test("ADD Expense", () => {
    const testState: BudgetManagerState = {
        editMode: false,
        editId: 0,
        maxBudget: 2500,
        nameInput: "power",
        costInput: 250,
        essentialInput: true,
        essentialSortInput: false,
        costSortInput: false,
        unpaidCosts: [],
        paidCosts: [],
        totalCosts: 0
    }

    const nextState = budgetManagerReducer(testState, {type:"ADD_EXPENSE"});
    expect(nextState.unpaidCosts.length).toBe(1);
    expect(nextState.unpaidCosts[0].name).toBe("power");
    expect(nextState.totalCosts).toBe(250)
})

test("DELETE Unpaid", () => {
    const testState: BudgetManagerState = {
        editMode: false,
        editId: 0,
        maxBudget: 2500,
        nameInput: "power",
        costInput: 250,
        essentialInput: true,
        essentialSortInput: false,
        costSortInput: false,
        unpaidCosts: [{id:100, name: "rent", cost: 1250, essential: true}],
        paidCosts: [{id:200, name: "phone", cost: 250, essential: false}],
        totalCosts: 1500
    }

    const nextState = budgetManagerReducer(testState, {type:"DELETE_UNPAID", payload:100});
    expect(nextState.unpaidCosts.length).toBe(0);
    expect(nextState.paidCosts.length).toBe(1);
    expect(nextState.totalCosts).toBe(250) 
})

test("DELETE Paid", () => {
    const testState: BudgetManagerState = {
        editMode: false,
        editId: 0,
        maxBudget: 2500,
        nameInput: "power",
        costInput: 250,
        essentialInput: true,
        essentialSortInput: false,
        costSortInput: false,
        unpaidCosts: [{id:100, name: "rent", cost: 1250, essential: true}],
        paidCosts: [{id:200, name: "phone", cost: 250, essential: false}],
        totalCosts: 1500
    }

    const nextState = budgetManagerReducer(testState, {type:"DELETE_PAID", payload:200});
    expect(nextState.unpaidCosts.length).toBe(1);
    expect(nextState.paidCosts.length).toBe(0);
    expect(nextState.totalCosts).toBe(1250) 
})

test("MARK Paid", () => {
    const testState: BudgetManagerState = {
        editMode: false,
        editId: 0,
        maxBudget: 2500,
        nameInput: "power",
        costInput: 250,
        essentialInput: true,
        essentialSortInput: false,
        costSortInput: false,
        unpaidCosts: [{id:100, name: "rent", cost: 1250, essential: true}],
        paidCosts: [{id:200, name: "phone", cost: 250, essential: false}],
        totalCosts: 1500
    }

    const nextState = budgetManagerReducer(testState, {type:"MARK_PAID", payload:100});
    expect(nextState.unpaidCosts.length).toBe(0);
    expect(nextState.paidCosts.length).toBe(2);
    expect(nextState.totalCosts).toBe(1500) 
})