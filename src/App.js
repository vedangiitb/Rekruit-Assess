import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import CreateTestPage from './pages/CreateTestPage';
import AnswerTestPage from './pages/AnswerTestPage';
import AdminLogin from './pages/AuthPages/AdminLogin';
import AdminSignUp from './pages/AuthPages/AdminSignUp';
import UserLogin from './pages/AuthPages/UserLogin';
import UserSignUp from './pages/AuthPages/UserSignUp';
import TestCreated from './pages/TestCreated';
import EditQuestions from './pages/EditQuestion';
import AccountPage from './pages/AccountPage';
import { poolData } from './cognitoConfig';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import { login } from './components/AuthComponents/login';
import { logout } from './components/AuthComponents/logout';
import { signUp } from './components/AuthComponents/FirmSignUp';
import SignInPage from './pages/SignInPage';
import NewFirm from './components/AuthComponents/NewFirm';
import { signUpUser } from './components/AuthComponents/UserSignUp';
import RegisterPage from './components/AuthComponents/RegisterPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AnswerTestWrapper from './components/TestAnsweringComponents/AnswerTestWrapper';

const userPool = new CognitoUserPool(poolData);

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const isLoggedIn = async () => {
      const cognitoUser = userPool.getCurrentUser();
      if (cognitoUser) {
        return new Promise((resolve, reject) => {
          cognitoUser.getSession((err, session) => {
            if (err) {
              reject(err);
            } else {
              resolve(session.isValid());
            }
          });
        });
      } else {
        return false;
      }
    };

    const checkUserSession = async () => {
      try {
        const loggedIn = await isLoggedIn();
        if (loggedIn) {
          const cognitoUser = userPool.getCurrentUser();
          // const cognitoUser = new CognitoUser({ Username, Pool })
          setCurrentUser(cognitoUser)
        } else {
          setCurrentUser(null);
        }
      } catch (err) {
        console.error('Error checking user session', err);
        setError(err.message);
      }
    };
    checkUserSession();
  }, []);
  return (
    <div className="App">
      <ToastContainer />

      <Router>
        <Routes>
          <Route path='/' element={<HomePage currentUser={currentUser} />}></Route>
          <Route path="/register" element={<RegisterPage signUp={signUpUser} />} />
          <Route path="/login" element={<SignInPage login={(username, password) => currentUser(username, password)} />} />
          <Route path="/firm-onboarding" element={<NewFirm signUp={signUp} />} />
          <Route path='/create-test' element={<CreateTestPage />}></Route>
          <Route path='/answer-test/:id' element={<AnswerTestWrapper user={currentUser}/>}></Route>
          <Route path='/account' element={<AccountPage user={currentUser} logoutUser={logout} loginUser={login} />} />
          <Route path='/test-created/:id' element={<TestCreated />}></Route>
          <Route path='/edit-test/:id' element={<EditQuestions />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
