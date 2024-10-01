export class CacheStrategy {
  constructor() {
    if (this.constructor === CacheStrategy) {
      throw new Error('Cannot instantiate abstract class');
    }
  }

  handleRequest(request, res) {
    throw new Error('Method not implemented');
  }
}