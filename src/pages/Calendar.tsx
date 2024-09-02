import React, { useState, useEffect } from 'react';
import CalendarComponent from 'components/Calendercompontsss';
import LayoutPage from 'Layouts';

const Calendar: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <LayoutPage>
      <CalendarComponent />
    </LayoutPage>
  );
};

export default Calendar;
