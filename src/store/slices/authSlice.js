import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// SIGN IN
export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }) => {
    const { default: FirebaseService } = await import('../../services/FirebaseService');
    const user = await FirebaseService.signIn(email, password);

    return {
      email: user.email,
      uid: user.uid,
      username: user.displayName || null
    };
  }
);

// SIGN UP
export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ email, password, username }) => {
    const { default: FirebaseService } = await import('../../services/FirebaseService');
    const user = await FirebaseService.signUp(email, password, username);

    return {
      email: user.email,
      uid: user.uid,
      username: user.displayName || username
    };
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      import('../../services/FirebaseService').then(({ default: FirebaseService }) => {
        FirebaseService.signOut();
      });
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // SIGN IN
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // SIGN UP
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
