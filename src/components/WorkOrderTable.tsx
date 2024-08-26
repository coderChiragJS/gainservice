import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import {
  Box,
  Button,
  IconButton,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppDispatch, RootState } from 'Redux/store';
import { addRow, deleteRow, updateRow } from 'Redux/workOrdersSlice';

interface FormData {
  id: number | '';
  donor: string;
  panels: string;
  barcode: string;
  source: string;
  date: string;
  amount: string;
  observedBy: string;
  status: string;
}

const WorkOrderTable: React.FC = () => {
  const rows = useSelector((state: RootState) => state.workOrders.rows);
  const dispatch: AppDispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [editingRow, setEditingRow] = useState<FormData | null>(null);
  const [formData, setFormData] = useState<FormData>({
    id: '',
    donor: '',
    panels: '',
    barcode: '',
    source: '',
    date: '',
    amount: '',
    observedBy: '',
    status: '',
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleOpenDialog = (row: FormData | null = null) => {
    setEditingRow(row);
    setFormData(
      row || {
        id: '',
        donor: '',
        panels: '',
        barcode: '',
        source: '',
        date: '',
        amount: '',
        observedBy: '',
        status: '',
      },
    );
    setFormErrors({});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const validateForm = () => {
    let errors: { [key: string]: string } = {};
    if (!formData.donor) errors.donor = 'Donor is required';
    if (!formData.panels) errors.panels = 'Panels are required';
    if (!formData.barcode) errors.barcode = 'Barcode is required';
    if (!formData.source) errors.source = 'Source is required';
    if (!formData.date) errors.date = 'Date is required';
    if (!formData.amount) errors.amount = 'Amount is required';
    if (!formData.observedBy) errors.observedBy = 'Observed By is required';
    if (!formData.status) errors.status = 'Status is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    if (editingRow && editingRow.id) {
      dispatch(updateRow({ ...formData, id: editingRow.id }));
    } else {
      const newId = rows.length > 0 ? Math.max(...rows.map((row) => row.id)) + 1 : 1;
      dispatch(addRow({ ...formData, id: newId }));
    }
    handleCloseDialog();
  };

  const handleDelete = (id: number) => {
    dispatch(deleteRow(id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'amount' && isNaN(Number(value))) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'id' || name === 'amount' ? value.replace(/\D/g, '') : value.replace(/[^a-zA-Z\s]/g, ''),
    }));
    setFormErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const columns: GridColDef[] = [
    { field: 'donor', headerName: 'DONOR', width: 200 },
    { field: 'panels', headerName: 'PANELS', width: 200 },
    { field: 'barcode', headerName: 'BARCODE', width: 150 },
    { field: 'source', headerName: 'SOURCE', width: 150 },
    { field: 'date', headerName: 'DATE', width: 150 },
    { field: 'amount', headerName: 'AMOUNT($)', width: 150 },
    { field: 'observedBy', headerName: 'OBSERVED BY', width: 200 },
    { field: 'status', headerName: 'STATUS', width: 200 },
    {
      field: 'action',
      headerName: 'ACTION',
      width: 150,
      renderCell: (params) => (
        <Box>
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={() => handleOpenDialog(params.row as FormData)}
          />
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={() => handleDelete(params.row.id)} />
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ padding: '2rem', width: '100%', margin: '0 auto' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Work Orders
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          sx={{ backgroundColor: '#00C49A', borderRadius: '20px' }}
          onClick={() => handleOpenDialog()}
        >
          Add Order
        </Button>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center">
          <IconButton sx={{ marginRight: '10px', borderRadius: '50%', backgroundColor: '#F0F0F0' }}>
            <SearchIcon sx={{ color: '#00C49A' }} />
          </IconButton>
          <Button variant="contained" sx={{ backgroundColor: '#00C49A', borderRadius: '20px', padding: '5px 20px' }}>
            Search
          </Button>
          <Button
            variant="contained"
            startIcon={<FilterListIcon />}
            sx={{ backgroundColor: '#00C49A', borderRadius: '20px', padding: '5px 20px', marginLeft: '10px' }}
          >
            Filters
          </Button>
        </Box>
      </Box>

      <Box sx={{ height: 'auto', width: '100%' }}>
      <DataGrid
  rows={rows}
  columns={columns}
  initialState={{
    pagination: {
      paginationModel: { pageSize: 10 },
    },
  }}
  pageSizeOptions={[5, 10, 20, 50]}
  checkboxSelection
  disableRowSelectionOnClick
  autoHeight
  sx={{
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: '#F5F8FA',
    },
    '& .MuiDataGrid-cell': {
      borderBottom: '1px solid #E0E0E0',
    },
    '& .MuiDataGrid-cell:focus': {
      outline: 'none',
    },
    '& .MuiDataGrid-row:hover': {
      backgroundColor: '#F5F8FA',
    },
    '& .MuiDataGrid-row.Mui-selected': {
      backgroundColor: '#FFEFEF',
    },
    '& .MuiDataGrid-root': {
      width: '100%',
    },
  }}
/>

      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
  <DialogTitle>{editingRow ? 'Edit Order' : 'New Order'}</DialogTitle>
  <DialogContent>
    <TextField
      margin="dense"
      name="donor"
      label="Donor"
      fullWidth
      variant="outlined"
      value={formData.donor}
      onChange={handleChange}
      error={!!formErrors.donor}
      helperText={formErrors.donor}
      inputProps={{ pattern: '[A-Za-z ]*' }} // Restricts input to letters and spaces
    />
    <TextField
      margin="dense"
      name="panels"
      label="Panels"
      fullWidth
      variant="outlined"
      value={formData.panels}
      onChange={handleChange}
      error={!!formErrors.panels}
      helperText={formErrors.panels}
      inputProps={{ pattern: '[A-Za-z ]*' }} // Restricts input to letters and spaces
    />
    
    <TextField
  margin="dense"
  name="barcode"
  label="Barcode"
  fullWidth
  variant="outlined"
  value={formData.barcode}
  onChange={(e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Allows only digits
    setFormData((prev) => ({
      ...prev,
      barcode: value,
    }));
    setFormErrors((prev) => ({
      ...prev,
      barcode: '', // Clear any previous errors
    }));
  }}
  error={!!formErrors.barcode}
  helperText={formErrors.barcode}
  inputProps={{ inputMode: 'numeric' }} // Numeric keyboard on mobile devices
/>

    <TextField
      margin="dense"
      name="source"
      label="Source"
      fullWidth
      variant="outlined"
      value={formData.source}
      onChange={handleChange}
      error={!!formErrors.source}
      helperText={formErrors.source}
      inputProps={{ pattern: '[A-Za-z ]*' }} // Restricts input to letters and spaces
    />
    <TextField
      margin="dense"
      name="date"
      label="Date"
      fullWidth
      variant="outlined"
      value={formData.date}
      onChange={handleChange}
      error={!!formErrors.date}
      helperText={formErrors.date}
      inputProps={{ pattern: '[A-Za-z ]*' }} // Restricts input to letters and spaces

    />
    <TextField
      margin="dense"
      name="amount"
      label="Amount"
      fullWidth
      variant="outlined"
      value={formData.amount}
      onChange={handleChange}
      error={!!formErrors.amount}
      helperText={formErrors.amount}
      inputProps={{ pattern: '[0-9]*' }} // Restricts input to digits
    />
    <TextField
      margin="dense"
      name="observedBy"
      label="Observed By"
      fullWidth
      variant="outlined"
      value={formData.observedBy}
      onChange={handleChange}
      error={!!formErrors.observedBy}
      helperText={formErrors.observedBy}
      inputProps={{ pattern: '[A-Za-z ]*' }} // Restricts input to letters and spaces
    />
    <TextField
      margin="dense"
      name="status"
      label="Status"
      fullWidth
      variant="outlined"
      value={formData.status}
      onChange={handleChange}
      error={!!formErrors.status}
      helperText={formErrors.status}
      inputProps={{ pattern: '[A-Za-z ]*' }} // Restricts input to letters and spaces
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDialog}>Cancel</Button>
    <Button onClick={handleSave} variant="contained" sx={{ backgroundColor: '#00C49A' }}>
      Save
    </Button>
  </DialogActions>
</Dialog>

    </Box>
  );
};

export default WorkOrderTable;
