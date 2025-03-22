import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchRewards, redeemReward } from '../../utils/services/api';

const rewardsAdapter = createEntityAdapter({
  selectId: (reward) => reward.id,
  sortComparer: (a, b) => a.pointsCost - b.pointsCost,
});

const initialState = rewardsAdapter.getInitialState({
  status: 'idle',
  error: null,
  cart: [],
  redemptionHistory: [],
});

export const fetchAllRewards = createAsyncThunk('rewards/fetchAllRewards', async () => {
  const response = await fetchRewards();
  return response;
});

export const redeemUserReward = createAsyncThunk('rewards/redeemUserReward', async ({ userId, rewardId }) => {
  const response = await redeemReward(userId, rewardId);
  return response;
});

const rewardsSlice = createSlice({
  name: 'rewards',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const rewardId = action.payload;
      if (!state.cart.includes(rewardId)) {
        state.cart.push(rewardId);
      }
    },
    removeFromCart: (state, action) => {
      const rewardId = action.payload;
      state.cart = state.cart.filter((id) => id !== rewardId);
    },
    clearCart: (state) => {
      state.cart = [];
    },
    addToRedemptionHistory: (state, action) => {
      state.redemptionHistory.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRewards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllRewards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        rewardsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchAllRewards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(redeemUserReward.fulfilled, (state, action) => {
        state.redemptionHistory.push(action.payload);
      });
  },
});

export const { addToCart, removeFromCart, clearCart, addToRedemptionHistory } = rewardsSlice.actions;

export const {
  selectAll: selectAllRewards,
  selectById: selectRewardById,
  selectIds: selectRewardIds,
} = rewardsAdapter.getSelectors((state) => state.rewards);

export const selectCartItems = (state) => {
  const cartIds = state.rewards.cart;
  return cartIds.map((id) => selectRewardById(state, id)).filter(Boolean);
};

export const selectCartTotal = (state) => {
  const cartItems = selectCartItems(state);
  return cartItems.reduce((sum, item) => sum + item.pointsCost, 0);
};

export const selectRedemptionCount = (state) => {
  return state.rewards.redemptionHistory.length;
};

export const selectPopularRewards = (state) => {
  const allRewards = selectAllRewards(state);
  return allRewards
    .filter((reward) => reward.redemptions !== undefined)
    .sort((a, b) => b.redemptions - a.redemptions)
    .slice(0, 5);
};

export default rewardsSlice.reducer;
