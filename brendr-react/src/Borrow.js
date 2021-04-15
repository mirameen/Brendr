import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import { UserContext } from './App';
import axios from 'axios';

const requestEndpoint = '/api/requests/register';

function Borrow() {
  const userSpec = useContext(UserContext);

  const [items, setItems] = useState([]);
  let history = useHistory();

  useEffect(() => {
    if (!userSpec.currUser || userSpec.currUser.success !== true) {
      alert("Please login to access this page");
    }
    axios.get('/api/items/').then(res => setItems(res.data));
  }, [])

  function submit(details) {
    axios.post(requestEndpoint, details).then(res => {
      if (res.data.success === true){
        alert("Your request has been sent to the lender, the lender will confirm soon");
        history.push('/user');
      }
      else if(res.data.success === false){
        alert("You have already requested the lender, please wait till the lender responds");
      }
      else{
        alert("Error");
      }
    })
  }

  function makeCard(item) {
    return (
      <div className="col-md-4 col-sm-6 d-flex align-items-stretch">
        <div className="card">
          <img src={item.imageURL} className="card-img-top" alt="Item Image"/>
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <p className="card-text">
              {item.description}
            </p>
            <p className="card-text">
              Contact : {item.userID.mobile} for more details
            </p>
            <button type="button" className="btn btn-outline-primary" onClick = {() => submit({
              borrowReq: {
                requestType : true,
                itemID : item._id,
                sendUserID : userSpec.currUser.user._id,
                receiveUserID : item.userID._id,
                status : "Processing"
              },
              lendReq: {
                requestType : false,
                itemID : item._id,
                sendUserID : item.userID._id,
                receiveUserID : userSpec.currUser.user._id,
                status : "Processing"
              }
            })}>
              Borrow
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  function makeCards(items) {
    if (items.length == 0) {
      return <div></div>
    } else {
      var cards = []
      for (const item of items) {
        if(item.borrowlend === false && item.userID._id!=userSpec.currUser.user._id) cards.push(makeCard(item));
      }
      return cards
    }
  }

  if (!userSpec.currUser || userSpec.currUser.success !== true) {
    return <Redirect to = "/login" />;
  } else {
    return (
      <div className="post-content">
        <div className="row text-center">
          {makeCards(items)}
        </div>
      </div>
    );
  }
}

export default Borrow;
