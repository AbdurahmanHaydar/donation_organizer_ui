import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  InputAdornment,
  Alert,
  Tabs,
  Tab,
  Divider,
} from '@mui/material';
import {
  CalendarMonth as CalendarIcon,
  Restaurant as FoodIcon,
  Favorite as CharityIcon,
} from '@mui/icons-material';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const Ramadan = () => {
  const [tabValue, setTabValue] = useState(0);
  const [fitrAmount, setFitrAmount] = useState(0);
  const [familyMembers, setFamilyMembers] = useState(1);

  // Zakat al-Fitr rate per person (example rate in ZAR)
  const fitrRate = 150;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const calculateFitr = () => {
    return fitrRate * familyMembers;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Ramadan Donations
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h5" gutterBottom>
          "Whoever gives food to a fasting person to break his fast, shall have his sins forgiven..."
        </Typography>
        <Typography variant="subtitle1">
          - Hadith, Ibn Khuzaymah
        </Typography>
      </Paper>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="ramadan donation tabs">
          <Tab icon={<CalendarIcon />} label="Zakat al-Fitr" />
          <Tab icon={<FoodIcon />} label="Iftar Sponsorship" />
          <Tab icon={<CharityIcon />} label="General Sadaqah" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Calculate Zakat al-Fitr
              </Typography>
              <Alert severity="info" sx={{ mb: 3 }}>
                Current rate per person: R {fitrRate}
              </Alert>
              <TextField
                fullWidth
                label="Number of Family Members"
                type="number"
                value={familyMembers}
                onChange={(e) => setFamilyMembers(Math.max(1, parseInt(e.target.value) || 1))}
                sx={{ mb: 3 }}
              />
              <Typography variant="h5" color="primary" gutterBottom>
                Total Zakat al-Fitr: R {calculateFitr().toLocaleString()}
              </Typography>
              <Button variant="contained" color="primary" fullWidth>
                Pay Zakat al-Fitr
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Important Information
              </Typography>
              <Typography variant="body1" paragraph>
                Zakat al-Fitr is mandatory charity given at the end of Ramadan before Eid prayer.
              </Typography>
              <Typography variant="body1" paragraph>
                It must be paid for every member of the household, including children and elderly.
              </Typography>
              <Typography variant="body1">
                The amount should be sufficient to feed one person for one day.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Single Iftar
                </Typography>
                <Typography variant="h4" color="primary" gutterBottom>
                  R 100
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Sponsor one person's iftar meal
                </Typography>
                <Button variant="contained" color="primary" fullWidth>
                  Sponsor Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Family Iftar
                </Typography>
                <Typography variant="h4" color="primary" gutterBottom>
                  R 500
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Sponsor iftar for a family of 5
                </Typography>
                <Button variant="contained" color="primary" fullWidth>
                  Sponsor Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Masjid Iftar
                </Typography>
                <Typography variant="h4" color="primary" gutterBottom>
                  R 2,500
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Sponsor iftar for 25 people at a local masjid
                </Typography>
                <Button variant="contained" color="primary" fullWidth>
                  Sponsor Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Ramadan Sadaqah
              </Typography>
              <Typography variant="body1" paragraph>
                The rewards for voluntary charity are multiplied during Ramadan.
              </Typography>
              <TextField
                fullWidth
                label="Donation Amount"
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">R</InputAdornment>,
                }}
                sx={{ mb: 3 }}
              />
              <Button variant="contained" color="primary" fullWidth>
                Donate Now
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Virtues of Charity in Ramadan
              </Typography>
              <Typography variant="body1" paragraph>
                Ibn `Abbas (May Allah be pleased with them) reported: The Messenger of Allah (sallallaahu alayhi wa sallam) was the most generous of the men; and he was the most generous during the month of Ramadan when Jibril visited him every night and recited the Qur’an to him. During this period, the generosity of Messenger of Allah (sallallaahu alayhi wa sallam) waxed faster than the rain bearing wind.
                -  [Al-Bukhari and Muslim].
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="text.secondary">
                Your donations will help:
              </Typography>
              <ul>
                <li>Feed the hungry</li>
                <li>Support orphans</li>
                <li>Help the needy</li>
                <li>Build masajid</li>
              </ul>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>
    </Container>
  );
};

export default Ramadan;
