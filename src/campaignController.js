const whatsappQueue = require('./queues/whatsappQueue');
const moment = require('moment-timezone');

async function scheduleWhatsAppCampaign(req, res) {
	const { numbers, message, image, scheduleTime, interval } = req.body;

	if (!numbers || numbers.length === 0) {
		return res.status(400).send('Lista de números é obrigatória.');
	}

	if (!scheduleTime) {
		return res.status(400).send('O horário de agendamento é obrigatório.');
	}

	// Convertendo a data de agendamento para o horário de Brasília
	const scheduleDate = moment.tz(scheduleTime, 'America/Sao_Paulo').toDate();

	// Verifica se a data do agendamento é válida
	if (isNaN(scheduleDate.getTime())) {
		return res.status(400).send('O formato da data de agendamento é inválido.');
	}

	// Obtendo a hora atual no horário de Brasília
	const currentTime = moment().tz('America/Sao_Paulo').toDate();

	console.log('Horário agendado:', scheduleDate);
	console.log('Horário atual:', currentTime);

	// Calculando o delay inicial em milissegundos
	const initialDelay = scheduleDate.getTime() - currentTime.getTime();

	if (initialDelay <= 0) {
		return res.status(400).send('O horário de agendamento deve ser no futuro.');
	}

	const jobDelay = initialDelay;

	whatsappQueue.add(
		{ numbers, message, image, interval },
		{ attempts: 3, delay: jobDelay }
	);

	// Retorna os IDs dos jobs agendados
	res.send({ message: 'Campanha agendada com sucesso!' });
}

module.exports = { scheduleWhatsAppCampaign };
