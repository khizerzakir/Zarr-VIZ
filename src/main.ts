import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { ZarrLayer } from '@carbonplan/zarr-layer'
import './style.css'
import { buildPanel } from './panel'
import { renderChart, destroyChart } from './chart'

// ── Config ──────────────────────────────────────────────────────────────────
const ZARR_SOURCE = 'https://carbonplan-maps.s3.us-west-2.amazonaws.com/v2/demo/4d/tavg-prec-month'
// 👇 Replace with your own Zarr store URL
// const ZARR_SOURCE = 'https://your-bucket.s3.region.amazonaws.com/path/to/store'

const COLORMAP = ['#0d0887', '#7e03a8', '#cc4778', '#f89540', '#f0f921'] // plasma
const CLIM: [number, number] = [-20, 30]
const VARIABLE = 'climate'
const DEFAULT_SELECTOR = { band: 'tavg', month: 1 }

// ── DOM ──────────────────────────────────────────────────────────────────────
buildPanel()  // injects sidebar HTML
console.log('App initialized')
const map = new maplibregl.Map({
  container: 'map',
  style: {
    version: 8,
    sources: {
      osm: {
        type: 'raster',
        tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '© OpenStreetMap'
      }
    },
    layers: [{ id: 'osm', type: 'raster', source: 'osm' }]
  },
  center: [0, 20],
  zoom: 1.5
})

map.on('load', () => {
  // ── Layer ──────────────────────────────────────────────────────────────────
  const layer = new ZarrLayer({
    id: 'zarr-layer',
    source: ZARR_SOURCE,
    variable: VARIABLE,
    clim: CLIM,
    colormap: COLORMAP,
    zarrVersion: 2,           // set to 3 if using zarr v3
    selector: DEFAULT_SELECTOR
  })

  map.addLayer(layer)

  // ── Month slider ───────────────────────────────────────────────────────────
  const slider = document.querySelector<HTMLInputElement>('#month-slider')!
  const monthLabel = document.querySelector<HTMLElement>('#month-display')!

  slider.addEventListener('input', async (e) => {
    const month = Number((e.target as HTMLInputElement).value)
    monthLabel.textContent = MONTH_NAMES[month - 1]
    await layer.setSelector({ band: 'tavg', month })
  })

  // ── Query mode ─────────────────────────────────────────────────────────────
  let queryMode = false
  const queryBtn = document.querySelector<HTMLButtonElement>('#query-btn')!

  queryBtn.addEventListener('click', () => {
    queryMode = !queryMode
    queryBtn.classList.toggle('active', queryMode)
    queryBtn.textContent = queryMode ? '✕ Exit Query Mode' : '⊕ Query Point'
    map.getCanvas().style.cursor = queryMode ? 'crosshair' : ''
  })

  map.on('click', async (e) => {
    if (!queryMode) return
    const { lng, lat } = e.lngLat

    try {
      // Fetch all 12 months for the time series
      const monthlyValues: number[] = []
      for (let m = 1; m <= 12; m++) {
        const result = await layer.queryData(
          { type: 'Point', coordinates: [lng, lat] },
          { band: 'tavg', month: m }
        )
        monthlyValues.push((result[VARIABLE] as number[])[0])
      }

      // Update sidebar
      document.querySelector('#query-coords')!.textContent =
        `${lat.toFixed(3)}°, ${lng.toFixed(3)}°`
      document.querySelector('#query-value')!.textContent =
        `${monthlyValues[0].toFixed(1)} °C`
      document.querySelector<HTMLElement>('#query-panel')!.style.display = 'block'

      // Draw chart
      renderChart('query-chart', monthlyValues)
    } catch (err) {
      console.error('Query failed:', err)
    }
  })

  // ── Clear button ───────────────────────────────────────────────────────────
  document.querySelector('#clear-btn')?.addEventListener('click', () => {
    document.querySelector<HTMLElement>('#query-panel')!.style.display = 'none'
    destroyChart()
  })
})

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']