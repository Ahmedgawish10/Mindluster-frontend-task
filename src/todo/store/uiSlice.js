import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'todoUi',
  initialState: {
    search: '',
  },
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
  },
});

export const { setSearch } = uiSlice.actions;
export default uiSlice.reducer;
