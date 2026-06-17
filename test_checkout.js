const payload = {
  customer: {
    firstName: "Francis",
    lastName: "Delacroix",
    email: "francis@example.com",
    phone: "18437320661",
    country: "Canada",
    province: "Quebec",
    city: "Montreal",
    address: "7400 Boulevard Saint-Laurent",
    postalCode: "H2R 2Y1"
  },
  items: [
    {
      productId: "ca-100-stack",
      productName: "Buy Counterfeit $100 Canadian Dollars Banknotes (Compact Bundle)",
      quantity: 1,
      price: 400
    }
  ],
  paymentMethod: "crypto",
  subtotal: 400,
  shipping: 20,
  discount: 0,
  total: 420
};

fetch('http://localhost:3000/api/checkout', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
})
  .then(res => res.json())
  .then(data => console.log('Response:', data))
  .catch(err => console.error('Error:', err));
