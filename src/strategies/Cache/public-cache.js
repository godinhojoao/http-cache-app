import { CacheStrategy } from './AbstractCacheStrategy.js';

export class PublicCacheStrategy extends CacheStrategy {
  handleRequest(request, res) {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300'
    });

    setTimeout(() => {
      res.end(JSON.stringify({
        data: 'public cache response!'
      }));
    }, 1000);
  }
}