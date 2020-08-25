import authenticateMiddleware from './AuthMiddleware';

const middleware = [
  authenticateMiddleware
];

export default middleware;
