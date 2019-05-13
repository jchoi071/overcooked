import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import firebase from './firebase.js';
//import updateApp from './index.js';
var email;
var userpassword;
var notifmessage = "";
var registernotifmessage = "";
var loggedIn;

var	user = firebase.auth().currentUser;
firebase.auth().onAuthStateChanged(function(user) {
	console.log("user state changed");
  if (user) {
    loggedIn = true;
  } else {
    loggedIn = false;
  }
  currPage = <LoginPage/>
  updateApp();
});

//this is the html for the login page
class LoginPage extends React.Component {
	render(){
	var page;
	if (!loggedIn){
		page =
		<div>
		  <header>
			<h1>
				<p> Login </p>
			</h1>
			<h2>
				<p>Email: </p>
				<input type="text" name="email" onChange={handleChangeEmail}/><br/>
				<p>Password: </p>
				<input type="password" name="userpassword" onChange={handleChangePass}/><br/>
				<input type="submit" value="Login" onClick={login}/>
			</h2>
			<h3>
				<p>{notifmessage}</p>
				<input type="submit" value="Register?" onClick={ChangeToRegisterPage}/>
			</h3>
		  </header>
		</div>
		
	}
	else{
		page =
			<div>
			  <header>
				<h1>
					<p> hey you're logged in </p>
				</h1>
				<h2>
					<p> log out? </p>
					<input type="submit" value="log off" onClick={logout}/>
				</h2>
			  </header>
			</div>
	}
	return page;
	}
}

class RegisterPage extends React.Component {
	render(){
	var page;
	page =
	<div>
	  <header>
		<h1>
			<p> Register </p>
		</h1>
		<h2>
			<p>Email: </p>
			<input type="text" name="email" onChange={handleChangeEmail}/><br/>
			<p>Password: </p>
			<input type="password" name="userpassword" onChange={handleChangePass}/><br/>
			<input type="submit" value="register" onClick={register}/>
		</h2>
		<h3>
			<p>{registernotifmessage}</p>
		</h3>
	  </header>
	</div>
		
	return page;
	}
}

var currPage = <LoginPage/>;
function setPageOnStartup(){
	//user = firebase.auth().currentUser;
	//if (user){
	//	currPage = <LoggedInPage />;
	//} else{
	//	currPage = <LoginPage />;
	//}
	updateApp();
}
function App() {
  return (
    currPage
  );
}
function ChangeToRegisterPage(){
	currPage = <RegisterPage/>;
	updateApp();
}
function updateApp(){
	ReactDOM.render(currPage, document.getElementById('root'));	
}
function handleChangeEmail(event){
	email = event.target.value;
}
function handleChangePass(event){
	userpassword = event.target.value;
}
function login(){
	console.log(email);
	firebase.auth().signInWithEmailAndPassword(email, userpassword);
	user = firebase.auth().currentUser;
	if (user){
		notifmessage = "signed in";
	//	var currPage = <LoggedInPage />;
	} else{
		notifmessage = "sign in failed";
	}
	
}
function logout(){
	firebase.auth().signOut();
	user = firebase.auth().currentUser;
	updateApp();
}

function register(){
	firebase.auth().createUserWithEmailAndPassword(email, userpassword);
}




//heres where the website is run and rendered
setPageOnStartup();



export default App;
