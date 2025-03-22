import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutGrid, 
  Users, 
  Activity, 
  Gift, 
  Settings,
  Search,
  Bell
} from 'lucide-react';
import userImg from '../../assets/profile.png'
import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };
  
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">
          <Gift className="logo-icon" />
          <h1>Reward System</h1>
        </div>
        <div className='header-right'>
        <div className="search-bar">
          <Search className="search-icon" />
          <input type="text" placeholder="Search..." />
        </div>
        <div className="header-actions">
          <button className="icon-button">
            <Bell />
            <span className="notification-badge"></span>
          </button>
          <div className="user-avatar">
            <img src={userImg} alt="User" />
          </div>
        </div>
        </div>
      </header>
      <div className="app-content">
        <nav className="sidebar">
          <ul className="nav-links">
            <li className={isActive('/')}>
              <Link to="/">
                <LayoutGrid className="nav-icon" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li className={isActive('/users')}>
              <Link to="/users">
                <Users className="nav-icon" />
                <span>Users</span>
              </Link>
            </li>
            <li className={isActive('/activities')}>
              <Link to="/activities">
                <Activity className="nav-icon" />
                <span>Activities</span>
              </Link>
            </li>
            <li className={isActive('/rewards')}>
              <Link to="/rewards">
                <Gift className="nav-icon" />
                <span>Rewards</span>
              </Link>
            </li>
            <li className={isActive('/admin')}>
              <Link to="/admin">
                <Settings className="nav-icon" />
                <span>Admin</span>
              </Link>
            </li>
          </ul>
        </nav>
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;