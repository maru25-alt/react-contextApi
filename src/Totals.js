import React from 'react'
import "./Total.css"
import { withAppConsumer} from './Context';
import AddNew from './AddNew'

function Totals({context}) {

    const {total, totalExpenses, totalIncome} = context
    return (
        <div className="totalCard mycard">
            <div className="totalCard__balances">
                 <h4>Balance</h4>
                 <h3><strong> ${total} </strong></h3>
                 <div className="totalCard_expenditure">
                     <div className="income">
                         <h6>Total Income</h6>
                         <strong>${totalIncome}</strong>
                     </div>
                     <div className="expenses">
                         <h6>Total Expenses</h6>
                         <strong>${totalExpenses}</strong>
                     </div>
                 </div>
            </div>
            <div className="totalCard__addnew">
                <AddNew/>
            </div>
        </div>
    )
}

export default withAppConsumer(Totals)
