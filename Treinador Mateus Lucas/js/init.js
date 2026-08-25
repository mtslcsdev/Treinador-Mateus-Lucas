dados.biblioteca = dados.biblioteca || [];
dados.templatesCiclo = dados.templatesCiclo || [];

carregarTema();
renderAtletas();
verificarBackup();
// carregarZonas() será chamado quando um atleta for selecionado

// Modo visualização é controlado pelo toggle no header, não hardcoded
// Inicializar com modo de visualização (botão toggle definirá modoEdicao = false)
document.body.classList.toggle("modo-visualization", !modoEdicao);

document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
    if (e.shiftKey) {
      refazer();
    } else {
      desfazer();
    }
  } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
    refazer();
  }
});
