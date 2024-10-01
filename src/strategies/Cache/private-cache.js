import { CacheStrategy } from './AbstractCacheStrategy.js';

export class PrivateCacheStrategy extends CacheStrategy {
  handleRequest(request, res) {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Cache-Control': 'private, max-age=300'
    });

    setTimeout(() => {
      res.end(JSON.stringify({
        data: 'private cache response.'
      }));
    }, 1000);
  }
}