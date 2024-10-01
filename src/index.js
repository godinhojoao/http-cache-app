
import { createServer } from 'node:http';
import { NoCacheStrategy } from './strategies/Cache/no-cache.js';
import { PrivateCacheStrategy } from './strategies/Cache/private-cache.js';
import { PublicCacheStrategy } from './strategies/Cache/public-cache.js';
import { ETagCacheStrategy } from './strategies/Cache/etag-cache.js';
import { LastModifiedCacheStrategy } from './strategies/Cache/last-modified-cache.js';

// Define routes and their corresponding cache strategies
const routes = {
  '/no-cache': new NoCacheStrategy(),
  '/private-cache': new PrivateCacheStrategy(),
  '/public-cache': new PublicCacheStrategy(),
  '/etag-cache': new ETagCacheStrategy(),
  '/last-modified-cache': new LastModifiedCacheStrategy(),
};

// Create the server
const app = createServer((request, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allowed methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, If-Modified-Since, If-None-Match'); // Allow specific headers

  // Handle OPTIONS preflight requests for CORS
  if (request.method === 'OPTIONS') {
    res.writeHead(204); // No content for preflight requests
    res.end();
    return;
  }

  const route = routes[request.url];
  if (route) {
    route.handleRequest(request, res);
  } else {
    res.writeHead(404, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify({
      error: 'Not found'
    }));
  }
});

app.listen(8080, () => {
  console.log('Node.js running: http://localhost:8080');
});
export { app }