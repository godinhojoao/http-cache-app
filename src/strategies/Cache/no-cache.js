import { CacheStrategy } from './AbstractCacheStrategy.js';

export class NoCacheStrategy extends CacheStrategy {
  handleRequest(request, res) {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache'
    });

    setTimeout(() => {
      res.end(JSON.stringify({
        data: 'no-cache response!'
      }));
    }, 1000);
  }
}
