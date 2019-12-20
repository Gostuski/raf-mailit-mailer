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
      age: 21,
    };
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(json)), { persistent: true });

    console.log('Sender sent');
  });
});
