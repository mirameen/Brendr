import React, { useEffect } from "react";
import { Redirect } from 'react-router-dom';
import { useContext } from 'react';
import {UserContext} from './App';

function Borrow() {
  const userSpec = useContext(UserContext);

  useEffect(() => {
    if (!userSpec.currUser || userSpec.currUser.success !== true){
      alert("Please login to access this page");
    }
  }, [])

  if (!userSpec.currUser || userSpec.currUser.success !== true){
    return <Redirect to = "/login" />;
  }

  else {
  return (
    <div>
    </div>
  );
  }
};

export default Borrow;
