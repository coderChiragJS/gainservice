import React from 'react';
import { Box, Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Layout from 'Layouts';

const CustomButton = styled(Button)({
  backgroundColor: '#00C49A',
  color: '#fff',
  padding: '10px 20px',
  borderRadius: '25px',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#00A386',
  },
});

const CustomSelect = styled(Select)({
  backgroundColor: '#F5F8FA',
});

const CustomTextField = styled(TextField)({
  backgroundColor: '#F5F8FA',
});

const Home: React.FC = () => {
  return (
    <Layout title="Reports">
      <Box sx={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom>Reports</Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Select Report Type</InputLabel>
              <CustomSelect>
                <MenuItem value="">Report Type 1</MenuItem>
                <MenuItem value="">Report Type 2</MenuItem>
                <MenuItem value="">Report Type 3</MenuItem>
              </CustomSelect>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <CustomTextField label="Start Date" type="date" InputLabelProps={{ shrink: true }} fullWidth />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <CustomTextField label="Due Date" type="date" InputLabelProps={{ shrink: true }} fullWidth />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Agency</InputLabel>
              <CustomSelect>
                <MenuItem value="">Agency 1</MenuItem>
                <MenuItem value="">Agency 2</MenuItem>
                <MenuItem value="">Agency 3</MenuItem>
              </CustomSelect>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Select Format</InputLabel>
              <CustomSelect>
                <MenuItem value="">PDF</MenuItem>
                <MenuItem value="">Excel</MenuItem>
                <MenuItem value="">Word</MenuItem>
              </CustomSelect>
            </FormControl>
          </Grid>
        </Grid>

        <Box mt={4}>
          <Typography variant="h6">Use Date</Typography>
          <RadioGroup defaultValue="collected" row>
            <FormControlLabel value="collected" control={<Radio sx={{ color: '#00C49A', '&.Mui-checked': { color: '#00C49A' } }} />} label="Collected" />
            {/* Add more radio buttons here if needed */}
          </RadioGroup>
        </Box>

        <Box mt={4} display="flex" justifyContent="flex-end">
          <CustomButton variant="contained">Submit</CustomButton>
        </Box>
      </Box>
    </Layout>
  );
};

export default Home;
