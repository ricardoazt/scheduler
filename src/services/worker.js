const { parentPort, workerData } = require('worker_threads');
const sleep = require('./sleep');
let calcAuxSize = 0;
let incrementSize = 0;

// const { sendWhatsApp } = require('./sendWhatsAppModule'); // Caminho para o módulo onde `sendWhatsApp` está exportado

(async () => {
    try {
        const { numbers, message, image, interval } = workerData;

        calcAuxSize = 100 / numbers.length;

        for (const phone of numbers) {
            try {
                // await sendWhatsApp(phone, message, image);
                console.log(`Mensagem enviada para ${phone}`);
            } catch (error) {
                console.error(`Erro ao enviar mensagem para ${phone}: ${error.message}`);
            }

            incrementSize++;

            // Imprime a porcentagem do envio e tempo restante no console
            console.log(Math.floor((calcAuxSize * incrementSize)) + "% Tempo restante: " + ((numbers.length - incrementSize) * (interval / 1000) + "s"));

            await sleep(interval);
        }

        parentPort.postMessage('Mensagem enviada com sucesso!');
    } catch (error) {
        parentPort.postMessage(`Erro: ${error.message}`);
    }
})();