import React, { useState, useEffect } from 'react';
import CalendarComponent from 'components/Calendercompontsss'; // Correct your component import path if needed
import LayoutPage from 'Layouts';

const Calendar: React.FC = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null; // or return a loading indicator
    }

    return (
        <LayoutPage title="Reports">
            <CalendarComponent />
        </LayoutPage>
    );
};

export default Calendar;
