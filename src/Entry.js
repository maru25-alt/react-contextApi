import React, {useState, useEffect} from 'react';
import {Modal, Button} from 'react-bootstrap';
import { withAppConsumer} from './Context';

function Entry({data, context}) {
  const [show, setShow] = useState(false);
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const {expensesCategories, incomeCategories,  deleteEntry, editEntry} = context;
  const options  = data.type === "+" ? incomeCategories : expensesCategories;

  const categories = options?.map(option => {
        return(
           <option key={option.name} value={option.name}> {option.name}</option>
        )
    })

  useEffect(() => {
      setNote(data.description);
      setCategory(data.category);
      
      setAmount(data.amount)
  }, [data])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    deleteEntry(data.id)
    setShow(false)
  }

  const handleEditEntry = () => {
    const newEntry = {
      type: data.type,
      amount: parseInt(amount),
      description: note, 
      category,
      date: data.date,
      id: data.id 
   }
    editEntry(newEntry)
    setShow(false)
  }

   
    return (
        <>
        <button className="mycard entry" onClick={handleShow}>
            <div className={` ${data.type === "+" ? " entry__type income__icon": " entry__type income__expenses"}`}>
               <i className="fa fa-bullseye fa-2x"></i>
            </div>
            <div className="entry__content">
                <h5 className="date"> {data?.date}</h5>
                <h6 className="category">{data?.category}</h6>
                <h5>{data?.description}</h5>
                <h3> {data?.type} ${data?.amount}</h3>
            </div>
        </button>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                      <div className="form-group row">
                           <label  className="col-sm-1 col-form-label">$</label>
                           <div className="col-sm-10">
                                 <input value={amount} onChange={e => setAmount(e.target.value)} type="number" className="form-control" placeholder="00.00"></input>
                           </div>   
                      </div>
                     
                      <div className="form-group row">
                           <label  className="col-sm-1 col-form-label">
                              <i className="fa fa-tags" aria-hidden="true"></i>
                           </label>
                           <div className="col-sm-10">
                                <input value={note} onChange={e => setNote(e.target.value)} placeholder="Add Note" className="form-control" type="text"></input>
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
                              <select value={category} onChange={e => setCategory(e.target.value)} className="form-control">
                                  {categories}
                             </select>
                           </div>   
                      </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDelete}>
           Delete
          </Button>
          <Button variant="info" onClick={handleEditEntry}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}

export default withAppConsumer(Entry)
