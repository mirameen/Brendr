import React from 'react';
import heroImg from './photos/heroImg.jpg';
import person4 from './photos/person4.png';
import {useHistory} from 'react-router-dom';

function Home() {

  let history = useHistory();

  function gotoSignUp(){
    history.push('/signup');
  }

  function gotoLend(){
    history.push('/lend');
  }

  function gotoBorrow(){
    history.push('/borrow');
  }

    return ( <div className="main-conatainer">
    <div className="intro-top">
      <p>Can't find trusted people to borrow from?</p>
      <p>Welcome to <b>Brendr</b>.</p>
      <h2>
        Borrowing-Lending Made Easy.
      </h2>
    </div>

    <div className="intro-img"><img src={heroImg} alt="intro image" /></div>

    <div className="intro-bottom">
      <h2>Story, emotion and purpose</h2>
      <p>
        We help people in close knit communities in the process of Borrowing
        and Lending by bringing people together on a single platform and
        making it easy and hassle free.
      </p>
      <h4>Want to join us?</h4>
      <div className="email-form">
        <button type="button" onClick={() => gotoSignUp()}>Sign Up</button>
      </div>
    </div>

    <div className="container">
      <div className="services">
        <h2>We offer the following services</h2>
        <div className="cards-container">
          <div className="cards">
            <div className="icon1"><i className="fas fa-pencil-alt"></i></div>
            <h3>Lend</h3>
            <p>
              Lend items of your choice or to other users who have requested for the item on Brendr.
            </p>
            <button type="button" onClick={() => gotoLend()}>Get started</button>
          </div>
          <div className="cards">
            <div className="icon2"><i className="fas fa-code"></i></div>
            <h3>Borrow</h3>
            <p>
              Borrow items by putting out request on Brendr or by browsing through the items being lended on Brendr
            </p>
            <button type="button" onClick={() => gotoBorrow()}>Get started</button>
          </div>
          <div className="cards">
            <div className="icon3"><i className="fas fa-server"></i></div>
            <h3>Back End</h3>
            <p>
              This Service is provided to admins who are verified and selected to monitor the platform and resolve any complaints or issues.
            </p>
          </div>
        </div>
      </div>

      <div className="testimonial mb-5">
        <p className="review">
          “Brendr has helped me a lot, and has saved me a lot of money.
          Whenever I think of buying anything which I would use just once or
          twice, the first thing I do is check Brendr.”
        </p>
        <div className="author">
          <div className="author-img">
            <img src={person4} alt="author pic" />
          </div>
          <div className="author-info">
            <h3>Carlos Tran</h3>
            <h4>The Decorate Gatsby</h4>
          </div>
        </div>
      </div>
    </div>
  </div> );
}
 
export default Home;
