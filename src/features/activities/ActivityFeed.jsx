import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectRecentActivities } from './activitiesSlice';
import './ActivityFeed.css';

const ActivityFeed = () => {
  const activities = useAppSelector(selectRecentActivities) || [];

  const mockActivities = [
    { id: 1, type: "Login", description: "John Doe logged in", points: 10 },
    { id: 2, type: "Purchase", description: "Jane Smith redeemed a reward", points: -500 },
    { id: 3, type: "Achievement", description: "Michael Lee completed a challenge", points: 200 }
  ];

  const displayedActivities = activities.length > 0 ? activities : mockActivities;

  return (
    <div className="user-list">
      <h3>Recent Activities</h3>
      <ul>
        {displayedActivities.map(activity => (
          <li key={activity.id}>
            <span>{activity.type}</span>
            <span>{activity.description}</span>
            <span>{activity.points} points</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;
