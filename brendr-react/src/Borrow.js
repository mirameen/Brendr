import photo1 from './photos/photo1.png';
import photo2 from './photos/photo2.png';
import photo3 from './photos/photo3.png';
import photo4 from './photos/photo4.png';
import photo5 from './photos/photo5.png';
import photo6 from './photos/photo6.png';

import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import {UserContext} from './App';
import axios from 'axios';

function makeCard(item) {
  return (
    <div className="col-md-4 col-sm-6">
      <div className="card">
        <img src={item.imageURL} className="card-img-top" alt="Item Image" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1613585815189-eafe895d233b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80'"/>
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">
            {item.description}
          </p>
          <a href="#" className="btn btn-outline-primary">
            TODO
          </a>
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
    for (var i = 0; i < items.length; ++i) {
      cards.push(makeCard(items[i]))
    }
    return cards
  }
}

function Borrow() {
  const userSpec = useContext(UserContext);

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!userSpec.currUser || userSpec.currUser.success !== true) {
      alert("Please login to access this page");
    }
    axios.get('/api/items/').then(res => setItems(res.data));
  }, [])

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
};

export default Borrow;
