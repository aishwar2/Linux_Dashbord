console.log("script.js is loaded and running");

async function fetchMetrics() {
    const response = await fetch('/metrics');
    const data = await response.text();
    const lines = data.split('\n').slice(1);
    const metrics = {
        server1: { labels: [], cpu: [], ram: [], storage: [], network: [] },
        server2: { labels: [], cpu: [], ram: [], storage: [], network: [] },
        server3: { labels: [], cpu: [], ram: [], storage: [], network: [] }
    };

    lines.forEach(line => {
        if (line) {
            const [server, cpu, ram, storage, network] = line.split(',');
            if (server === "192.168.204.153") {
                metrics.server1.labels.push(server);
                metrics.server1.cpu.push(cpu);
                metrics.server1.ram.push(ram);
                metrics.server1.storage.push(storage);
                metrics.server1.network.push(network);
            } else if (server === "192.168.204.152") {
                metrics.server2.labels.push(server);
                metrics.server2.cpu.push(cpu);
                metrics.server2.ram.push(ram);
                metrics.server2.storage.push(storage);
                metrics.server2.network.push(network);
            } else if (server === "192.168.204.151") {
                metrics.server3.labels.push(server);
                metrics.server3.cpu.push(cpu);
                metrics.server3.ram.push(ram);
                metrics.server3.storage.push(storage);
                metrics.server3.network.push(network);
            }
        }
    });

    return metrics;
}

async function createChart() {
    const data = await fetchMetrics();

    const createServerChart = (ctx, metrics, serverLabel) => {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['CPU', 'RAM', 'Storage', 'Network'],
                datasets: [
                    {
                        label: serverLabel,
                        data: [metrics.cpu, metrics.ram, metrics.storage, metrics.network],
                        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 205, 86, 0.2)', 'rgba(255, 159, 64, 0.2)'],
                        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 205, 86, 1)', 'rgba(255, 159, 64, 1)'],
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    const ctxServer1 = document.getElementById('server1Chart').getContext('2d');
    createServerChart(ctxServer1, data.server1, 'Server 1');

    const ctxServer2 = document.getElementById('server2Chart').getContext('2d');
    createServerChart(ctxServer2, data.server2, 'Server 2');

    const ctxServer3 = document.getElementById('server3Chart').getContext('2d');
    createServerChart(ctxServer3, data.server3, 'Server 3');
}

createChart();
setInterval(createChart, 10000); // Update every 10 seconds
