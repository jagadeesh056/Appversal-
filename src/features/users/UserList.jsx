import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectAllUsers } from './usersSlice';
import './UserList.css';

const UserList = () => {
  const users = useAppSelector(selectAllUsers) || [];

  const mockUsers = [
    { id: 1, name: "John Doe", email: "john@example.com", points: 1200 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", points: 900 },
    { id: 3, name: "Michael Lee", email: "michael@example.com", points: 1500 }
  ];

  const displayedUsers = users.length > 0 ? users : mockUsers;

  return (
    <div className="user-list">
      <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Points</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.points}</td>
              <td>
                <button>View Profile</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
