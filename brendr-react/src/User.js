import React from 'react';
import { useState, useContext} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {UserContext} from './App';

const userEndpoint = '/api/items/register'

function User() {

  const [itemTitle, setItemTitle] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemImageUrl, setItemImageUrl] = useState('');
  const user = useContext(UserContext);
  let history = useHistory();

  function submit(details) {
    axios.post(userEndpoint, details).then(res => {
      if (res.data.success === true){
        alert("Item request posted succesfully.");
        history.push('/Lend');
      }
      else{
        alert("Error");
      }
    })
  }

  return (
    <React.Fragment>
      <div className="signup-content">
        <h1>Borrow an item.</h1>
        <form action="/register" method="POST">
          <div className="form-group">
            <label htmlFor="email01">Title</label>
            <input
              className="form-control"
              type="text"
              name="title"
              placeholder="Write a short title to describe what you want to borrow."
              value={itemTitle}
              onInput={e => setItemTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact01">Item Description</label>
            <input
              className="form-control"
              type="text"
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
              name="itemImageUrl"
              placeholder="Link to an image of the item."
              value={itemImageUrl}
              onInput={e => setItemImageUrl(e.target.value)}
              required
            />
          </div>

          <div className="button-align">
            <button type="button" className="btn btn-outline-success" onClick={() => submit({
              name: itemTitle,
              description: itemDescription,
              imageURL: itemImageUrl,
              borrowlend: true,
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
