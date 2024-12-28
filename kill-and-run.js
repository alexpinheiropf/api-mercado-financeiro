const kill = require('kill-port');
const net = require('net');
const { exec } = require('child_process');

const PORT = 3000;

// Função para verificar se a porta está ocupada
const isPortInUse = (port) => {
    return new Promise((resolve) => {
        const server = net.createServer();

        server.once('error', () => resolve(true)); // Porta em uso
        server.once('listening', () => {
            server.close();
            resolve(false); // Porta livre
        });

        server.listen(port);
    });
};

// Função para encerrar servidores no Windows
const killWindowsPort = (port) => {
    return new Promise((resolve, reject) => {
        exec(`netstat -ano | findstr :${port}`, (err, stdout) => {
            if (err) return resolve();

            const lines = stdout.split('\n').filter((line) => line.includes('LISTENING'));
            const pid = lines[0]?.split(/\s+/)?.pop();

            if (pid) {
                exec(`taskkill /F /PID ${pid}`, (error) => {
                    if (error) return reject(error);
                    resolve();
                });
            } else {
                resolve();
            }
        });
    });
};

// Função principal
(async () => {
    try {
        console.log(`Verificando porta ${PORT}...`);
        if (await isPortInUse(PORT)) {
            console.log(`Porta ${PORT} em uso. Tentando encerrar processos...`);
            if (process.platform === 'win32') {
                await killWindowsPort(PORT);
            } else {
                await kill(PORT, 'tcp');
            }
            console.log(`Porta ${PORT} liberada.`);
        } else {
            console.log(`Porta ${PORT} já está livre.`);
        }

        console.log(`Iniciando o servidor...`);
        require('./src/app');
    } catch (err) {
        console.error(`Erro ao liberar a porta ou reiniciar o servidor:`, err);
        process.exit(1);
    }
})();
