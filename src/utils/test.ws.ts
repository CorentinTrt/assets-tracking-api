import { StreamClient } from 'cw-sdk-node';

const client = new StreamClient({
  creds: {
    apiKey: 'BJ8P94XFM2ESH6T4D6O8', // your cw api key
    secretKey: 'UX3jDIz8EePjC/ELQA0OSonB2/gMZuIsanRUzppW', // your cw secret key
  },
  subscriptions: [
    // 'markets:87:trades', // kraken btc:usd
    // 'pairs:9:trades', // btc/usd pair
    // 'markets:1:trades',
    // 'assets:1:performance'
  ],
  logLevel: 'debug',
});

// Handlers for market and pair data
client.onMarketUpdate(marketData => {
  console.log(marketData);
});
client.onPairUpdate(pairData => {
  console.log(pairData);
});

// Error handling
client.onError(err => {
  console.error(err);
});

// You can also listen on state changes
client.onStateChange(newState => {
  console.log('connection state changed:', newState);
});

// client.onConnect(() => {
//   console.info('streaming data for the next 15 seconds...');
//   setTimeout(() => {
//     client.disconnect();
//   }, 15 * 1000);
// });

// client.onDisconnect(() => {
//   console.log('done');
// });

// Connect to stream
export default function () {
  client.connect();
}
