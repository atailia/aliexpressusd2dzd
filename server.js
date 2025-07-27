const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/usdt-dzd', async (req, res) => {
  try {
    const response = await axios.post(
      'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
      {
        asset: 'USDT',
        fiat: 'DZD',
        merchantCheck: false,
        page: 1,
        payTypes: [],
        publisherType: null,
        rows: 1,
        tradeType: 'SELL'
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const price = response.data.data[0].adv.price;
    res.json({ price: parseFloat(price) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch price' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
