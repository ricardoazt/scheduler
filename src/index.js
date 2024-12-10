const express = require('express');
const bodyParser = require('body-parser');
const { scheduleWhatsAppCampaign } = require('./campaignController');

const app = express();
app.use(bodyParser.json());

// Rota para agendar a campanha
app.post('/schedule/whatsapp', scheduleWhatsAppCampaign);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
