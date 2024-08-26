import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, SlotInfo } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from 'Redux/store';
import { addEvent, clearAllEvents } from 'Redux/calendarSlice';

import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';

moment.locale('en-GB');
const localizer = momentLocalizer(moment);

const CalendarComponent: React.FC = () => {
  const events = useSelector((state: RootState) => state.calendar.events);
  const dispatch: AppDispatch = useDispatch();

  const [isClient, setIsClient] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'event' as 'event' | 'reminder',
    start: new Date(),
    end: new Date(),
  });

  const handleDeleteAllEvents = () => {
    dispatch(clearAllEvents());
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setNewEvent({
      title: '',
      type: 'event',
      start: new Date(slotInfo.start),
      end: new Date(slotInfo.end),
    });
    setOpenDialog(true);
  };

  const handleSaveEvent = () => {
    dispatch(
      addEvent({
        id: events.length + 1,
        title: newEvent.title,
        start: newEvent.start,
        end: newEvent.end,
        type: newEvent.type,
      }),
    );
    setOpenDialog(false);
  };
  console.log(newEvent.start, newEvent.end); // Add this line to check the date values

  const eventStyleGetter = (event: any) => {
    const backgroundColor = event.type === 'event' ? '#3174ad' : '#ff9800';
    const style = {
      backgroundColor: backgroundColor,
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
    };
    return {
      style: style,
    };
  };

  if (!isClient) {
    return null;
  }

  return (
    <Box sx={{ padding: '20px' }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        p={2}
        sx={{ backgroundColor: '#F0F0F0', borderRadius: '10px' }}
      >
        <Typography variant="h6">Add new schedule(s) :</Typography>
        <Box display="flex" alignItems="center">
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#00C49A',
              color: '#FFFFFF',
              marginRight: '10px',
              padding: '10px 20px',
              borderRadius: '30px',
              fontWeight: 'bold',
            }}
          >
            SCHEDULE
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: '#00C49A',
              color: '#00C49A',
              padding: '10px 20px',
              borderRadius: '30px',
              fontWeight: 'bold',
            }}
          >
            RESET
          </Button>
        </Box>
      </Box>

      <ButtonGroup variant="contained" sx={{ marginBottom: '20px', gap: '10px' }}>
        <Button
          startIcon={<AddCircleIcon />}
          sx={{
            backgroundColor: '#00C49A',
            color: '#FFFFFF',
            padding: '10px 20px',
            fontWeight: 'bold',
          }}
        >
          REPLENISH
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          onClick={handleDeleteAllEvents}
          sx={{
            backgroundColor: '#00C49A',
            color: '#FFFFFF',
            padding: '10px 20px',
            borderRadius: '30px',
            fontWeight: 'bold',
          }}
        >
          DELETE SCHEDULE
        </Button>
        <Button
          startIcon={<DownloadIcon />}
          sx={{
            backgroundColor: '#00C49A',
            color: '#FFFFFF',
            padding: '10px 20px',
            borderRadius: '30px',
            fontWeight: 'bold',
          }}
        >
          EXPORT & DOWNLOAD
        </Button>
        <Button
          startIcon={<PrintIcon />}
          sx={{
            backgroundColor: '#00C49A',
            color: '#FFFFFF',
            padding: '10px 20px',
            fontWeight: 'bold',
          }}
        >
          PRINT
        </Button>
      </ButtonGroup>

      <Calendar
        localizer={localizer}
        events={events.map((event) => ({
          ...event,
          start: new Date(event.start), // Ensuring correct date format
          end: new Date(event.end), // Ensuring correct date format
        }))}
        selectable
        onSelectSlot={handleSelectSlot}
        defaultView="month"
        views={['month', 'week', 'day']}
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
      />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Event/Reminder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          />
          <TextField
            select
            label="Type"
            value={newEvent.type}
            onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as 'event' | 'reminder' })}
            fullWidth
            margin="dense"
          >
            <MenuItem value="event">Event</MenuItem>
            <MenuItem value="reminder">Reminder</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleSaveEvent}
            variant="contained"
            color="primary"
            disabled={!newEvent.title.trim()} // Disable if title is empty
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CalendarComponent;
