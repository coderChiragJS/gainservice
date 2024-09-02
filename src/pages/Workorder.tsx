import React, { useEffect, useState } from 'react';

import Layout from 'Layouts';
import WorkOrderTable from 'components/WorkOrderTable';
import LayoutPage from 'Layouts';

const WorkOrder: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <LayoutPage>
      <WorkOrderTable />
    </LayoutPage>
  );
};

export default WorkOrder;
