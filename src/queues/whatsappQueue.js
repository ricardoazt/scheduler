const Queue = require('bull');
const { sendWhatsApp } = require('../services/whatsappService'); // Seu método de envio


const whatsappQueue = new Queue('whatsappQueue', {
	redis: {
		host: '127.0.0.1',       // Endereço do Redis
		port: 6379,              // Porta do Redis
		// password: '1pbns11'  // Senha de acesso ao Redis
	}
});

// Processamento das mensagens
whatsappQueue.process(async (job) => {
	const { numbers, message, image } = job.data;
	await sendWhatsApp(numbers, message, image); // Chama seu método de envio

});

whatsappQueue.on('completed', (job) => {
	console.log(`Job ${job.id} concluído com sucesso.`);
});

whatsappQueue.on('failed', (job, err) => {
	console.error(`Job ${job.id} falhou: ${err.message}`);
});



module.exports = whatsappQueue;