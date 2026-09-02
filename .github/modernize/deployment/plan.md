# Plano de modernização do frontend de treinamento

## Objetivo
Implementar um fluxo funcional para o painel do treinador, detalhe do atleta e relatório, conectando as telas a dados persistidos e com navegação consistente no app.

## Escopo
- Atualizar o painel principal com listagem de atletas, criação, remoção e estatísticas.
- Implementar a página de detalhe com cadastro de ciclos e treinos por atleta.
- Implementar a página de relatório com visão consolidada por ciclo e exportação para PDF.
- Ajustar o visual do sistema compartilhado para manter consistência e compatibilidade com o design do app.

## Arquivos principais
- frontend/src/pages/PainelTreinador.tsx
- frontend/src/pages/DetalheAtleta.tsx
- frontend/src/pages/RelatorioAtleta.tsx
- frontend/src/styles/shared.css

## Validação
- Executar build do frontend com `npm run build`.
- Confirmar que o bundle final é gerado sem erros de TypeScript.

## Status
- Planejado: concluído
- Implementação: concluída
- Verificação: concluída
