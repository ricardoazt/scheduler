const { parentPort, workerData } = require('worker_threads');
const sleep = require('./sleep');
// const { sendWhatsApp } = require('./sendWhatsAppModule'); // Caminho para o módulo onde `sendWhatsApp` está exportado

(async () => {
    try {
        const { numbers, message, image, interval } = workerData;
        for (const phone of numbers) {
            try {
                // await sendWhatsApp(phone, message, image);
                console.log(`Mensagem enviada para ${phone}`);
            } catch (error) {
                console.error(`Erro ao enviar mensagem para ${phone}: ${error.message}`);
            }

            await sleep(interval);
        }

        parentPort.postMessage('Mensagem enviada com sucesso!');
    } catch (error) {
        parentPort.postMessage(`Erro: ${error.message}`);
    }
})();