# 🚀 Deploy no Netlify

## Opção 1: Deploy Manual (Recomendado - Rápido)

1. Acesse https://app.netlify.com/
2. Clique em **"New site from Git"**
3. Escolha **GitHub** e autorize
4. Selecione o repositório **`Treinador-Mateus-Lucas`**
5. Escolha a branch: **`modernize/frontend-ui`** (ou `master`)
6. Configure:
   - **Base directory:** deixe vazio
   - **Publish directory:** `frontend`
   - **Build command:** deixe vazio (já está pronto)
7. Clique **Deploy site**

## Opção 2: Deploy via CLI (Se preferir terminal)

```bash
npm install -g netlify-cli
netlify login
cd "C:\Users\mayra\Desktop\MEU APP CORRIDA"
netlify deploy --prod --dir=frontend
```

## O que vai acontecer:

✅ Site será publicado em: `https://[seu-site].netlify.app`
✅ Cada push no GitHub dispara deploy automático
✅ Dados salvos em localStorage (funciona offline)
✅ Backup export/import via JSON

## Arquivos de Configuração

- `netlify.toml` - Configuração de build e routing
- `.netlifyignore` - Arquivos ignorados no deploy

## Pronto!

Após configurar, o app estará rodando 24/7 na Netlify! 🎉
