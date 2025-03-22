import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchActivities, createActivity, updateActivity } from '../../utils/services/api'

const activitiesAdapter = createEntityAdapter({
  selectId: activity => activity.id,
  sortComparer: (a, b) => new Date(b.date) - new Date(a.date)
});

const initialState = activitiesAdapter.getInitialState({
  status: 'idle',
  error: null,
  filter: 'all'
});

export const fetchAllActivities = createAsyncThunk(
  'activities/fetchAllActivities',
  async () => {
    const response = await fetchActivities();
    return response;
  }
);

export const addNewActivity = createAsyncThunk(
  'activities/addNewActivity',
  async (activity) => {
    const response = await createActivity(activity);
    return response;
  }
);

export const updateExistingActivity = createAsyncThunk(
  'activities/updateExistingActivity',
  async (activity) => {
    const response = await updateActivity(activity.id, activity);
    return response;
  }
);

const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    setActivityFilter: (state, action) => {
      state.filter = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllActivities.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllActivities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        activitiesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchAllActivities.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewActivity.fulfilled, (state, action) => {
        activitiesAdapter.addOne(state, action.payload);
      })
      .addCase(updateExistingActivity.fulfilled, (state, action) => {
        activitiesAdapter.upsertOne(state, action.payload);
      });
  }
});

export const { setActivityFilter } = activitiesSlice.actions;

export const {
  selectAll: selectAllActivities,
  selectById: selectActivityById,
  selectIds: selectActivityIds
} = activitiesAdapter.getSelectors(state => state.activities);

export const selectRecentActivities = state => {
  const allActivities = selectAllActivities(state);
  return allActivities.slice(0, 5);
};

export const selectActivitiesByUser = (state, userId) => {
  const allActivities = selectAllActivities(state);
  return allActivities.filter(activity => activity.userId === userId);
};

export const selectCompletedActivitiesCount = state => {
  const allActivities = selectAllActivities(state);
  return allActivities.length;
};

export default activitiesSlice.reducer;