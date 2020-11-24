import React, { useState } from 'react';
import { withAppConsumer} from './Context';
import { uid } from 'uid';

const defaultValue   = () => {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    return year + "-" + month + "-" + day;  
}

function AddNew({context}) {
    const [type, setType] = useState("-");
    const [amount, setamount] = useState("0");
    const [note, setnote] = useState("");
    const [category, setcategory] = useState("");
    const [date, setDate] = useState(defaultValue);
    const [show, setshow] = useState(false)

    const {expensesCategories, incomeCategories, addNewEntry} = context

    const options  = type === "+" ? incomeCategories : expensesCategories;

    const categories = options?.map(option => {
        return(
           <option key={option.name} value={option.name}> {option.name}</option>
        )
    })

    const handleAdd = () => {
        const newEntry = {
           type,
           amount: parseInt(amount),
           description: note, 
           category,
           date,
           id: uid() 
        }
        setshow(false)
        setamount("")
        setnote("")
        setcategory("")
       addNewEntry(newEntry)

    }

    return (
        <div className="addNew">
            <button className="addnew__button" onClick={ () => setshow(true)} data-toggle="modal" data-target="#exampleModal"><i className="fas fa-plus"></i></button>
            <div  className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                {show && 
                  <div className="modal-dialog"  >
                  <div className="modal-content">
                  <div className="modalHeader">
                      <h5 className="modal-title" id="exampleModalLabel">New Entry</h5>
                      <div className="type__button">
                          <div className="form-check form-check-inline expensesRadio">
                              <input readOnly onClick={e => setType(e.target.value)} checked className="form-check-input" type="radio" name="inlineRadioOptions" id="expense" value="-"/>
                              <label className="form-check-label" htmlFor="inlineRadio1">Expenses</label>
                          </div>
                          <div className="form-check form-check-inline incomeRadio">
                              <input readOnly onClick={e => setType(e.target.value)} className="form-check-input" type="radio" name="inlineRadioOptions" id="income" value="+"/>
                              <label className="form-check-label" htmlFor="inlineRadio2">Income</label>
                          </div>
                      </div>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                      </button>
  
                  </div>
                  <div className="modal-body">
                      <div className="form-group row">
                           <label  className="col-sm-1 col-form-label">$</label>
                           <div className="col-sm-10">
                                 <input value={amount} onChange={e => setamount(e.target.value)} type="number" className="form-control" placeholder="00.00"></input>
                           </div>   
                      </div>
                      <div className="form-group row">
                           <label  className="col-sm-1 col-form-label">
                               <i className="fa fa-calendar" aria-hidden="true"></i>
                           </label>
                           <div className="col-sm-10">
                                <input value={date} onChange={e => setDate(e.target.value)} className="form-control" type="date"></input>
                           </div>   
                      </div>
                      <div className="form-group row">
                           <label  className="col-sm-1 col-form-label">
                              <i className="fa fa-tags" aria-hidden="true"></i>
                           </label>
                           <div className="col-sm-10">
                                <input value={note} onChange={e => setnote(e.target.value)} placeholder="Add Note" className="form-control" type="text"></input>
                           </div>   
                      </div>
                      <div className="form-group row">
                           <label  className="col-sm-1 col-form-label">
                             <i className="fa fa-th-large" aria-hidden="true"></i>
                           </label>
                           <label  className="col-sm-4 col-form-label">
                             Category
                           </label>
                           <div className="col-sm-6">
                           <select value={category} onChange={e => setcategory(e.target.value)} className="form-control">
                             <option > Select Category</option>
                               {categories}
                         </select>
                           </div>   
                      </div>


                  </div>
                  <div className="modal-footer">
                      <button type="button" className="btn btn-danger" onClick={() => setshow(false)}>Cancel</button>
                      <button onClick={handleAdd} type="button" className="btn btn-info" data-dismiss="modal">Add</button>
                  </div>
                  </div>
              </div>
                }
            
            </div>
        </div>
    )
}

export default withAppConsumer(AddNew)
