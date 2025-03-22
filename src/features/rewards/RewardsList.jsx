import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { 
  selectAllRewards, 
  addToCart, 
  removeFromCart, 
  selectCartItems,
  selectCartTotal,
  fetchAllRewards 
} from './rewardsSlice';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Gift, ShoppingCart, X } from 'lucide-react';
import spotifyImg from  '../../assets/spotify.jpg';
import AmazonLogo from '../../assets/Amazon logo.png';
import Netflix from '../../assets/netflix.png';

import './RewardsList.css';  

const RewardsList = () => {
  const dispatch = useAppDispatch();
  const rewards = useAppSelector(selectAllRewards) || []; 
  const cartItems = useAppSelector(selectCartItems) || [];
  const cartTotal = useAppSelector(selectCartTotal) || 0;
  const status = useAppSelector(state => state.rewards.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllRewards());
    }
  }, [dispatch, status]);


  const mockRewards = [
    { id: 1, name: "Amazon Gift Card", description: "Redeem a $10 Amazon Gift Card", pointsCost: 1000, image: AmazonLogo },
    { id: 2, name: "Spotify Premium", description: "1-month Spotify Premium Subscription", pointsCost: 800, image: spotifyImg },
    { id: 3, name: "Netflix Subscription", description: "1-month Netflix Subscription", pointsCost: 1200, image: Netflix }
  ];

  const displayedRewards = rewards.length > 0 ? rewards : mockRewards;

  const handleRedeem = () => {
    console.log('Redeeming items:', cartItems);
  };

  return (
    <div className="rewards-container">
      <div className="rewards-grid">
        <Card className="rewards-list">
          <CardHeader>
            <CardTitle>Available Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="rewards-grid">
              {displayedRewards.map(reward => (
                <li key={reward.id} className="reward-card">
                  <img 
                    src={reward.image} 
                    alt={reward.name}
                    className="reward-image"
                  />
                  <div className="reward-details">
                    <h4>{reward.name}</h4>
                    <p>{reward.description}</p>
                    <div className="reward-footer">
                      <div className="points-required">
                        <Gift size={18} />
                        <span>{reward.pointsCost} Points</span>
                      </div>
                      <Button
                        variant={cartItems.some(item => item.id === reward.id) ? 'secondary' : 'primary'}
                        onClick={() => 
                          cartItems.some(item => item.id === reward.id)
                            ? dispatch(removeFromCart(reward.id))
                            : dispatch(addToCart(reward.id))
                        }
                      >
                        {cartItems.some(item => item.id === reward.id) ? 'Remove' : 'Add to Cart'}
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RewardsList;
