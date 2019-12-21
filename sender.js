const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, connection) => {
  if (err) {
    console.log('Error connection sender');
    return;
  }
  connection.createChannel((error, channel) => {
    if (error) {
      console.log('Error channel sender');
      return;
    }
    const queue = 'mailerQueue';


    channel.assertQueue(queue, { durable: true });
    const json = {
      name: 'Dusan',
      email: 'dusangp@gmail.com',
      currencies: [
        {
          name_full: 'bitcoin (BTC)',
          price: 7860,
          max_supply: 300000,
        },
        {
          name_full: 'six eleven (611)',
          price: 1203.23,
          max_supply: 21000,
        },
      ],
    };
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(json)), { persistent: true });

    console.log('Sender sent');
  });
});
