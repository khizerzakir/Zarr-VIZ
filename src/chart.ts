import Chart from 'chart.js/auto'

let chart: Chart | null = null

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export function renderChart(canvasId: string, data: number[]) {
  const canvas = document.querySelector<HTMLCanvasElement>(`#${canvasId}`)!
  if (chart) chart.destroy()

  chart = new Chart(canvas, {
    type: 'line',
    data: {
      labels: MONTHS,
      datasets: [{
        label: 'Avg Temp (°C)',
        data,
        borderColor: '#f89540',
        backgroundColor: 'rgba(248,149,64,0.12)',
        pointBackgroundColor: '#f0f921',
        pointRadius: 4,
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 400 },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const y = typeof ctx.parsed.y === 'number' ? ctx.parsed.y : NaN
              return Number.isFinite(y) ? ` ${y.toFixed(1)} °C` : ' N/A'
            }
          }
        }
      },
      scales: {
        x: { grid: { color: '#2a2a3e' }, ticks: { color: '#aaa', font: { size: 10 } } },
        y: { grid: { color: '#2a2a3e' }, ticks: { color: '#aaa', font: { size: 10 }, callback: (v) => `${v}°` } }
      }
    }
  })
}

export function destroyChart() {
  chart?.destroy()
  chart = null
}