import React, { useState, useContext, useEffect} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {UserContext} from './App';
import person4 from './photos/person4.png';
import Complaint from './Complaint';


function Admin() {
  const user = useContext(UserContext);
  const [complaintList, setComplaintList] = useState([]);
  const [comment, setComment] = useState("");
  let history = useHistory();

  useEffect(() => {
    axios.get('/api/conflicts/').then(res => setComplaintList(res.data));
  },[])

  function resolveComplaint(details){
    axios.post('/api/conflicts/resolve', details).then(res => {
      if (res.data.success === true){
        alert("Your response has been succesfully recorded");
        history.push('/admin');
      }
      else{
        alert("Error");
      }
    })
  }

  function makeCardComplaint(complaint) {
    return (
      <div className="">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{complaint.title}</h5>
            <p className="card-text">
              {complaint.description}
            </p>
            {complaint.resolved === false?<p><span className="badge badge-warning">Awaiting Your Decision</span></p>:<p><span className="badge badge-success">Resolved</span></p>}
            {complaint.resolved === false?
              <form class="form-inline">
                <div class="form-group mx-sm-3 mb-2">
                  <label for="inputPassword2" class="sr-only">Password</label>
                  <input type="text" class="form-control" id="inputPassword2" placeholder="Admin Comment" onInput={e => setComment(e.target.value)}/>
                </div>
                <button type="submit" class="btn btn-primary mb-2" onClick = {() => resolveComplaint({conflictID:complaint._id,comment:comment,requestID:complaint.requestID})}>Resolve</button>
              </form>
              : <p><b>Admin Comments</b> : {complaint.adminComment}</p>}
          </div>
        </div>
      </div>
    );
  }
  
  function makeCardsComplaint(complaints) {
    console.log(complaints);
    if (complaints.length == 0) {
      return <div></div>
    } else {
      console.log(complaints[0]);
      var cards = []
      for (const complaint of complaints) {
        cards.push(makeCardComplaint(complaint));
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

        <div className="alert alert-danger mt-5" role="alert">
          <b>User Complaints</b>
        </div>
        <div className="row text-center">
          {makeCardsComplaint(complaintList)}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Admin;
