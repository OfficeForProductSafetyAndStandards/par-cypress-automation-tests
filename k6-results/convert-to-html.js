const fs = require('fs');
const path = require('path');

const summaryPath = path.resolve(__dirname, './summary.json');
const outputPath = path.resolve(__dirname, './summary.html');

if (!fs.existsSync(summaryPath)) {
    console.warn('⚠️  summary.json not found. Skipping report generation.');
    process.exit(0);
}

const data = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
const metrics = data.metrics;
const checks = data.root_group.checks || [];

let metricsTable = '';
for (const key in metrics) {
    const values = metrics[key].values;
    metricsTable += `<tr><td>${key}</td><td>${Object.entries(values).map(([k, v]) => `${k}: ${v}`).join('<br>')}</td></tr>`;
}

let checksTable = checks.map(check =>
    `<tr><td>${check.name}</td><td>${check.passes}</td><td>${check.fails}</td></tr>`
).join('');

const httpDurationStats = metrics['http_req_duration']?.values || {};
const labels = Object.keys(httpDurationStats);
const values = Object.values(httpDurationStats);

const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>PAR K6 Performance Summary</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    body { font-family: Arial, sans-serif; margin: 2rem; }
    h1 { color: #2c3e50; }
    table { border-collapse: collapse; width: 100%; margin-bottom: 2rem; }
    th, td { border: 1px solid #ccc; padding: 0.5rem; text-align: left; }
    th { background-color: #f4f4f4; }
    canvas { max-width: 800px; margin-bottom: 2rem; }
  </style>
</head>
<body>
  <h1>📊 PAR K6 Performance Report</h1>

  <h2>📈 http_req_duration Overview</h2>
  <canvas id="durationChart"></canvas>
  <script>
    const ctx = document.getElementById('durationChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ${JSON.stringify(labels)},
        datasets: [{
          label: 'http_req_duration (ms)',
          data: ${JSON.stringify(values)},
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Milliseconds' }
          }
        }
      }
    });
  </script>

  <h2>✅ Checks</h2>
  <table>
    <thead><tr><th>Check Name</th><th>Passes</th><th>Fails</th></tr></thead>
    <tbody>${checksTable}</tbody>
  </table>

  <h2>📊 All Metrics</h2>
  <table>
    <thead><tr><th>Metric</th><th>Values</th></tr></thead>
    <tbody>${metricsTable}</tbody>
  </table>
</body>
</html>
`;

fs.writeFileSync(outputPath, html);
console.log(`✅ HTML report with chart generated at: ${outputPath}`);
