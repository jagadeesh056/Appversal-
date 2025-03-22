import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchUser, selectUserById } from './usersSlice';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Activity, Gift, User, Star } from 'lucide-react';


const UserProfile = () => {
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => selectUserById(state, userId));
  const activities = useAppSelector(state => state.activities.entities);
  const status = useAppSelector(state => state.users.status);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId));
    }
  }, [dispatch, userId]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="user-profile">
      <div className="profile-header">
        <Card className="user-card">
          <CardContent>
            <div className="user-info">
              <img 
                src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`}
                alt={user.name}
                className="user-avatar"
              />
              <div className="user-details">
                <h2>{user.name}</h2>
                <p className="user-email">{user.email}</p>
                <div className="points-display">
                  <Star size={20} />
                  <span>{user.points} Points</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="quick-stats">
          <CardHeader>
            <CardTitle>Activity Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="stats-grid">
              <div className="stat-item">
                <Activity size={24} />
                <span>{user.activities?.length || 0} Activities</span>
              </div>
              <div className="stat-item">
                <Gift size={24} />
                <span>{user.redemptions?.length || 0} Redemptions</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="activity-history">
        <CardHeader>
          <CardTitle>Point History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="transaction-list">
            {user.transactions?.map(transaction => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-type">{transaction.type}</div>
                <div className="transaction-details">
                  <span>{transaction.description}</span>
                  <small>{new Date(transaction.date).toLocaleDateString()}</small>
                </div>
                <div className={`transaction-amount ${transaction.type}`}>
                  {transaction.amount > 0 ? '+' : '-'}{Math.abs(transaction.amount)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;