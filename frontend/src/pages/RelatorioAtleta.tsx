export default function RelatorioAtleta() {
  return (
    <div className="app-shell">
      <header className="topbar compact-topbar">
        <div>
          <p className="eyebrow">Relatório</p>
          <h1>Allan e Pedro Henrique</h1>
        </div>
        <div className="topbar-actions">
          <button type="button" className="subtle-button">Exportar PDF</button>
          <button type="button" className="primary-action">Salvar</button>
        </div>
      </header>

      <main className="content-area">
        <div className="table-card">
          <div className="panel-header">
            <h2>Resumo do ciclo</h2>
          </div>
          <table className="report-table">
            <thead>
              <tr>
                <th>Semana</th>
                <th>Volume</th>
                <th>Aderência</th>
                <th>Treinos</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>24.0 km</td>
                <td>92%</td>
                <td>3/3</td>
              </tr>
              <tr>
                <td>2</td>
                <td>30.5 km</td>
                <td>88%</td>
                <td>3/3</td>
              </tr>
              <tr>
                <td>3</td>
                <td>22.0 km</td>
                <td>73%</td>
                <td>2/3</td>
              </tr>
              <tr>
                <td>4</td>
                <td>18.7 km</td>
                <td>61%</td>
                <td>2/3</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
