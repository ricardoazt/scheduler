const { Worker } = require('worker_threads');
const path = require('path');

function sendWhatsApp(numbers, message, image, interval) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(path.resolve(__dirname, 'worker.js'), {
            workerData: { numbers, message, image, interval },
        });

        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0) {
                reject(new Error(`Worker finalizado com código: ${code}`));
            }
        });
    });
}

module.exports = { sendWhatsApp };
