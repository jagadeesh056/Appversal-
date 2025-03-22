import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Users, Activity, Gift, BarChart, Settings } from 'lucide-react';

const AdminDashboard = () => {
  const users = useAppSelector(state => state.users.entities) || [];
  const activities = useAppSelector(state => state.activities.entities) || [];
  const rewards = useAppSelector(state => state.rewards.entities) || [];

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1><Settings size={24} /> Admin Dashboard</h1>
      </div>

      <div className="stats-overview">
        <Card className="admin-stat">
          <CardContent>
            <Users size={24} />
            <h3>{users?.length || 0}</h3>
            <span>Total Users</span>
          </CardContent>
        </Card>

        <Card className="admin-stat">
          <CardContent>
            <Activity size={24} />
            <h3>{activities?.length || 0}</h3>
            <span>Total Activities</span>
          </CardContent>
        </Card>

        <Card className="admin-stat">
          <CardContent>
            <Gift size={24} />
            <h3>{rewards?.length || 0}</h3>
            <span>Available Rewards</span>
          </CardContent>
        </Card>
      </div>

      <div className="admin-content">
        <Card className="management-section">
          <CardHeader>
            <CardTitle><Users /> User Management</CardTitle>
            <Button variant="primary">Add New User</Button>
          </CardHeader>
          <CardContent>
            <div className="user-table">
              <div className="table-header">
                <span>Name</span>
                <span>Email</span>
                <span>Points</span>
                <span>Actions</span>
              </div>
              {users.length > 0 ? (
                users.map(user => (
                  <div key={user.id} className="table-row">
                    <span>{user.name}</span>
                    <span>{user.email}</span>
                    <span>{user.points}</span>
                    <div className="actions">
                      <Button variant="secondary">Edit</Button>
                      <Button variant="danger">Delete</Button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No users available</p>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="analytics-section">
          <Card className="chart-card">
            <CardHeader>
              <CardTitle><BarChart /> Points Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="chart-placeholder">Chart goes here</div>
            </CardContent>
          </Card>

          <Card className="recent-activity">
            <CardHeader>
              <CardTitle><Activity /> Recent System Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {activities.length > 0 ? (
                activities.slice(0, 5).map(activity => (
                  <div key={activity.id} className="activity-item">
                    <span>{activity.type}</span>
                    <span>{activity.description}</span>
                    <small>{new Date(activity.date).toLocaleDateString()}</small>
                  </div>
                ))
              ) : (
                <p>No recent activity</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
