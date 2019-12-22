const amqp = require('amqplib/callback_api');
const sendMail = require('./mailer');

async function connectQueue() {
  amqp.connect('amqp://localhost', (err, connection) => {
    if (err) {
      console.log('failed to connect to queue');
      return;
    }

    connection.createChannel((err1, channel) => {
      if (err1) {
        console.log('Error creating channel.');
        return;
      }

      const queue = 'mailerQueue';

      channel.assertQueue(queue, { durable: true });

      channel.prefetch(1);

      channel.consume(queue, async (message) => {
        const data = JSON.parse(message.content.toString());
        sendMail(data)
          .then(() => channel.ack(message))
          .catch((error) => console.error('ERROR: ', error));
      }, { noAck: false });
    });
  });
}

module.exports = connectQueue;
