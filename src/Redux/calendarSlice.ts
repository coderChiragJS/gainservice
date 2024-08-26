import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CalendarEvent = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  type: 'event' | 'reminder';
};

 export interface CalendarState {
  events: CalendarEvent[];
}

const initialState: CalendarState = {
  events: [],
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<CalendarEvent>) => {
      state.events.push(action.payload);
    },
    deleteEvent: (state, action: PayloadAction<number>) => {
      state.events = state.events.filter((event) => event.id !== action.payload);
    },
    clearAllEvents: (state) => {
      state.events = [];
    },
  },
});

export const { addEvent, deleteEvent, clearAllEvents } = calendarSlice.actions;
export default calendarSlice.reducer;
