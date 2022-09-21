const accountSid = 'ACea1c5b232d2ff55565012eaffbc76adf';
const authToken = 'a43f5a278d96061678ab5eb119ea2091';
const client = require('twilio')(accountSid, authToken);

client.messages
	.create({
		body: 'hello this is from qpey engineeering team thanks for registering',
		messagingServiceSid: 'MG66776ef213feac97e63f2a186e4c298f',
		to: '+256756008970',
	})
	.then((message: { sid: any }) => console.log(message.sid))
	.done();
