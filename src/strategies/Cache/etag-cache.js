import { CacheStrategy } from './AbstractCacheStrategy.js';

export class ETagCacheStrategy extends CacheStrategy {
  handleRequest(request, res) {
    const etag = '12345'; // Generate ETag based on request or resource
    if (request.headers['if-none-match'] === etag) {
      res.writeHead(304, {
        'ETag': etag,
        'Cache-Control': 'public, max-age=60'
      });
      res.end();
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'ETag': etag,
        'Cache-Control': 'public, max-age=60'
      });
      setTimeout(() => {
        res.end(JSON.stringify({
          data: 'ETag cache response!'
        }));
      }, 1000);
    }
  }
}