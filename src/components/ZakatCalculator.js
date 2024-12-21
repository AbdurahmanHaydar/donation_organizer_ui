import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Divider,
  Alert,
  InputAdornment,
} from '@mui/material';

const ZakatCalculator = () => {
  const [assets, setAssets] = useState({
    cash: 0,
    gold: 0,
    silver: 0,
    stocks: 0,
    propertyForTrade: 0,
    otherInvestments: 0,
  });

  const [liabilities, setLiabilities] = useState({
    debts: 0,
    expenses: 0,
  });

  const nisabValue = 89575; // Approximate nisab value in ZAR (subject to change)
  
  const calculateZakat = () => {
    const totalAssets = Object.values(assets).reduce((a, b) => a + Number(b), 0);
    const totalLiabilities = Object.values(liabilities).reduce((a, b) => a + Number(b), 0);
    const netWorth = totalAssets - totalLiabilities;
    return netWorth >= nisabValue ? netWorth * 0.025 : 0;
  };

  const handleAssetChange = (field) => (event) => {
    const value = event.target.value === '' ? 0 : Number(event.target.value);
    setAssets({ ...assets, [field]: value });
  };

  const handleLiabilityChange = (field) => (event) => {
    const value = event.target.value === '' ? 0 : Number(event.target.value);
    setLiabilities({ ...liabilities, [field]: value });
  };

  const totalZakat = calculateZakat();
  const totalAssets = Object.values(assets).reduce((a, b) => a + Number(b), 0);
  const totalLiabilities = Object.values(liabilities).reduce((a, b) => a + Number(b), 0);
  const netWorth = totalAssets - totalLiabilities;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Zakat Calculator
      </Typography>
      
      <Alert severity="info" sx={{ mb: 4 }}>
        Current Nisab Value: R {nisabValue.toLocaleString()} 
        <br />
        Note: This is an approximate value. Please consult with your local scholar for the most accurate nisab value.
      </Alert>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Assets
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Cash & Bank Balances"
                type="number"
                value={assets.cash || ''}
                onChange={handleAssetChange('cash')}
                InputProps={{
                  startAdornment: <InputAdornment position="start">R</InputAdornment>,
                }}
              />
              <TextField
                label="Gold Value"
                type="number"
                value={assets.gold || ''}
                onChange={handleAssetChange('gold')}
                InputProps={{
                  startAdornment: <InputAdornment position="start">R</InputAdornment>,
                }}
              />
              <TextField
                label="Silver Value"
                type="number"
                value={assets.silver || ''}
                onChange={handleAssetChange('silver')}
                InputProps={{
                  startAdornment: <InputAdornment position="start">R</InputAdornment>,
                }}
              />
              <TextField
                label="Stocks & Shares"
                type="number"
                value={assets.stocks || ''}
                onChange={handleAssetChange('stocks')}
                InputProps={{
                  startAdornment: <InputAdornment position="start">R</InputAdornment>,
                }}
              />
              <TextField
                label="Property for Trade"
                type="number"
                value={assets.propertyForTrade || ''}
                onChange={handleAssetChange('propertyForTrade')}
                InputProps={{
                  startAdornment: <InputAdornment position="start">R</InputAdornment>,
                }}
              />
              <TextField
                label="Other Investments"
                type="number"
                value={assets.otherInvestments || ''}
                onChange={handleAssetChange('otherInvestments')}
                InputProps={{
                  startAdornment: <InputAdornment position="start">R</InputAdornment>,
                }}
              />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Liabilities
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Debts & Loans"
                type="number"
                value={liabilities.debts || ''}
                onChange={handleLiabilityChange('debts')}
                InputProps={{
                  startAdornment: <InputAdornment position="start">R</InputAdornment>,
                }}
              />
              <TextField
                label="Due Expenses"
                type="number"
                value={liabilities.expenses || ''}
                onChange={handleLiabilityChange('expenses')}
                InputProps={{
                  startAdornment: <InputAdornment position="start">R</InputAdornment>,
                }}
              />
            </Box>
          </Paper>

          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Summary
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography>
                Total Assets: R {totalAssets.toLocaleString()}
              </Typography>
              <Typography>
                Total Liabilities: R {totalLiabilities.toLocaleString()}
              </Typography>
              <Divider />
              <Typography>
                Net Worth: R {netWorth.toLocaleString()}
              </Typography>
              <Typography variant="h5" color="primary" sx={{ mt: 2 }}>
                Zakat Due: R {totalZakat.toLocaleString()}
              </Typography>
              {netWorth < nisabValue && (
                <Alert severity="info">
                  Your net worth is below the Nisab value. No Zakat is due at this time.
                </Alert>
              )}
              {netWorth >= nisabValue && (
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ mt: 2 }}
                >
                  Pay Zakat Now
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ZakatCalculator;
