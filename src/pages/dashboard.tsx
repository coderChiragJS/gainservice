import React, { useEffect, useState } from 'react';
import { Box, Button, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
// import Layout from 'Layouts';
import LayoutPage from 'Layouts';

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

const CustomTextField = styled(TextField)({
  backgroundColor: '#F5F8FA',
});

const Home: React.FC = () => {
  const [reportType, setReportType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [agency, setAgency] = useState('');
  const [format, setFormat] = useState('');
  const [useDate, setUseDate] = useState('collected');

  const handleSubmit = () => {
    alert('Submitted successfully');
  };
  //   console.log({
  //     reportType,
  //     startDate,
  //     dueDate,
  //     agency,
  //     format,
  //     useDate,
  //   });
  // };
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <LayoutPage>
      <Box sx={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Reports
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <CustomTextField
              select
              label="Select Report Type"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              fullWidth
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    style: {
                      backgroundColor: '#F5F8FA',
                    },
                  },
                },
              }}
              InputLabelProps={{ shrink: true }}
            >
              <MenuItem value="report1">Report Type 1</MenuItem>
              <MenuItem value="report2">Report Type 2</MenuItem>
              <MenuItem value="report3">Report Type 3</MenuItem>
            </CustomTextField>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <CustomTextField
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <CustomTextField
              label="Due Date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <CustomTextField
              select
              label="Agency"
              value={agency}
              onChange={(e) => setAgency(e.target.value)}
              fullWidth
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    style: {
                      backgroundColor: '#F5F8FA',
                    },
                  },
                },
              }}
              InputLabelProps={{ shrink: true }}
            >
              <MenuItem value="agency1">Agency 1</MenuItem>
              <MenuItem value="agency2">Agency 2</MenuItem>
              <MenuItem value="agency3">Agency 3</MenuItem>
            </CustomTextField>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <CustomTextField
              select
              label="Select Format"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              fullWidth
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    style: {
                      backgroundColor: '#F5F8FA',
                    },
                  },
                },
              }}
              InputLabelProps={{ shrink: true }}
            >
              <MenuItem value="pdf">PDF</MenuItem>
              <MenuItem value="excel">Excel</MenuItem>
              <MenuItem value="word">Word</MenuItem>
            </CustomTextField>
          </Grid>
        </Grid>

        <Box mt={4}>
          <Typography variant="h6">Use Date</Typography>
          <RadioGroup value={useDate} onChange={(e) => setUseDate(e.target.value)} row>
            <FormControlLabel
              value="collected"
              control={<Radio sx={{ color: '#00C49A', '&.Mui-checked': { color: '#00C49A' } }} />}
              label="Collected"
            />
          </RadioGroup>
        </Box>

        <Box mt={4} display="flex" justifyContent="flex-end">
          <CustomButton variant="contained" onClick={handleSubmit}>
            Submit
          </CustomButton>
        </Box>
      </Box>
    </LayoutPage>
  );
};

export default Home;
