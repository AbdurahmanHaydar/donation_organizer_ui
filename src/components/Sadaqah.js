import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const causes = [
  {
    id: 1,
    title: 'Feed the Hungry',
    description: 'Provide meals to those in need',
    image: 'food.jpg',
    target: 100000,
    raised: 45000,
  },
  {
    id: 2,
    title: 'Education Fund',
    description: 'Support Islamic education for underprivileged children',
    image: 'education.jpg',
    target: 250000,
    raised: 125000,
  },
  {
    id: 3,
    title: 'Masjid Construction',
    description: 'Help build and maintain local masajid',
    image: 'masjid_construction.jpg',
    target: 500000,
    raised: 300000,
  },
  {
    id: 4,
    title: 'Medical Aid',
    description: 'Provide medical assistance to those who cannot afford it',
    image: 'medical_aid.jpg',
    target: 200000,
    raised: 80000,
  },
];

const Sadaqah = () => {
  const [openDonateDialog, setOpenDonateDialog] = useState(false);
  const [selectedCause, setSelectedCause] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');

  const handleOpenDonate = (cause) => {
    setSelectedCause(cause);
    setOpenDonateDialog(true);
  };

  const handleCloseDonate = () => {
    setOpenDonateDialog(false);
    setDonationAmount('');
  };

  const handleDonate = () => {
    // Handle donation logic here
    console.log(`Donating R${donationAmount} to ${selectedCause.title}`);
    handleCloseDonate();
  };

  const calculateProgress = (raised, target) => (raised / target) * 100;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Sadaqah - Voluntary Charity
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h5" gutterBottom>
          "The example of those who spend their wealth in the cause of Allah is that of a grain that sprouts into seven ears, each bearing one hundred grains. And Allah multiplies ˹the reward even more˺ to whoever He wills. For Allah is All-Bountiful, All-Knowing."
        </Typography>
        <Typography variant="subtitle1">
          - Surah Al-Baqarah, 2:261
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {causes.map((cause) => (
          <Grid item xs={12} md={6} key={cause.id}>
            <Card elevation={3}>
              <CardMedia
                component="img"
                height="200"
                image={cause.image}
                alt={cause.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {cause.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {cause.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Progress: R {cause.raised.toLocaleString()} of R {cause.target.toLocaleString()}
                  </Typography>
                  <Box
                    sx={{
                      width: '100%',
                      height: 8,
                      bgcolor: '#e0e0e0',
                      borderRadius: 4,
                      mt: 1,
                      mb: 2,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        width: `${calculateProgress(cause.raised, cause.target)}%`,
                        height: '100%',
                        bgcolor: 'primary.main',
                        borderRadius: 4,
                        transition: 'width 0.5s ease-in-out',
                      }}
                    />
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => handleOpenDonate(cause)}
                >
                  Donate Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDonateDialog} onClose={handleCloseDonate}>
        <DialogTitle>
          Donate to {selectedCause?.title}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              autoFocus
              label="Donation Amount"
              type="number"
              fullWidth
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start">R</InputAdornment>,
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDonate}>Cancel</Button>
          <Button
            onClick={handleDonate}
            variant="contained"
            color="primary"
            disabled={!donationAmount || donationAmount <= 0}
          >
            Confirm Donation
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Sadaqah;
