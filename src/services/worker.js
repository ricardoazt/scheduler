const { parentPort, workerData } = require('worker_threads');
const delay = require('./delay');
// const { sendWhatsApp } = require('./sendWhatsAppModule'); // Caminho para o módulo onde `sendWhatsApp` está exportado

(async () => {
    try {
        const { numbers, message, image } = workerData;
        for (const phone of numbers) {
            try {
                // await sendWhatsApp(phone, message, image);
                console.log(`Mensagem enviada para ${phone}`);
                // await delay(2000);
            } catch (error) {
                console.error(`Erro ao enviar mensagem para ${phone}: ${error.message}`);
            }
        }

        parentPort.postMessage('Mensagem enviada com sucesso!');
    } catch (error) {
        parentPort.postMessage(`Erro: ${error.message}`);
    }
})();