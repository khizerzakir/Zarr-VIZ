export function buildPanel() {
  document.querySelector('#app')!.innerHTML = `
    <div class="shell">
      <div id="map"></div>

      <aside class="sidebar">
        <header class="sidebar-header">
          <h1>Climate Explorer</h1>
          <p>CarbonPlan · Zarr 4D dataset</p>
        </header>

        <section class="control-group">
          <label>
            Month - <strong id="month-display">Jan</strong>
          </label>
          <input id="month-slider" type="range" min="1" max="12" value="1" />
          <div class="month-ticks">
            ${['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
              .map((m) => `<span>${m}</span>`)
              .join('')}
          </div>
        </section>

        <section class="control-group">
          <div class="colorbar">
            <div class="colorbar-gradient"></div>
            <div class="colorbar-labels">
              <span>-20C</span><span>0C</span><span>30C</span>
            </div>
          </div>
        </section>

        <button id="query-btn" class="query-btn">Query Point</button>

        <section id="query-panel" class="query-panel" style="display:none">
          <div class="query-meta">
            <span id="query-coords" class="mono">-</span>
            <span id="query-value" class="value-badge">-</span>
          </div>
          <canvas id="query-chart"></canvas>
          <button id="clear-btn" class="clear-btn">Clear</button>
        </section>

        <footer class="sidebar-footer">
          Drag slider to explore seasonal variation.<br>
          Enable query mode to click any ocean point.
        </footer>
      </aside>
    </div>
  `
}
