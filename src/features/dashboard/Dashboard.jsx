import React, { useEffect } from 'react';
import { 
    Users, Award, Activity, Gift, Check, Clock, MessageSquare, FileText 
  } from 'lucide-react';
  
import { useSelector, useDispatch } from 'react-redux';
import { 

  selectTopUsers, 
  selectTotalPoints, 
  fetchAllUsers 
} from '../users/usersSlice';
import { 
  selectRecentActivities, 
  fetchAllActivities,
  selectCompletedActivitiesCount
} from '../activities/activitiesSlice';
import { 
  fetchAllRewards,
  selectRedemptionCount, 
  selectPopularRewards
} from '../rewards/rewardsSlice';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import userImg from '../../assets/usericon.avif';
import coffeeImg from '../../assets/coffee.jpg';
import swagBox from '../../assets/swagbox.jpg';
import teamLunch from '../../assets/teamlunch.png';
import premium from '../../assets/premium.jpg'; 

import './Dashboard.css';

const Dashboard = () => {
    const dispatch = useDispatch();
    
    const topUsers = useSelector(selectTopUsers);
    const totalPoints = useSelector(selectTotalPoints);
    const recentActivities = useSelector(selectRecentActivities);
    const completedActivities = useSelector(selectCompletedActivitiesCount);
    const redemptionsCount = useSelector(selectRedemptionCount);

    const popularRewards = useSelector(selectPopularRewards);
    
    const usersStatus = useSelector(state => state.users.status);
    const activitiesStatus = useSelector(state => state.activities.status);
    const rewardsStatus = useSelector(state => state.rewards.status);
  
    useEffect(() => {
      if (usersStatus === 'idle') {
        dispatch(fetchAllUsers());
      }
      if (activitiesStatus === 'idle') {
        dispatch(fetchAllActivities());
      }
      if (rewardsStatus === 'idle') {
        dispatch(fetchAllRewards());
      }
    }, [dispatch, usersStatus, activitiesStatus, rewardsStatus]);
  
    const getActivityIcon = (type) => {
      switch(type) {
        case 'task':
          return <Check size={18} />;
        case 'login':
          return <Clock size={18} />;
        case 'content':
          return <FileText size={18} />;
        case 'engagement':
          return <MessageSquare size={18} />;
        default:
          return <Activity size={18} />;
      }
    };
  
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          <p className="subtitle">Overview of the rewards system performance</p>
        </div>
        
        <div className="stats-grid">
          <Card className="stat-card">
            <CardContent>
              <div className="stat-content">
                <div className="stat-icon">
                  <Users />
                </div>
                <div className="stat-data">
                  <h4>Total Users</h4>
                  <div className="stat-value">{ 5}</div>
                  <p>Active participants in the rewards program</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="stat-card">
            <CardContent>
              <div className="stat-content">
                <div className="stat-icon">
                  <Award />
                </div>
                <div className="stat-data">
                  <h4>Total Points</h4>
                  <div className="stat-value">{totalPoints?.toLocaleString() || '6,750'}</div>
                  <p>Points currently in circulation</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="stat-card">
            <CardContent>
              <div className="stat-content">
                <div className="stat-icon">
                  <Activity />
                </div>
                <div className="stat-data">
                  <h4>Completed Activities</h4>
                  <div className="stat-value">{completedActivities || 4}</div>
                  <p>Activities completed by users</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="stat-card">
            <CardContent>
              <div className="stat-content">
                <div className="stat-icon">
                  <Gift />
                </div>
                <div className="stat-data">
                  <h4>Redemptions</h4>
                  <div className="stat-value">{redemptionsCount || 0}</div>
                  <p>Rewards redeemed by users</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="dashboard-grid">
          <div className="dashboard-column">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <p className="card-subtitle">Latest activities across all users</p>
              </CardHeader>
              <CardContent>
                <div className="activity-list">
                  {recentActivities && recentActivities.length > 0 ? (
                    recentActivities.map(activity => (
                      <div key={activity.id} className="activity-item">
                        <div className="activity-icon">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="activity-details">
                          <h4>{activity.title}</h4>
                          <p>{activity.description}</p>
                          <div className="activity-meta">
                            <span className="activity-points">+{activity.pointsEarned} points</span>
                            <span className="activity-type">{activity.type}</span>
                            <span className="activity-date">
                              {activity.timestamp || 'almost 2 years ago'}
                            </span>
                          </div>
                        </div>
                        <div className="activity-status">
                          <span className="status-dot complete"></span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="activity-item">
                        <div className="activity-icon">
                          <Check size={18} />
                        </div>
                        <div className="activity-details">
                          <h4>Complete Training Module</h4>
                          <p>Finish the advanced skills training module</p>
                          <div className="activity-meta">
                            <span className="activity-points">+30 points</span>
                            <span className="activity-type">Task</span>
                            <span className="activity-date">almost 2 years ago</span>
                          </div>
                        </div>
                        <div className="activity-status">
                          <span className="status-dot complete"></span>
                        </div>
                      </div>
                      
                      <div className="activity-item">
                        <div className="activity-icon">
                          <Clock size={18} />
                        </div>
                        <div className="activity-details">
                          <h4>Daily Login</h4>
                          <p>Logged in for 5 consecutive days</p>
                          <div className="activity-meta">
                            <span className="activity-points">+5 points</span>
                            <span className="activity-type">Login</span>
                            <span className="activity-date">almost 2 years ago</span>
                          </div>
                        </div>
                        <div className="activity-status">
                          <span className="status-dot complete"></span>
                        </div>
                      </div>
                      
                      <div className="activity-item">
                        <div className="activity-icon">
                          <Check size={18} />
                        </div>
                        <div className="activity-details">
                          <h4>Complete Weekly Report</h4>
                          <p>Submit the weekly progress report</p>
                          <div className="activity-meta">
                            <span className="activity-points">+20 points</span>
                            <span className="activity-type">Task</span>
                            <span className="activity-date">almost 2 years ago</span>
                          </div>
                        </div>
                        <div className="activity-status">
                          <span className="status-dot complete"></span>
                        </div>
                      </div>
                      
                      <div className="activity-item">
                        <div className="activity-icon">
                          <FileText size={18} />
                        </div>
                        <div className="activity-details">
                          <h4>Write Blog Post</h4>
                          <p>Create a blog post about rewards systems</p>
                          <div className="activity-meta">
                            <span className="activity-points">+50 points</span>
                            <span className="activity-type">Content</span>
                            <span className="activity-date">almost 2 years ago</span>
                          </div>
                        </div>
                        <div className="activity-status">
                          <span className="status-dot complete"></span>
                        </div>
                      </div>
                      
                      <div className="activity-item">
                        <div className="activity-icon">
                          <MessageSquare size={18} />
                        </div>
                        <div className="activity-details">
                          <h4>Forum Participation</h4>
                          <p>Responded to 3 community questions</p>
                          <div className="activity-meta">
                            <span className="activity-points">+15 points</span>
                            <span className="activity-type">Engagement</span>
                            <span className="activity-date">almost 2 years ago</span>
                          </div>
                        </div>
                        <div className="activity-status">
                          <span className="status-dot complete"></span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="dashboard-column">
            <Card>
              <CardHeader>
                <CardTitle>Top Users</CardTitle>
                <p className="card-subtitle">Users with the most points</p>
              </CardHeader>
              <CardContent>
                <div className="user-leaderboard">
                  {topUsers && topUsers.length > 0 ? (
                    topUsers.map((user, index) => (
                      <div key={user.id} className="leaderboard-item">
                        <div className="leaderboard-rank">{index + 1}</div>
                        <div className="leaderboard-avatar">
                          <img src={spotifyImg} alt={user.name} />
                        </div>
                        <div className="leaderboard-details">
                          <h4>{user.name}</h4>
                        </div>
                        <div className="leaderboard-points">
                          <div className="points-bar">
                            <div 
                              className="points-bar-fill" 
                              style={{ 
                                width: `${(user.points / (topUsers[0]?.points || 2340)) * 100}%`
                              }}
                            ></div>
                          </div>
                          <span>{user.points} pts</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      {[
                        { id: 1, name: 'Jane Smith', points: 2340 },
                        { id: 2, name: 'Alice Williams', points: 1750 },
                        { id: 3, name: 'John Doe', points: 1250 },
                        { id: 4, name: 'Bob Johnson', points: 890 },
                        { id: 5, name: 'Charlie Brown', points: 520 }
                      ].map((user, index) => (
                        <div key={user.id} className="leaderboard-item">
                          <div className="leaderboard-rank">{index + 1}</div>
                          <div className="leaderboard-avatar">
                            <img src={userImg} alt={user.name} />
                          </div>
                          <div className="leaderboard-details">
                            <h4>{user.name}</h4>
                          </div>
                          <div className="leaderboard-points">
                            <div className="points-bar">
                              <div 
                                className="points-bar-fill" 
                                style={{ 
                                  width: `${(user.points / 2340) * 100}%`
                                }}
                              ></div>
                            </div>
                            <span>{user.points} pts</span>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
  
        <div className="rewards-section">
          <Card>
            <CardHeader>
              <CardTitle>Popular Rewards</CardTitle>
              <p className="card-subtitle">Most frequently redeemed rewards</p>
            </CardHeader>
            <CardContent>
              <div className="rewards-grid">
                {popularRewards && popularRewards.length > 0 ? (
                  popularRewards.map(reward => (
                    <div key={reward.id} className="reward-card">
                      <div className="reward-image">
                        <img src={reward.image || `https://via.placeholder.com/150`} alt={reward.title} />
                      </div>
                      <div className="reward-details">
                        <h4>{reward.title}</h4>
                        <div className="reward-cost">
                          <Gift size={14} />
                          <span>{reward.pointsCost}</span>
                        </div>
                        <p>{reward.description}</p>
                        <div className="reward-availability">
                          {reward.remaining ? `${reward.remaining} remaining` : 'Unlimited availability'}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    {[
                      { id: 1, title: 'Coffee Voucher', pointsCost: 100, description: 'Free coffee at the company cafe', remaining: 50, image: coffeeImg },
                      { id: 2, title: 'Premium Subscription', pointsCost: 500, description: 'One month of premium subscription', remaining: null, image: premium },
                      { id: 3, title: 'Company Swag Box', pointsCost: 1000, description: 'Box with company branded items', remaining: 20, image: swagBox },
                      { id: 4, title: 'Team Lunch', pointsCost: 2000, description: 'Lunch with the team of your choice', remaining: 5, image: teamLunch }
                    ].map(reward => (
                      <div key={reward.id} className="reward-card">
                        <div className="reward-image">
                          <img src={reward.image} alt={reward.title} />
                        </div>
                        <div className="reward-details">
                          <h4>{reward.title}</h4>
                          <div className="reward-cost">
                            <Gift size={14} />
                            <span>{reward.pointsCost}</span>
                          </div>
                          <p>{reward.description}</p>
                          <div className="reward-availability">
                            {reward.remaining ? `${reward.remaining} remaining` : 'Unlimited availability'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };
  
  export default Dashboard;