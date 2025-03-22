import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchUsers, fetchUserById } from '../../utils/services/api';

const usersAdapter = createEntityAdapter({
  selectId: (user) => user.id,
  sortComparer: (a, b) => b.points - a.points,
});

const initialState = usersAdapter.getInitialState({
  status: 'idle',
  error: null,
  searchTerm: '',
  searchResults: [],
});

export const fetchAllUsers = createAsyncThunk('users/fetchAllUsers', async () => {
  const response = await fetchUsers();
  return response;
});

export const fetchUser = createAsyncThunk('users/fetchUser', async (userId) => {
  const response = await fetchUserById(userId);
  return response;
});

export const searchUsers = createAsyncThunk('users/searchUsers', async (searchTerm, { rejectWithValue }) => {
  try {
    const response = await fetchUsers(searchTerm);
    return response;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        usersAdapter.setAll(state, action.payload);
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        usersAdapter.upsertOne(state, action.payload);
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.searchResults = action.payload;
      });
  },
});

export const { setSearchTerm, clearSearchResults } = usersSlice.actions;

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors((state) => state.users);

export const selectTopUsers = (state) => {
  const allUsers = selectAllUsers(state);
  return [...allUsers].sort((a, b) => b.points - a.points).slice(0, 5);
};

export const selectTotalPoints = (state) => {
  const allUsers = selectAllUsers(state);
  return allUsers.reduce((sum, user) => sum + user.points, 0);
};

export const selectTotalUsers = (state) => {
  return selectAllUsers(state).length;
};

export default usersSlice.reducer;
