import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, SlotInfo } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from 'Redux/store';
import { addEvent } from 'Redux/calendarSlice';
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
    const [selectedMonth, setSelectedMonth] = useState<string>('July 2023');
    const [newEvent, setNewEvent] = useState({
        title: '',
        type: 'event' as 'event' | 'reminder',
        start: new Date(),
        end: new Date(),
    });

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSelectSlot = (slotInfo: SlotInfo) => {
        setNewEvent({
            title: '',
            type: 'event',
            start: slotInfo.start,
            end: slotInfo.end,
        });
        setOpenDialog(true);
    };

    const handleSaveEvent = () => {
        dispatch(addEvent({
            id: events.length + 1,
            title: newEvent.title,
            start: newEvent.start,
            end: newEvent.end,
            type: newEvent.type,
        }));
        setOpenDialog(false);
    };

    const eventStyleGetter = (event: any) => {
        let backgroundColor = event.type === 'event' ? '#3174ad' : '#ff9800';
        let style = {
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
                    <FormControl variant="outlined" sx={{ minWidth: 200, marginRight: '20px' }}>
                        <InputLabel>Select Months</InputLabel>
                        <Select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            label="Select Months"
                        >
                            <MenuItem value="January 2023">January</MenuItem>
                            <MenuItem value="February 2023">February</MenuItem>
                            <MenuItem value="March 2023">March</MenuItem>
                            <MenuItem value="April 2023">April</MenuItem>
                            <MenuItem value="May 2023">May</MenuItem>
                            <MenuItem value="June 2023">June</MenuItem>
                            <MenuItem value="July 2023">July</MenuItem>
                            <MenuItem value="August 2023">August</MenuItem>
                            <MenuItem value="September 2023">September</MenuItem>
                            <MenuItem value="October 2023">October</MenuItem>
                            <MenuItem value="November 2023">November</MenuItem>
                            <MenuItem value="December 2023">December</MenuItem>

                            {/* Add more months as needed */}
                        </Select>
                    </FormControl>
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
                        borderRadius: '30px',
                        fontWeight: 'bold',
                    }}
                >
                    REPLENISH
                </Button>
                <Button
                    startIcon={<DeleteIcon />}
                    sx={{
                        backgroundColor: '#FF4D4D',
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
                        borderRadius: '30px',
                        fontWeight: 'bold',
                    }}
                >
                    PRINT
                </Button>
            </ButtonGroup>

            <Calendar
                localizer={localizer}
                events={events}
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
                    <Button onClick={handleSaveEvent} variant="contained" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CalendarComponent;
