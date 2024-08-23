import React from 'react';

import Layout from 'Layouts';
import WorkOrderTable from 'components/WorkOrderTable';


const WorkOrder: React.FC = () => {
    return (
        <Layout title="Reports">
            <WorkOrderTable />
        </Layout>
    );
};

export default WorkOrder;
