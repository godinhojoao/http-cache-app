import { CacheStrategy } from './AbstractCacheStrategy.js';

let inMemoryLastModified = new Date();

export class LastModifiedCacheStrategy extends CacheStrategy {
  handleRequest(request, res) {
    const receivedModifiedSince = request.headers['if-modified-since'];

    const receivedDate = new Date(receivedModifiedSince);

    if (receivedDate.getTime() <= inMemoryLastModified.getTime()) {
      res.writeHead(304, {
        'Last-Modified': inMemoryLastModified.toUTCString(),
        'Cache-Control': 'public, max-age=60'
      });
      res.end();
    } else {
      inMemoryLastModified = new Date(); // Reset to current time on new data
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Last-Modified': inMemoryLastModified.toUTCString(),
        'Cache-Control': 'public, max-age=60'
      });
      res.end(JSON.stringify({
        data: 'last-modified cache response!'
      }));
    }
  }

}