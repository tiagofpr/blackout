// =====================================================================
// BLACKOUT — dados das fases
// Coordenadas: o jogador começa no z positivo e avança para o z negativo.
// blocks:  [x, z, largura, profundidade, altura, corDoContainer?]
// crates / barrels: [x, z]
// targets: [x, z, tipo ('tank' | 'radio' | 'generator'), idDoObjetivo?]
// pickups: [x, z, 'ammo' | 'health']
// groups:  inimigos que surgem quando o jogador passa de um z (trigger)
//          spawns: [x, z, tipo ('soldier' | 'heavy' | 'officer'), tag?]
// objectives: em sequência
//   reach   { at:[x,z], r, text, time? }    chegar a um ponto (com tempo opcional)
//   destroy { id, text }                    destruir todos os alvos com esse id
//   kill    { tag, at:[x,z], text }         eliminar inimigo marcado
//   clear   { group, at:[x,z], text }       eliminar todo um grupo
//   spawn:  id de grupo que aparece quando o objetivo começa
// =====================================================================

const RED = 0x9c2f24, BLUE = 0x2f5a8a, GREEN = 0x3f6b3a, ORANGE = 0xc06a24, GRAY = 0x5d646b, RUST = 0x7a4a2a;

// Arena do modo Sobrevivência
export const ARENA = {
  id: 'arena', name: 'Sobrevivência',
  bounds: [-30, 30, -30, 30],
  sky: 0x8d969f, fogNear: 28, fogFar: 95, light: 1.1,
  start: [0, 25, 0],
  blocks: [
    [-12, -10, 12, 1, 3.5], [12, 10, 12, 1, 3.5],
    [-8, 8, 1, 10, 3.5], [8, -8, 1, 10, 3.5],
    [0, 0, 4, 4, 3],
    [-20, 18, 6, 6, 4.5], [20, -18, 6, 6, 4.5],
    [-20, -20, 2, 2, 4], [20, 20, 2, 2, 4],
    [18, 2, 1, 8, 2.2], [-18, -2, 1, 8, 2.2],
    [0, -20, 10, 1, 1.3], [0, 20, 10, 1, 1.3],
  ],
  crates: [[-3, -15], [3, -15], [-14, 4], [14, -4], [-22, -8], [22, 8], [5, 12], [-5, 12], [-25, 25], [25, -25], [12, 24], [-12, -24], [-4, 4], [11, -20], [-11, 20]],
  barrels: [[-1.5, -15], [1.5, -15.2], [-15, -12], [15, 12], [-24, 5], [24, -5], [-10, 22], [10, -25], [3, 6], [-21, -12], [6.5, 12], [-6.5, 12.2]],
};

export const LEVELS = [
  // -------------------------------------------------------------------
  {
    id: 'fronteira', name: 'POSTO DE FRONTEIRA', location: 'Região de fronteira — 05:40',
    brief: 'Uma milícia tomou o posto de controle da fronteira e está abastecendo seus comboios com o depósito de combustível logo atrás. Atravesse o posto, destrua os tanques de combustível e elimine o comandante antes de seguir para a extração.',
    sky: 0xb59a86, fogNear: 30, fogFar: 110, light: 1.0,
    bounds: [-18, 18, -85, 85],
    start: [0, 78, 0], par: 300, diff: 1,
    loadout: { ammo: [[12, 60], [30, 90], [6, 18]], grenades: 2 },
    blocks: [
      [-8, 62, 8, 1, 1.2], [8, 55, 8, 1, 1.2], [-6, 48, 10, 1, 1.2],
      [-12, 38, 7, 7, 3.5], [12, 38, 7, 7, 3.5], [0, 36, 6, .6, 1.1],
      [-13, 24, 6, 6, 3.5], [13, -2, 6, 6, 3.5], [0, 20, 6, 1, 1.2],
      [-11, -12, 14, 1, 3.5], [11, -12, 14, 1, 3.5],
      [0, -32, 12, 8, 4],
      [-9, -55, 10, 1, 1.2], [8, -62, 10, 1, 1.2], [-6, -70, 8, 1, 1.2],
    ],
    crates: [[12, 70], [-13, 66], [14, 52], [6, 20], [-5, 6], [5, -4], [-12, -22], [12, -24], [-8, -40], [9, -42], [14, -66]],
    barrels: [[-12, 58], [-7, 43], [7, 32], [-6, 17], [7, 6], [-5, -20], [6, -21], [13, -38], [-14, -60]],
    targets: [[-11, 12, 'tank', 'tanks'], [11, 14, 'tank', 'tanks'], [0, 2, 'tank', 'tanks']],
    pickups: [[10, 60, 'ammo'], [-14, 30, 'health'], [0, -8, 'health'], [-14, -8, 'ammo'], [15, -50, 'ammo'], [-15, -50, 'health']],
    groups: [
      { id: 'A', trigger: 'start', spawns: [[-4, 33, 'soldier'], [5, 31, 'soldier'], [0, 28, 'soldier'], [-15, 44, 'soldier']] },
      { id: 'B', trigger: 44, spawns: [[-6, 10, 'soldier'], [6, 4, 'soldier'], [-12, 0, 'soldier'], [10, 22, 'soldier'], [0, -6, 'soldier']] },
      { id: 'C', trigger: 0, spawns: [[-10, -20, 'soldier'], [10, -20, 'soldier'], [-12, -38, 'soldier'], [12, -38, 'soldier'], [0, -22, 'heavy'], [-5, -44, 'heavy'], [0, -42, 'officer', 'cmd']] },
      { id: 'D', trigger: -46, alert: true, spawns: [[-6, -66, 'soldier'], [7, -70, 'soldier'], [0, -77, 'soldier']] },
    ],
    objectives: [
      { type: 'reach', at: [0, 30], r: 5, text: 'Atravesse o posto de controle' },
      { type: 'destroy', id: 'tanks', text: 'Destrua os tanques de combustível' },
      { type: 'kill', tag: 'cmd', at: [0, -40], text: 'Elimine o comandante da milícia' },
      { type: 'reach', at: [0, -78], r: 4, text: 'Vá até o ponto de extração' },
    ],
  },
  // -------------------------------------------------------------------
  {
    id: 'patio', name: 'PÁTIO FERROVIÁRIO', location: 'Entroncamento ferroviário — 13:15',
    brief: 'O inimigo usa o pátio ferroviário para coordenar as tropas pelo rádio. Derrube os dois transmissores, limpe o armazém e, quando o alarme soar, corra até o trem de fuga antes que os reforços cheguem.',
    sky: 0x8d99a6, fogNear: 30, fogFar: 115, light: 1.1,
    bounds: [-22, 22, -90, 90],
    start: [0, 83, 0], par: 360, diff: 1.15,
    loadout: { ammo: [[12, 48], [30, 120], [6, 24]], grenades: 3 },
    blocks: [
      [-12, 70, 6, 2.4, 2.6, RED], [10, 66, 2.4, 8, 2.6, BLUE], [-4, 58, 8, 2.4, 2.6, GREEN], [14, 52, 6, 2.4, 2.6, ORANGE], [-15, 52, 2.4, 6, 2.6, BLUE],
      [-9, 28, 3, 14, 2.8, GRAY], [9, 22, 3, 14, 2.8, RUST], [-16, 14, 6, 10, 4],
      [-12, -10, 12, 10, 5], [12, -14, 12, 8, 5], [0, -2, 6, 1, 1.2], [-3, -20, 6, 1, 1.2],
      [-10, -45, 8, 2.4, 2.6, RED], [9, -55, 8, 2.4, 2.6, GREEN], [-8, -66, 8, 2.4, 2.6, BLUE], [10, -74, 6, 2.4, 2.6, ORANGE],
    ],
    crates: [[5, 74], [-8, 64], [0, 30], [4, 16], [-4, 38], [-16, 2], [16, 0], [15, -38], [-15, -58]],
    barrels: [[2, 62], [-12, 46], [-4, 24], [13, 30], [0, 12], [3, -18], [-6, -16], [4, -48], [-3, -76]],
    targets: [[16, 40, 'radio', 'radios'], [-17, 24, 'radio', 'radios']],
    pickups: [[16, 76, 'ammo'], [-18, 34, 'health'], [18, 8, 'ammo'], [0, -30, 'health'], [-18, -36, 'ammo']],
    groups: [
      { id: 'A', trigger: 'start', spawns: [[-6, 52, 'soldier'], [8, 56, 'soldier'], [0, 46, 'soldier'], [-18, 62, 'soldier']] },
      { id: 'B', trigger: 62, spawns: [[-13, 34, 'soldier'], [13, 28, 'soldier'], [0, 20, 'soldier'], [-4, 14, 'soldier'], [6, 40, 'soldier'], [2, 26, 'heavy']] },
      { id: 'C', trigger: 8, spawns: [[-3, -6, 'soldier'], [4, -12, 'soldier'], [-5, -26, 'soldier'], [5, -28, 'soldier'], [0, -24, 'heavy'], [-15, -24, 'soldier'], [15, -24, 'soldier']] },
      { id: 'D', trigger: 'never', alert: true, spawns: [[-12, -60, 'soldier'], [12, -64, 'soldier'], [0, -70, 'heavy'], [-4, -50, 'soldier'], [16, -82, 'soldier']] },
    ],
    objectives: [
      { type: 'destroy', id: 'radios', text: 'Destrua os transmissores de rádio' },
      { type: 'clear', group: 'C', at: [0, -15], text: 'Limpe o armazém' },
      { type: 'reach', at: [0, -83], r: 4, time: 60, spawn: 'D', text: 'ALARME! Chegue ao trem de fuga' },
    ],
  },
  // -------------------------------------------------------------------
  {
    id: 'complexo', name: 'COMPLEXO INDUSTRIAL', location: 'Zona industrial — 22:50',
    brief: 'O complexo industrial alimenta toda a rede de defesa inimiga. Desligue de vez os quatro geradores dentro do galpão principal, elimine o comandante no pátio de controle e saia antes que o lugar seja cercado.',
    sky: 0x2b3038, fogNear: 22, fogFar: 85, light: .7,
    bounds: [-24, 24, -95, 95],
    start: [0, 88, 0], par: 420, diff: 1.3,
    loadout: { ammo: [[12, 48], [30, 120], [6, 24]], grenades: 3 },
    blocks: [
      [-14, 70, 12, 1, 1.3], [14, 64, 12, 1, 1.3], [-18, 58, 4, 4, 6], [18, 58, 4, 4, 6],
      [-14, 48, 20, 1, 5], [14, 48, 20, 1, 5], [-14, 10, 20, 1, 5], [14, 10, 20, 1, 5],
      [-12, 36, 6, 3, 2.4], [12, 30, 6, 3, 2.4], [-10, 20, 4, 6, 2.4], [8, 18, 5, 3, 2.4],
      [-14, -10, 8, 8, 4], [14, -16, 8, 8, 4],
      [-12, -52, 12, 1, 1.3], [12, -60, 12, 1, 1.3], [-10, -70, 10, 1, 1.3], [10, -80, 10, 1, 1.3],
    ],
    crates: [[10, 76], [-10, 80], [-4, 44], [14, 40], [-18, 40], [-20, 0], [20, -2], [-18, -40], [18, -44]],
    barrels: [[4, 68], [-4, 62], [6, 40], [-6, 26], [4, 24], [-14, 14], [10, 2], [-2, -16], [16, -30], [-16, -76]],
    targets: [[0, 38, 'generator', 'gens'], [-16, 28, 'generator', 'gens'], [16, 22, 'generator', 'gens'], [0, 16, 'generator', 'gens'], [6, -2, 'tank'], [-8, -28, 'tank']],
    pickups: [[20, 80, 'ammo'], [-20, 46, 'health'], [20, 44, 'ammo'], [0, 4, 'health'], [-20, -20, 'ammo'], [20, -48, 'health']],
    groups: [
      { id: 'A', trigger: 'start', spawns: [[-6, 60, 'soldier'], [8, 62, 'soldier'], [0, 56, 'soldier'], [-14, 54, 'soldier']] },
      { id: 'B', trigger: 52, spawns: [[-8, 40, 'soldier'], [8, 36, 'soldier'], [-4, 22, 'soldier'], [10, 26, 'soldier'], [-18, 18, 'soldier'], [18, 16, 'soldier'], [0, 28, 'heavy']] },
      { id: 'C', trigger: 8, spawns: [[-6, -6, 'soldier'], [8, -8, 'soldier'], [-14, -24, 'soldier'], [14, -28, 'soldier'], [0, -20, 'soldier'], [-4, -34, 'heavy'], [6, -34, 'heavy'], [0, -38, 'officer', 'cmd']] },
      { id: 'D', trigger: -42, alert: true, spawns: [[-14, -62, 'soldier'], [14, -68, 'soldier'], [0, -74, 'heavy'], [-6, -84, 'soldier'], [6, -86, 'soldier']] },
    ],
    objectives: [
      { type: 'destroy', id: 'gens', text: 'Destrua os geradores do galpão' },
      { type: 'kill', tag: 'cmd', at: [0, -36], text: 'Elimine o comandante' },
      { type: 'reach', at: [0, -88], r: 4, time: 75, text: 'Saia do complexo antes do cerco' },
    ],
  },
];
