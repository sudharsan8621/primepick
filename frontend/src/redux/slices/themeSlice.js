import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
    },
    initializeTheme: (state) => {
      const savedTheme = localStorage.getItem('darkMode');
      if (savedTheme !== null) {
        state.darkMode = JSON.parse(savedTheme);
      } else {
        // Check system preference
        state.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
    },
  },
});

export const { toggleTheme, initializeTheme } = themeSlice.actions;
export default themeSlice.reducer;