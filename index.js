const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// 设置代理
app.use(
  '/',
  createProxyMiddleware({
    target: 'https://api.groq.com', // 目标 API 地址
    changeOrigin: true, // 修改请求头中的 Origin
    pathRewrite: { '^/': '/openai/' }, // 重写路径
    onProxyReq: (proxyReq, req, res) => {
      // 如果需要，可以在这里添加自定义请求头
      proxyReq.setHeader('Authorization', req.headers.authorization || '');
    },
  })
);

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server is running on http://localhost:${PORT}`);
});
