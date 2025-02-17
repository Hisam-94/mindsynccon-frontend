import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/bookings");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const confirmBooking = createAsyncThunk(
  "bookings/confirmBooking",
  async (bookingDetails, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/bookings", bookingDetails);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchUserBookings = createAsyncThunk(
  "bookings/fetchUserBookings",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/bookings/${userId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// export const cancelBooking = createAsyncThunk(
//   "bookings/cancelBooking",
//   async (bookingId,itemId, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.delete(`/bookings/${bookingId}`, {itemId});
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

export const cancelBooking = createAsyncThunk(
  "bookings/cancelBooking",
  async ({ bookingId, itemId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/bookings/${bookingId}`, {
        data: { itemId }, // Pass `itemId` in the request body or adjust as per API design
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [],
    selectedBooking: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedBooking(state, action) {
      state.selectedBooking = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(confirmBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(confirmBooking.fulfilled, (state) => {
        state.loading = false;
        state.selectedBooking = null;
      })
      .addCase(confirmBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(cancelBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = state.bookings.filter(
          (booking) => booking._id !== action.meta.arg
        );
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
