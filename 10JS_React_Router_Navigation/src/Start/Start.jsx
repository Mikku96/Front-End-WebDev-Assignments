import "./styleStart.css";
import {Link, Outlet, useLoaderData} from 'react-router-dom';
import { useState, useEffect } from 'react';

import {contacts} from "../data/data.js";

export default function Start() {
  const [headerShow, setHeader] = useState(true);
  const params = useLoaderData();

  useEffect(() => {
    if (params.id !== undefined) {
      setHeader(false);
    }
  }, [])


  function hideHeader(event, status) {
    setHeader(status);
  }

  return (
    <div className="mainPage">
      <nav className="navigationButtons">
        {contacts.map(contactLink => {return(
          <Link onClick={(event) => hideHeader(event,false)} to={`/contacts/${contactLink.id}`}>{contactLink.name}</Link>
        )})}
      </nav>
      {headerShow && 
      <h1>Main page</h1>
      }
      <Outlet />
      {!headerShow && 
      <Link onClick={(event) => hideHeader(event,true)} className="hideContact" to='/'>Hide contact info</Link>
      }
      
    </div>
  );
}
