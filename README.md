# Zarr-VIZ

A geospatial data visualization tool for Zarr-formatted datasets built with TypeScript, Vite, MapLibre-GL, and Chart.js. Zarr-VIZ enables interactive exploration and analysis of large-scale scientific data, with support for multiple regions and datasets specifically for the Sahel region.

## Features

- **Interactive Map Visualization** – Built with MapLibre-GL for seamless geospatial data rendering
- **Zarr Data Layer** – Efficiently load and visualize cloud-optimized Zarr arrays using @carbonplan/zarr-layer
- **Data Analytics Dashboard** – Real-time charts and statistics powered by Chart.js (will be updated with more features)
- **Multi-Region Support** – Query and visualize data across different geographic regions (It only supports point for now)
- **TypeScript Support** – Full type safety and IDE autocomplete

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Git

### Clone the Repository

```bash
git clone https://github.com/khizerzakir/Zarr-VIZ.git
cd Zarr-VIZ
```

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Starts a development server with hot module replacement at `http://localhost:5173`

### Build

```bash
npm run build
```

Produces optimized production build with TypeScript type checking.

### Type Checking

```bash
npm run typecheck
```

## Project Structure

```
src/
  ├── main.ts        # Application entry point
  ├── panel.ts       # UI panel components
  ├── chart.ts       # Chart.js integration and visualization logic
  ├── counter.ts     # State management utilities
  ├── style.css      # Global styles
public/              # Static assets
```

## Usage

### Basic Visualization

1. Start the development server: `npm run dev`
2. Open your browser and load a Zarr dataset
3. Select a region to query and visualize data
4. View statistics and trends in the analytics panel

### Loading Datasets

Datasets should be in Zarr format. The application supports both local and remote Zarr stores:

```typescript
// Example: Loading a remote Zarr dataset
const dataset = await zarr.open('https://example.com/data.zarr');
```

## Possible Extensions

### Region Query Enhancements

- **Custom Region Polygon Selection** – Allow users to draw custom polygons on the map for ad-hoc region queries rather than predefined regions
- **Batch Region Queries** – Query multiple regions simultaneously and compare results across regions
- **Region History & Favorites** – Save frequently used regions for quick access
- **Fuzzy Region Search** – Search regions by name with autocomplete suggestions
- **Hierarchical Region Navigation** – Drill-down from continental → country → district levels

### Data Query & Analysis

- **Time Series Analysis** – Extract and visualize temporal trends for specific regions
- **Statistical Comparisons** – Compare statistics across multiple selected regions
- **Data Export Formats** – Export query results as CSV, GeoJSON, or NetCDF
- **Advanced Filtering** – Filter data by value ranges, anomalies, and percentiles
- **Raster & Vector Overlay** – Combine multiple data layers and vector boundaries

### Performance & Scalability

- **Data Caching** – Cache frequently accessed regions to reduce API calls
- **Progressive Loading** – Stream large datasets incrementally
- **Web Workers** – Offload computationally intensive operations
- **Dynamic Resolution** – Adaptive zoom levels for different data resolutions

### Sahel Region Dataset

It needs to update for Sahel Dataset soon.

### Sahel Region Scope

The Sahel region spans across West and Central Africa, including:
- **Countries**: Mauritania, Senegal, Mali, Burkina Faso, Niger, Chad, Sudan, and parts of Nigeria
- **Geographic Extent**: Approximately 15°W–50°E, 3°N–18°N
- **Coverage**: ~9 million km² of semi-arid to arid climate zone

### Dataset Variables

Common variables available in the Sahel dataset:

- **Vegetation Indices** (NDVI, EVI) – Normalized Difference Vegetation Index for monitoring vegetation health
- **Precipitation** – Seasonal and annual rainfall patterns
- **Land Surface Temperature** – Temperature anomalies and trends
- **Soil Moisture** – Water availability for agriculture

### Accessing Sahel Data

```typescript
// Example: Loading Sahel region dataset
const sahelDataset = await zarr.open('path/to/sahel-region.zarr');

// Query specific region
const mauritania = sahelDataset.getRegion({
  lat: [3, 28],
  lon: [-18, -4]
});
```

### Use Cases

- **Drought Monitoring** – Track vegetation and precipitation anomalies
- **Agricultural Planning** – Assess soil moisture and climate conditions
- **Climate Research** – Analyze long-term trends and variability
- **Humanitarian Response** – Early warning systems for food security issues

## Technologies

- **Vite** – Modern build tool with fast HMR
- **TypeScript** – Type-safe JavaScript
- **MapLibre-GL** – Vector tile mapping library
- **Chart.js** – Flexible data visualization
- **@carbonplan/zarr-layer** – Cloud-optimized data access

## License

See LICENSE file for details.

## Contributing

Contributions are welcome! Please submit issues and pull requests to improve Zarr-VIZ.
