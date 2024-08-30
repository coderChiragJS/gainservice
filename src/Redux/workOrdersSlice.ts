
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { rows as dummyRows } from 'dummyData'; 
import { CalendarState } from './calendarSlice';

interface RowData {
  id: number;
  donor: string;
  panels: string;
  barcode: string;
  source: string;
  date: string;
  amount: string;
  observedBy: string;
  status: string;
}

interface WorkOrdersState {
  rows: RowData[];
}

const initialState: WorkOrdersState = {
  rows: dummyRows,
};


export interface AppState {
  workOrders: WorkOrdersState;
  calendar: CalendarState;

}

const workOrdersSlice = createSlice({
  name: 'workOrders',
  initialState,
  reducers: {
    setRows: (state, action: PayloadAction<RowData[]>) => {
      state.rows = action.payload;
    },
    addRow: (state, action: PayloadAction<RowData>) => {
      state.rows.push(action.payload);
    },
    updateRow: (state, action: PayloadAction<RowData>) => {
      const index = state.rows.findIndex((row) => row.id === action.payload.id);
      if (index !== -1) {
        state.rows[index] = action.payload;
      }
    },
    deleteRow: (state, action: PayloadAction<number>) => {
      state.rows = state.rows.filter((row) => row.id !== action.payload);
    },
  },
});

export const { setRows, addRow, updateRow, deleteRow } = workOrdersSlice.actions;

export default workOrdersSlice.reducer;
