import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Layout from './components/layout/Layout';
import ActivityFeed from './features/activities/ActivityFeed';
import Dashboard from './features/dashboard/Dashboard';
import UserList from './features/users/UserList';
import UserProfile from './features/users/UserProfile';
import RewardsList from './features/rewards/RewardsList';
import AdminDashboard from './features/admin/AdminDashboard';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:userId" element={<UserProfile />} />
            <Route path="/activities" element={<ActivityFeed />} />
            <Route path="/rewards" element={<RewardsList />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/users" element={<UserList />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
