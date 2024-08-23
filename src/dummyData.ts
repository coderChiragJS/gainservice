// dummyData.ts

export type RowData = {
    id: number;
    donor: string;
    panels: string;
    barcode: string;
    source: string;
    date: string;
    amount: string;
    observedBy: string;
    status: string;
};

export const rows: RowData[] = [
    { id: 1, donor: 'Jimmy, Testington', panels: '3 Panel, 12 Panel U CUP', barcode: '1792602409', source: 'medicaid', date: '07/18/2023', amount: '$0.00', observedBy: 'Chavan Vishal', status: 'Unable to Donate' },
    { id: 2, donor: 'Jimmy, Testington', panels: '3 Panel, 12 Panel U CUP', barcode: '1501691893', source: 'Self Pay', date: '07/18/2023', amount: '$7.00', observedBy: 'Chavan Vishal', status: 'Refused' },
    { id: 3, donor: 'Jimmy, Testington', panels: '3 Panel, 12 Panel U CUP', barcode: '1937334336', source: 'Self Pay', date: '07/18/2023', amount: '$0.00', observedBy: 'Chavan Vishal', status: 'Duplicate/Error' },
    { id: 4, donor: 'TestMishraa, Ramakrishnaa', panels: '4th Panel, 3 Panel', barcode: '1976557961', source: 'Self Pay', date: '07/18/2023', amount: '$5.00', observedBy: 'Chavan Vishal', status: 'Insufficient Donation' },
    { id: 5, donor: 'TestMishraa, Ramakrishnaa', panels: 'BA, 4th Panel', barcode: '1729320465', source: 'medicaid', date: '07/18/2023', amount: '$5.00', observedBy: 'Chavan Vishal', status: 'Approved' },
    { id: 6, donor: 'Jimmy, Testington', panels: 'BZO, BZ2', barcode: '1182496815', source: 'Self Pay', date: '07/18/2023', amount: '$7.00', observedBy: 'Mashalkar Rohit', status: 'Approved' },
];


