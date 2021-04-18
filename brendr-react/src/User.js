import React, { useState, useContext, useEffect} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {UserContext} from './App';
import {RequestIDContext} from './App';
import person4 from './photos/person4.png';

const itemEndpoint = '/api/items/register';
const requestEndpoint = '/api/requests/decision';

function User() {

  const [itemTitle, setItemTitle] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemImageUrl, setItemImageUrl] = useState('');
  const [itemRequestType, setItemRequestType] = useState(false);
  const user = useContext(UserContext);
  const requestID = useContext(RequestIDContext);
  const [itemHistory, setItemHistory] = useState([]);
  const [blRequests, setBlRequests] = useState([]);
  let history = useHistory();

  useEffect(() => {
    axios.get('/api/users/'+ user.currUser.user._id).then(res => setItemHistory(res.data.itemHistory));
    axios.get('/api/requests/'+ user.currUser.user._id).then(res => setBlRequests(res.data));
  },[])

  function submit(details) {
    console.log(details);
    axios.post(itemEndpoint, details).then(res => {
      if (res.data.success === true){
        alert("Item request posted succesfully.");
        history.push('/lend');
      }
      else{
        alert("Error");
      }
    })
  }

  function submitRequest(details) {
    axios.post(requestEndpoint, details).then(res => {
      if (res.data.success === true){
        alert("Your response has been succesfully recorded, Borrower will contact you soon");
        history.push('/');
      }
      else{
        alert("Error");
      }
    })
  }

  function gotoComplaint(request){
    requestID.setcurrRequestID(request._id);
    history.push('/complaint');
  }

  function makeCardItem(item) {
    return (
      <div className="col-md-4 col-sm-6 d-flex align-items-stretch">
        <div className="card">
          <img src={item.imageURL} className="card-img-top" alt="Item Image"/>
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <p className="card-text">
              {item.description}
            </p>
            {item.borrowlend === true?<p><span className="badge badge-primary">Borrow request</span></p>:<p><span className="badge badge-warning">Lend request</span></p>}
          </div>
        </div>
      </div>
    );
  }
  
  function makeCardsItem(items) {
    console.log(items);
    if (items.length == 0) {
      return <div></div>
    } else {
      console.log(items[0]);
      var cards = []
      for (const item of items) {
        cards.push(makeCardItem(item));
      }
      return cards
    }
  }

  function makeCardRequest(item) {
    if(item.requestType === true){
      return (
        <div className="card mt-4">
          <div className="card-header">
            <span className="badge badge-primary">Borrow Request</span>
          </div>
          <div className="card-body">
            <h5 className="card-title">{item.itemID.name}</h5>
            <p className="card-text">Request Received From : {item.sendUserID.firstname} to <b>Borrow</b> the above item from you</p>
            {item.status === "Processing"?<button type="button" className="btn btn-success" onClick={() => submitRequest({
              sendUserID:item.sendUserID._id,
              itemID:item.itemID._id,
              receiveUserID:item.receiveUserID._id,
              status:"Accepted"
            })}>Accept</button>:<div className="d-flex justify-content-between align-items-center">
              <span className="badge badge-info">{item.status}</span>
              {item.status === "Accepted"?<button type="button" className="btn btn-warning" onClick={() => gotoComplaint(item)}>Complain</button>:<span></span>}
              </div>
            }
            {item.status === "Processing"?<button type="button" className="btn btn-danger ml-3" onClick={() => submitRequest({
              sendUserID:item.sendUserID._id,
              itemID:item.itemID._id,
              receiveUserID:item.receiveUserID._id,
              status:"Rejected"
            })}>Reject</button>:<span></span>}
          </div>
        </div>
      );
    }

    return (
      <div className="card mt-4">
        <div className="card-header">
          <span className="badge badge-warning">Lend Request</span>
        </div>
        <div className="card-body">
          <h5 className="card-title">{item.itemID.name}</h5>
          <p className="card-text">Request sent to : {item.sendUserID.firstname}, asking him to <b>Lend</b> the above item</p>
          {item.status === "Accepted"?<p className="card-text">You may contact the lender now, Contact : {item.sendUserID.mobile}</p>:<span></span>}
          <div  className="d-flex justify-content-between align-items-center">
            <p className="card-text">Current Status : <span className="badge badge-info">{item.status}</span></p>
            {item.status === "Accepted"?<button type="button" className="btn btn-warning" onClick={() => gotoComplaint(item)}>Complain</button>:<span></span>}
          </div>
        </div>
      </div>
    );
  }
  
  function makeCardsRequest(items) {
    console.log(items);
    if (items.length == 0) {
      return <div></div>
    } else {
      console.log(items[0]);
      var cards = []
      for (const item of items) {
        cards.push(makeCardRequest(item));
      }
      return cards
    }
  }

  return (
    <React.Fragment>
      <div className="post-content">
        <div className="alert alert-info mt-4" role="alert">
          <b>Basic Details</b>
        </div>
        <div className="user-details">
          <div className="left">
            <img src={person4} alt="person img"/>
          </div>
          <div className="right">
            <p><b>First Name</b> : {user.currUser.user.firstname}</p>
            <p><b>Last Name</b> : {user.currUser.user.lastname}</p>
            <p><b>Email</b> : {user.currUser.user.email}</p>
            <p><b>Mobile</b> : {user.currUser.user.mobile}</p>
          </div>
        </div>

        <div className="alert alert-warning mt-5" role="alert">
          <b>Lend/Borrow Requests</b>
        </div>
        <div>
          {makeCardsRequest(blRequests)}
        </div>

        <div className="alert alert-success mt-5" role="alert">
          <b>Item History</b>
        </div>
        <div className="row text-center">
          {makeCardsItem(itemHistory)}
        </div>

      </div>

      <div className="signup-content">
        <h1>Item Request</h1>
        <form action="/register" method="POST">
          <div className="form-group">
            <label htmlFor="itemname">Item Name</label>
            <input
              className="form-control"
              type="text"
              id="itemname"
              name="title"
              placeholder="Write a short title to describe what you want to borrow."
              value={itemTitle}
              onInput={e => setItemTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="itemdescr">Item Description</label>
            <input
              className="form-control"
              type="text"
              id="itemdescr"
              name="contact"
              placeholder="You can write a longer description with more details here."
              value={itemDescription}
              onInput={e => setItemDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="itemImageUrl">Image URL</label>
            <input
              className="form-control"
              type="text"
              id="itemImageUrl"
              name="itemImageUrl"
              placeholder="Link to an image of the item."
              value={itemImageUrl}
              onInput={e => setItemImageUrl(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="itemRequestType">Request Type</label>
            <select className="custom-select" value={itemRequestType}  onInput={e => setItemRequestType(e.target.value)}>
              <option value="true">Borrow</option>
              <option value="false">Lend</option>
            </select>
          </div>

          <div className="button-align">
            <button type="button" className="btn btn-outline-success" onClick={() => submit({
              name: itemTitle,
              description: itemDescription,
              imageURL: itemImageUrl,
              borrowlend: (itemRequestType === "true"),
              inUse: true,
              email: user.currUser.user.email
            })}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default User;
