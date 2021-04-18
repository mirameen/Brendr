import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {RequestIDContext} from './App';

const complaintEndpoint = '/api/conflicts/register';

function Complaint() {

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const requestID = useContext(RequestIDContext);
    let history = useHistory();
  
    function submit(details) {
        console.log(details);
      axios.post(complaintEndpoint, details).then(res => {
        if(res.data.success === true){
          alert("Complaint Successfully Registered");
          history.push('/user');
        }
        else{
          alert("Register again");
        }
      })
    }
  
    return (
      <React.Fragment>
        <div className="signup-content">
          <h1>Complaint Form</h1>
          <form action="/register" method="POST">
            <div className="form-group">
                <label htmlFor="name01">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="name01"
                  name="title"
                  placeholder="Title"
                  value={title}
                  onInput={e => setTitle(e.target.value)}
                  required
                />
            </div>
            <div className="form-group">
                <label htmlFor="name02">Description</label>
                <textarea 
                    className="form-control"
                    id="Textarea1" 
                    rows="6"
                    name="name02"
                    placeholder="Description"
                    value={desc} 
                    onInput={e => setDesc(e.target.value)} 
                    required>
                </textarea>
            </div>  
  
            <div className="button-align">
              <button type="button" className="btn btn-outline-success" onClick = {() => submit({
                  title:title,
                  desc:desc,
                  requestID:requestID.currRequestID
              })}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
  
  export default Complaint;