import React, { Component } from 'react'

const AppContext = React.createContext()

 class ContextProvider extends Component {
    state = {
        entries: [],
        total: 0,
        totalExpenses: 0,
        totalIncome: 0
    }

    calculateValues = (arr) => {
        let total 
        switch (arr.length) {
            case 0:
                total = 0
                break;
            case 1:
                total = arr[0].amount   
                break;
            default:
                total = arr.reduce((sum , num) => {
                     return  sum.amount + num.amount
                 })
        }
        return total
    }

    calculateTotal = (entries) => {
        let expenses = entries.filter( e => e.type === "-")
        let income = entries.filter(e => e.type === "+")

        let totalExpenses = this.calculateValues(expenses);
        let totalIncome = this.calculateValues(income);
        let total = totalIncome - totalExpenses;
        this.setState({
            total,
            totalExpenses,
            totalIncome
        })
        console.log(totalExpenses)
    }

    componentDidMount(){
       this.calculateTotal(this.state.entries)
    }
    
    addNewEntry = (value) => {
        const newEntry =  [ value, ...this.state.entries]
       this.setState({
           entries:newEntry
       })
        this.calculateTotal(newEntry)
    }

    deleteEntry = (id) => {
        const newEntry =  this.state.entries.filter(entry => entry.id !== id)
        this.setState({
            entries: newEntry
        });
        this.calculateTotal(newEntry)
    }

    editEntry = (value) => {
         //let oldEntry = this.state.entries.find(entry => entry.id === value.id);
         let otherEntry = this.state.entries.filter(entry => entry.id !== value.id);
         let newEntries = [value, ...otherEntry]
         this.setState({
            entries: newEntries
        })
        this.calculateTotal(newEntries)
    }

    expensesCategories = [
        {
            icon: "fa fa-bullseye",
            name: "other"
        },
        {
            icon: "fas fa-shopping-bag",
            name: "shopping"
        },
        {
            icon: "fas fa-shopping-basket",
            name: "grocery"
        },
        {
            icon: "fa fa-bus",
            name: "transport"
        },
        {
            icon: "fa fa-building",
            name: "housing"
        },
        {
            icon: "fa fa-mobile",
            name: "phone and internet"
        },
       
    ]

    incomeCategories =[
        {
            icon: "fa fa-credit-card",
            name: "salary"
        },
        {
            icon: "fa fa-briefcase",
            name: "business"
        },
        {
            icon: "fa fa-bullseye",
            name: "other"
        },
        {
            icon: "fa fa-money",
            name: "extra income"
        },
    ]
    
    render() {
        return (
           <AppContext.Provider
           value={{
               ...this.state,
               incomeCategories: this.incomeCategories,
               expensesCategories: this.expensesCategories,
               addNewEntry: this.addNewEntry,
               deleteEntry: this.deleteEntry,
               editEntry: this.editEntry
           }}>
               {this.props.children}
           </AppContext.Provider>
        )
    }
}

const AppConsumer = AppContext.Consumer;

export function withAppConsumer(Component){
    return function ConsumerWrapper(props){
        return(
            <AppConsumer>
                {value => <Component {...props} context={value}/>}
            </AppConsumer>
        )
    }
}


export { ContextProvider, AppConsumer, AppContext}



