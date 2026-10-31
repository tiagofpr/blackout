# BLACKOUT — app web (PWA)

Jogo FPS em Three.js que roda no navegador e pode ser instalado no celular como app (tela cheia, na horizontal, funciona offline).

## Arquivos
- `index.html`: o jogo inteiro (HTML + CSS + JS)
- `three.module.js`: Three.js r160 (local, para funcionar offline)
- `manifest.webmanifest`: nome, ícone, tela cheia e orientação do app
- `sw.js`: service worker (cache offline)
- `icons/`: ícones 192 e 512

## Rodar no PC (testar)
O service worker só funciona via `http://localhost` ou `https://`, não abrindo o arquivo direto.

```bash
cd blackout-app
python3 -m http.server 8080
# abra http://localhost:8080
```

## Jogar no celular
### Opção 1: mesma rede Wi-Fi (rápido, sem instalar)
Rode o servidor acima e, no celular, abra `http://IP-DO-PC:8080`.
Descubra o IP com `hostname -I`. Na VM do VirtualBox, a placa de rede precisa estar em modo **Bridge**.
Assim o jogo roda, mas a instalação como app e o modo offline exigem HTTPS (opção 2).

### Opção 2: publicar com HTTPS (recomendado, permite instalar)
**GitHub Pages:**
```bash
git init && git add . && git commit -m "BLACKOUT PWA"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/blackout.git
git push -u origin main
```
No GitHub: *Settings → Pages → Source: main / root*. O endereço fica `https://SEU-USUARIO.github.io/blackout/`.

Também funciona arrastando a pasta em **Netlify Drop** (app.netlify.com/drop).

### Instalar no celular
- **Android (Chrome):** abra o link → botão **INSTALAR APP** na tela inicial do jogo, ou menu ⋮ → *Instalar app*.
- **iPhone (Safari):** botão Compartilhar → *Adicionar à Tela de Início*.

## Atualizar o app
Quando mudar algum arquivo, troque a versão do cache em `sw.js` (ex.: `blackout-v5` → `blackout-v6`) em `sw.js`; assim os celulares baixam a versão nova.

## Fases (Campanha)
As fases ficam em `levels.js`, como dados: blocos (paredes/containers), caixas, barris, alvos destrutíveis
(`tank`, `radio`, `generator`), itens, grupos de inimigos (`soldier`, `heavy`, `officer`) que surgem quando o
jogador passa de um ponto, e a lista de objetivos (`reach`, `destroy`, `kill`, `clear`, com tempo opcional).
Para criar uma fase nova, copie uma existente no array `LEVELS` e ajuste as coordenadas.
O progresso (fases liberadas, melhor tempo e nota) fica salvo no aparelho.
