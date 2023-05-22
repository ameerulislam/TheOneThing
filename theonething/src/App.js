import React, { useState, useEffect } from 'react';
import './App.css';
import { Auth } from 'aws-amplify';

const App = () => {
  const [twoYearGoal, setTwoYearGoal] = useState('');
  const [oneYearGoal, setOneYearGoal] = useState('');
  const [monthlyGoal, setMonthlyGoal] = useState('');
  const [weeklyGoal, setWeeklyGoal] = useState('');
  const [dailyGoal, setDailyGoal] = useState('');
  const [rightNow, setRightNow] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUser(user);
    } catch (error) {
      setUser(null);
    }
  };

  const handleTwoYearGoalChange = (event) => {
    setTwoYearGoal(event.target.value);
  };

  const handleOneYearGoalChange = (event) => {
    setOneYearGoal(event.target.value);
  };

  const handleMonthlyGoalChange = (event) => {
    setMonthlyGoal(event.target.value);
  };

  const handleWeeklyGoalChange = (event) => {
    setWeeklyGoal(event.target.value);
  };

  const handleDailyGoalChange = (event) => {
    setDailyGoal(event.target.value);
  };

  const handleRightNowChange = (event) => {
    setRightNow(event.target.value);
  };

  const handleLogin = async () => {
    try {
      await Auth.signIn('username', 'password');
      checkUser();
    } catch (error) {
      console.log('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      checkUser();
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>The One Thing App</h1>
        <div>
          {user ? (
            <button className="login-button" onClick={handleLogout}>Logout</button>
          ) : (
            <button className="login-button" onClick={handleLogin}>Login</button>
          )}
        </div>
      </header>
      <div className="content">
        <div className="segment">
          <h1>Two-Year Goal</h1>
          <p>What's the one thing I want to accomplish in two years?</p>
          <hr />
          <textarea className="writing-area" value={twoYearGoal} onChange={handleTwoYearGoalChange} />
        </div>

        <div className="segment">
          <h1>One-Year Goal</h1>
          <p>Based on my Two Year Goal, what's the one thing I can do this year?</p>
          <hr />
          <textarea className="writing-area" value={oneYearGoal} onChange={handleOneYearGoalChange} />
        </div>

        <div className="segment">
          <h1>Monthly Goal</h1>
          <p>Based on my One Year Goal, what's the one thing I can do this month?</p>
          <hr />
          <textarea className="writing-area" value={monthlyGoal} onChange={handleMonthlyGoalChange} />
        </div>

        <div className="segment">
          <h1>Weekly Goal</h1>
          <p>Based on my Monthly Goal, what's the one thing I can do this week?</p>
          <hr />
          <textarea className="writing-area" value={weeklyGoal} onChange={handleWeeklyGoalChange} />
        </div>

        <div className="segment">
          <h1>Daily Goal</h1>
          <p>Based on my Weekly Goal, what's the one thing I can do today?</p>
          <hr />
          <textarea className="writing-area" value={dailyGoal} onChange={handleDailyGoalChange} />
        </div>

        <div className="segment">
          <h1>Right Now</h1>
          <p>Based on my Daily Goal, what's the one thing I can do right now?</p>
          <hr />
          <textarea className="writing-area" value={rightNow} onChange={handleRightNowChange} />
        </div>

        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default App;
