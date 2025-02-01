// index.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = process.env.PORT || 3000;

app.use('/openai', createProxyMiddleware({
  target: 'https://api.groq.com/openai',
  changeOrigin: true,
  pathRewrite: { '^/openai': '' },
}));

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
