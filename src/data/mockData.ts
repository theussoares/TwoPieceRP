// Mock data para a aplicação Two Piece ON
export interface User {
  id: string;
  email: string;
  role: 'player' | 'master';
  characterName: string;
}

export interface Character {
  id: string;
  userId: string;
  name: string;
  nickname: string;
  race?: string;
  profession?: string;
  appearance?: string;
  age?: number;
  creationDate?: string;
  xp?: number;
  level: number;
  bounty: number;
  // Sistema de Energias do RPG
  energies: {
    stamina: {
      current: number;
      max: number;
    };
    haki: {
      current: number;
      max: number;
    };
    resistance: {
      current: number;
      max: number;
    };
  };
  background: string;
  diary: string;
  devilFruit: string;
  haki: string;
  inventory: { item: string; quantity: number }[];
  organization?: {
    name: string;
    type: 'pirate_crew' | 'marine_rank' | 'revolutionary_army' | 'journalist_agency';
    position: string;
  };
  fightingStyle?: string[];
  victories?: number;
  defeats?: number;
  islands?: { level1: number; level2: number; level3: number };
  tasks?: number;
  // Sistema de Pontos de Níveis
  skillPoints?: number;
  skillLevels?: {
    stamina: number;
    haki: number;
    resistance: number;
    hakiArmament: number;
    hakiObservation: number;
    fightingStyle: number;
    weapon: number;
    devilFruit: number;
    profession: number;
    race: number;
  };
  // Campos para passes e missões
  battlePass?: {
    bronze: number;
    gold: number;
  };
  dailyMissions?: {
    scenes: number;
    combat: number;
  };
  expBonus?: {
    initial: number;
    tutorial: number;
    punishments: number;
  };
  // Sistema de Tarefas Semanais de Profissão
  weeklyTasks?: {
    currentWeek: string; // Data da semana (YYYY-MM-DD)
    tasksCompleted: number;
    tasksThisMonth: number;
    expEarnedThisWeek: number;
    expEarnedThisMonth: number;
  };
}

export interface News {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

export interface Interview {
  id: string;
  title: string;
  content: string;
  author: string;
  characterName: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

// Estilos de Luta disponíveis
export const fightingStyles = [
  'Estilo Perna Negra',
  'Arte do Tempo',
  'Estilo Três Espadas',
  'Rokushiki',
  'Seiman Kikan',
  'Estilo Livre',
  'Boxe',
  'Karatê do Homem-Peixe',
  'Newkama Kenpo',
  'Hasshoken'
];

// Organizações disponíveis
export const organizations = {
  pirate_positions: [
    'Rei Pirata',
    'Grande Frota',
    'Yonkou',
    'Shichibukai',
    'Capitão',
    'Comandante',
    'Tripulante',
    'Aprendiz Pirata'
  ],
  marine_ranks: [
    'Goroussei',
    'Almirante da Frota',
    'Almirante',
    'Vice-Almirante',
    'Capitão',
    'Marinheiro',
    'Aprendiz de Marinheiro'
  ],
  revolutionary_positions: [
    'Líder',
    'Comandante',
    'Soldado'
  ],
  journalist_agencies: [
    'World Economy News Paper',
    'Agência Independente',
    'Correspondente Freelancer'
  ]
};

export const pirate_crews = [
  'Piratas do Chapéu de Palha',
  'Piratas do Barba Branca',
  'Piratas das Feras',
  'Piratas Big Mom',
  'Piratas do Ruivo',
  'Piratas Heart',
  'Piratas Kid',
  'Tripulação Independente'
];

export const races = [
  'Humano',
  'Homem-Peixe',
  'Tritão',
  'Gigante',
  'Anão Tontatta',
  'Mink',
  'Longarm',
  'Longleg',
  'Três Olhos',
  'Lunário'
];

// Profissões do Sistema RPG Two Piece ON
export const professions = [
  'Cozinheiro',
  'Médico',
  'Músico',
  'Carpinteiro',
  'Ferreiro',
  'Arqueólogo',
  'Navegador',
  'Timoneiro'
];

// Informações das Profissões
export const professionInfo = {
  'Cozinheiro': {
    description: 'A função do Cozinheiro é cozinhar a comida estocada no armazém do navio, tornando o alimento mais nutritivo para o consumo.',
    bonuses: {
      0: 1.2,
      1: 1.5,
      2: 2,
      3: 3,
      4: 4,
      5: 5
    },
    bonusType: 'Alimento',
    task: 'Cozinhe um total de 5 vezes no decorrer da semana',
    icon: '👨‍🍳'
  },
  'Médico': {
    description: 'A função do médico é recuperar a força dos companheiros igual ao cozinheiro, mas o médico faz isso através da medicina. O médico também é capaz de curar os ferimentos de seus aliados.',
    bonuses: {
      0: 1.2,
      1: 1.5,
      2: 2,
      3: 3,
      4: 4,
      5: 5
    },
    bonusType: 'Cura',
    task: 'Cure 5 vezes no decorrer da semana',
    icon: '⚕️'
  },
  'Músico': {
    description: 'O Músico é um suporte de combate, sendo o único recuperador capaz de recuperar energias durante um combate.',
    bonuses: {
      0: 1,
      1: 1.2,
      2: 1.4,
      3: 1.6,
      4: 1.8,
      5: 2
    },
    bonusType: 'Música',
    task: 'Toque para o bando (Três Vezes)',
    icon: '🎵'
  },
  'Carpinteiro': {
    description: 'É responsável pela construção de navios e também pela manutenção do navio, sendo um cargo extremamente importante dentro de qualquer organização.',
    bonuses: {
      1: 'Construção de Navios (LvL 1)',
      2: 'Construção de Navios (LvL 2)',
      3: 'Construção de Navios (LvL 3)',
      4: 'Construção de Navios (LvL 4)',
      5: 'Construção de Navios (LvL 5)'
    },
    bonusType: 'Construção de Navios',
    task: 'Colete Madeira para o estoque do navio (5 vezes)',
    icon: '🔨'
  },
  'Ferreiro': {
    description: 'É responsável pela fabricação de armas no geral, sendo o armeiro do grupo.',
    bonuses: {
      1: 'Fabricação de Armas (LvL 1)',
      2: 'Fabricação de Armas (LvL 2)',
      3: 'Fabricação de Armas (LvL 3)',
      4: 'Fabricação de Armas (LvL 4)',
      5: 'Fabricação de Armas (LvL 5)'
    },
    bonusType: 'Fabricação de Armas',
    task: 'Colete Minério para o estoque do navio (5 vezes)',
    icon: '⚒️'
  },
  'Arqueólogo': {
    description: 'Estudar ruínas antigas das ilhas, sendo possível encontrar um tesouro especial ao explorar qualquer ilha. A Arqueóloga também é a única capaz de ler os Poneglyph.',
    bonuses: {
      1: '2.500¥ Belly',
      2: '5.000¥ Belly',
      3: '10.000¥ Belly',
      5: 'Leitura de Poneglyph'
    },
    bonusType: 'Tesouro Arqueológico',
    task: 'Pise em duas diferentes ilhas no decorrer da semana',
    icon: '📜'
  },
  'Navegador': {
    description: 'A Navegadora conhece na palma de sua mão as correntes marítimas e as alterações no clima, sendo capaz de sempre buscar a melhor rota marítima possível.',
    bonuses: {
      1: '+1x',
      2: '+2x',
      3: '+3x',
      4: '+4x',
      5: '+5x'
    },
    bonusType: 'Velocidade (Navegação)',
    task: 'Navegue com o Navio, faça duas viagens de Navio no decorrer da semana',
    icon: '🧭'
  },
  'Timoneiro': {
    description: 'É responsável por controlar o leme (volante) do navio, sendo útil em situações que o navio está sendo atacado e alguém precisa controlar o leme para realizar manobras evasivas.',
    bonuses: {
      1: '+1x',
      2: '+2x',
      3: '+3x',
      4: '+4x',
      5: '+5x'
    },
    bonusType: 'Velocidade (Manobras Evasivas)',
    task: 'Treine manobras com o navio (2 vezes)',
    icon: '⚓'
  }
};

// Sistema de Energias - Funções Utilitárias
export const calculateStaminaMax = (level: number): number => {
  return level * 50000;
};

export const calculateHakiMax = (level: number): number => {
  return level * 50000;
};

export const calculateResistanceMax = (level: number): number => {
  if (level === 0) return 10000;
  if (level === 1) return 100000;
  return 100000 + ((level - 1) * 100000);
};

// Tabela de EXP por Nível
export const expTable: { [key: number]: number } = {
  1: 25000,
  2: 50000,
  3: 75000,
  4: 100000,
  5: 125000,
  6: 150000,
  7: 175000,
  8: 200000,
  9: 225000,
  10: 250000,
  11: 300000,
  12: 350000,
  13: 400000,
  14: 450000,
  15: 500000,
  16: 550000,
  17: 600000,
  18: 650000,
  19: 750000, // Correção: estava 17 novamente
  20: 800000,
  21: 900000,
  22: 1000000,
  23: 1100000,
  24: 1200000,
  25: 1300000,
  26: 1400000,
  27: 1500000,
  28: 1600000,
  29: 1700000,
  30: 1800000,
  31: 1950000,
  32: 2100000,
  33: 2250000,
  34: 2400000,
  35: 2550000,
  36: 2700000,
  37: 2850000,
  38: 3000000,
  39: 3150000,
  40: 3300000
};

// Função para calcular o nível baseado no EXP
export const calculateLevelFromExp = (exp: number): number => {
  for (let level = 40; level >= 1; level--) {
    if (exp >= expTable[level]) {
      return level;
    }
  }
  return 1;
};

// Função para calcular EXP necessário para o próximo nível
export const calculateExpForNextLevel = (currentLevel: number): number => {
  if (currentLevel >= 40) {
    return expTable[40] + ((currentLevel - 39) * 200000);
  }
  return expTable[currentLevel + 1] || expTable[40];
};

// Função para calcular pontos de nível disponíveis
export const calculateAvailableSkillPoints = (level: number, usedPoints: number): number => {
  return level - usedPoints;
};

// Funções do Sistema de Profissões
export const getProfessionBonus = (profession: string, level: number): number | string => {
  const profInfo = professionInfo[profession as keyof typeof professionInfo];
  if (!profInfo) return 1;
  
  return profInfo.bonuses[level as keyof typeof profInfo.bonuses] || 1;
};

export const getProfessionDescription = (profession: string): string => {
  const profInfo = professionInfo[profession as keyof typeof professionInfo];
  return profInfo?.description || 'Profissão não encontrada';
};

export const getProfessionTask = (profession: string): string => {
  const profInfo = professionInfo[profession as keyof typeof professionInfo];
  return profInfo?.task || 'Tarefa não definida';
};

export const calculateWeeklyTaskExp = (tasksCompleted: number): number => {
  return Math.min(tasksCompleted, 4) * 5000; // Max 4 tarefas por semana, 5000% EXP cada
};

export const calculateMonthlyTaskExp = (tasksThisMonth: number): number => {
  return Math.min(tasksThisMonth, 4) * 5000; // Max 20.000% EXP por mês
};

export const getCurrentWeekString = (): string => {
  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())); // Domingo
  return startOfWeek.toISOString().split('T')[0];
};

// Usuários mock
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'luffy@pirate.com',
    role: 'player',
    characterName: 'Monkey D. Luffy'
  },
  {
    id: '2',
    email: 'master@navy.com',
    role: 'master',
    characterName: 'Almirante Sengoku'
  },
  {
    id: '3',
    email: 'zoro@pirate.com',
    role: 'player',
    characterName: 'Roronoa Zoro'
  },
  {
    id: '4',
    email: 'sanji@pirate.com',
    role: 'player',
    characterName: 'Vinsmoke Sanji'
  },
  {
    id: '5',
    email: 'smoker@navy.gov',
    role: 'player',
    characterName: 'Commodore Smoker'
  },
  {
    id: '6',
    email: 'sabo@revolution.org',
    role: 'player',
    characterName: 'Sabo'
  },
  {
    id: '7',
    email: 'morgans@worldnews.com',
    role: 'player',
    characterName: 'Big News Morgans'
  }
];

// Personagens mock
export const mockCharacters: Character[] = [
  {
    id: '1',
    userId: '1',
    name: 'Monkey D. Luffy',
    nickname: 'Chapéu de Palha',
    race: 'Humano',
    profession: 'Cozinheiro',
    appearance: 'Jovem com cicatriz em X no peito, sempre usando chapéu de palha',
    age: 19,
    creationDate: '2024-01-01',
    xp: 3300000,
    level: 40,
    bounty: 3000000000,
    energies: {
      stamina: {
        current: 250000,
        max: calculateStaminaMax(5)
      },
      haki: {
        current: 350000,
        max: calculateHakiMax(8)
      },
      resistance: {
        current: 90000,
        max: calculateResistanceMax(1)
      }
    },
    background: 'Capitão dos Piratas do Chapéu de Palha, sonha em se tornar o Rei dos Piratas.',
    diary: 'Hoje tivemos uma grande aventura! Encontramos uma ilha misteriosa e lutamos contra marinheiros.',
    devilFruit: 'Gomu Gomu no Mi - Permite que o corpo se estique como borracha.',
    haki: 'Haki do Rei (Supremo), Haki da Observação (Avançado), Haki do Armamento (Avançado)',
    organization: {
      name: 'Piratas do Chapéu de Palha',
      type: 'pirate_crew',
      position: 'Capitão'
    },
    fightingStyle: ['Estilo Livre'],
    victories: 45,
    defeats: 3,
    islands: { level1: 12, level2: 5, level3: 2 },
    tasks: 150,
    skillPoints: 26, // Level 40 - pontos usados (5+8+1+3+3+0+0+5+8+0) = 7
    skillLevels: {
      stamina: 5,
      haki: 8,
      resistance: 1,
      hakiArmament: 3,
      hakiObservation: 3,
      fightingStyle: 0,
      weapon: 0,
      devilFruit: 5,
      profession: 8,
      race: 0
    },
    battlePass: {
      bronze: 0,
      gold: 0
    },
    dailyMissions: {
      scenes: 0,
      combat: 0
    },
    expBonus: {
      initial: 25000,
      tutorial: 0,
      punishments: 0
    },
    weeklyTasks: {
      currentWeek: getCurrentWeekString(),
      tasksCompleted: 3,
      tasksThisMonth: 12,
      expEarnedThisWeek: 15000,
      expEarnedThisMonth: 20000
    },
    inventory: [
      { item: 'Chapéu de Palha', quantity: 1 },
      { item: 'Colete Vermelho', quantity: 1 },
      { item: 'Carne', quantity: 50 },
      { item: 'Log Pose', quantity: 1 }
    ]
  },
  {
    id: '3',
    userId: '3',
    name: 'Roronoa Zoro',
    nickname: 'Caçador de Piratas',
    level: 35,
    bounty: 1111000000,
    energies: {
      stamina: {
        current: 192000,
        max: calculateStaminaMax(4)
      },
      haki: {
        current: 300000,
        max: calculateHakiMax(7)
      },
      resistance: {
        current: 10000,
        max: calculateResistanceMax(0)
      }
    },
    background: 'Espadachim dos Piratas do Chapéu de Palha, busca se tornar o maior espadachim do mundo.',
    diary: 'Treinei com minhas espadas hoje. Preciso ficar mais forte para proteger a tripulação.',
    devilFruit: 'Nenhuma',
    haki: 'Haki da Observação (Intermediário), Haki do Armamento (Avançado)',
    race: 'Humano',
    profession: 'Navegador',
    appearance: 'Homem musculoso com cabelos verdes e três brincos na orelha esquerda',
    age: 21,
    creationDate: '2024-01-01',
    xp: 2550000,
    victories: 38,
    defeats: 2,
    islands: { level1: 10, level2: 4, level3: 1 },
    tasks: 120,
    skillPoints: 5, // Level 35 - pontos usados (4+7+0+3+2+8+9+0+7+0) = 30 pontos usados, sobram 5
    skillLevels: {
      stamina: 4,
      haki: 7,
      resistance: 0,
      hakiArmament: 3,
      hakiObservation: 2,
      fightingStyle: 8,
      weapon: 9,
      devilFruit: 0,
      profession: 7,
      race: 0
    },
    battlePass: {
      bronze: 0,
      gold: 0
    },
    dailyMissions: {
      scenes: 0,
      combat: 0
    },
    expBonus: {
      initial: 25000,
      tutorial: 0,
      punishments: 0
    },
    weeklyTasks: {
      currentWeek: getCurrentWeekString(),
      tasksCompleted: 2,
      tasksThisMonth: 8,
      expEarnedThisWeek: 10000,
      expEarnedThisMonth: 20000
    },
    organization: {
      name: 'Piratas do Chapéu de Palha',
      type: 'pirate_crew',
      position: 'Tripulante'
    },
    fightingStyle: ['Estilo Três Espadas'],
    inventory: [
      { item: 'Wado Ichimonji', quantity: 1 },
      { item: 'Sandai Kitetsu', quantity: 1 },
      { item: 'Enma', quantity: 1 },
      { item: 'Sake', quantity: 10 }
    ]
  },
  {
    id: '4',
    userId: '4',
    name: 'Vinsmoke Sanji',
    nickname: 'Perna Negra',
    level: 32,
    bounty: 1032000000,
    energies: {
      stamina: {
        current: 180000,
        max: calculateStaminaMax(4)
      },
      haki: {
        current: 320000,
        max: calculateHakiMax(7)
      },
      resistance: {
        current: 10000,
        max: calculateResistanceMax(0)
      }
    },
    background: 'Cozinheiro dos Piratas do Chapéu de Palha, sonha em encontrar o All Blue.',
    diary: 'Preparei um banquete incrível para a tripulação. A comida é o combustível das aventuras!',
    devilFruit: 'Nenhuma',
    haki: 'Haki da Observação (Avançado), Haki do Armamento (Intermediário)',
    race: 'Humano',
    profession: 'Cozinheiro',
    appearance: 'Homem loiro elegante sempre de terno, com sobrancelha curvada',
    age: 21,
    creationDate: '2024-01-01',
    xp: 2100000,
    victories: 35,
    defeats: 1,
    islands: { level1: 9, level2: 3, level3: 1 },
    tasks: 140,
    skillPoints: 3, // Level 32 - pontos usados (4+7+0+3+2+5+0+0+8+0) = 29 pontos usados, sobram 3
    skillLevels: {
      stamina: 4,
      haki: 7,
      resistance: 0,
      hakiArmament: 3,
      hakiObservation: 2,
      fightingStyle: 5,
      weapon: 0,
      devilFruit: 0,
      profession: 8,
      race: 0
    },
    battlePass: {
      bronze: 0,
      gold: 0
    },
    dailyMissions: {
      scenes: 0,
      combat: 0
    },
    expBonus: {
      initial: 25000,
      tutorial: 0,
      punishments: 0
    },
    weeklyTasks: {
      currentWeek: getCurrentWeekString(),
      tasksCompleted: 4,
      tasksThisMonth: 16,
      expEarnedThisWeek: 20000,
      expEarnedThisMonth: 20000
    },
    organization: {
      name: 'Piratas do Chapéu de Palha',
      type: 'pirate_crew',
      position: 'Tripulante'
    },
    fightingStyle: ['Estilo Perna Negra'],
    inventory: [
      { item: 'Terno Preto', quantity: 1 },
      { item: 'Ingredientes Especiais', quantity: 25 },
      { item: 'Cigarros', quantity: 20 },
      { item: 'Livro de Receitas', quantity: 1 }
    ]
  },
  {
    id: '5',
    userId: '5',
    name: 'Commodore Smoker',
    nickname: 'Fumante Branco',
    level: 30,
    bounty: 0, // Marinheiros não têm recompensa
    energies: {
      stamina: {
        current: 180000,
        max: calculateStaminaMax(4)
      },
      haki: {
        current: 240000,
        max: calculateHakiMax(6)
      },
      resistance: {
        current: 95000,
        max: calculateResistanceMax(1)
      }
    },
    background: 'Commodore da Marinha, conhecido por sua determinação e senso de justiça. Usuário da Moku Moku no Mi, persegue piratas pelos mares.',
    diary: 'Hoje recebi ordens para patrulhar o Grand Line. A justiça deve prevalecer sobre o caos pirata.',
    devilFruit: 'Moku Moku no Mi - Permite que o corpo se transforme em fumaça, tornando-se intangível e capaz de se mover através de pequenos espaços.',
    haki: 'Haki do Armamento (Avançado), Haki da Observação (Intermediário)',
    race: 'Humano',
    profession: 'Médico',
    appearance: 'Homem alto e musculoso com cabelos brancos, sempre fumando charutos',
    age: 34,
    creationDate: '2024-01-01',
    xp: 1800000,
    victories: 42,
    defeats: 5,
    islands: { level1: 15, level2: 8, level3: 3 },
    tasks: 200,
    skillPoints: 3, // Level 30 - pontos usados (4+6+1+3+2+0+5+0+6+0) = 27 pontos usados, sobram 3
    skillLevels: {
      stamina: 4,
      haki: 6,
      resistance: 1,
      hakiArmament: 3,
      hakiObservation: 2,
      fightingStyle: 0,
      weapon: 5,
      devilFruit: 0,
      profession: 6,
      race: 0
    },
    battlePass: {
      bronze: 0,
      gold: 0
    },
    dailyMissions: {
      scenes: 0,
      combat: 0
    },
    expBonus: {
      initial: 25000,
      tutorial: 0,
      punishments: 0
    },
    weeklyTasks: {
      currentWeek: getCurrentWeekString(),
      tasksCompleted: 1,
      tasksThisMonth: 6,
      expEarnedThisWeek: 5000,
      expEarnedThisMonth: 20000
    },
    organization: {
      name: 'Marinha',
      type: 'marine_rank',
      position: 'Capitão'
    },
    fightingStyle: ['Rokushiki', 'Estilo Livre'],
    inventory: [
      { item: 'Jutte de Kairouseki', quantity: 1 },
      { item: 'Uniforme da Marinha', quantity: 1 },
      { item: 'Cigarro', quantity: 100 },
      { item: 'Den Den Mushi Militar', quantity: 1 },
      { item: 'Mapa do Grand Line', quantity: 1 }
    ]
  },
  {
    id: '6',
    userId: '6',
    name: 'Sabo',
    nickname: 'Punho de Chamas',
    level: 39,
    bounty: 602000000,
    energies: {
      stamina: {
        current: 240000,
        max: calculateStaminaMax(5)
      },
      haki: {
        current: 400000,
        max: calculateHakiMax(9)
      },
      resistance: {
        current: 95000,
        max: calculateResistanceMax(1)
      }
    },
    background: 'Chefe de Estado-Maior do Exército Revolucionário e irmão jurado de Luffy e Ace. Luta pela liberdade dos oprimidos contra o Governo Mundial.',
    diary: 'A revolução avança. Cada passo nos aproxima de um mundo livre da tirania dos Nobres Mundiais.',
    devilFruit: 'Mera Mera no Mi - Permite que o corpo se transforme em fogo, criando e controlando chamas à vontade.',
    haki: 'Haki do Rei (Intermediário), Haki da Observação (Avançado), Haki do Armamento (Mestre)',
    race: 'Humano',
    profession: 'Músico',
    appearance: 'Homem loiro elegante com cicatrizes no rosto, sempre usando cartola',
    age: 22,
    creationDate: '2024-01-01',
    xp: 3150000,
    victories: 50,
    defeats: 2,
    islands: { level1: 18, level2: 10, level3: 5 },
    tasks: 180,
    skillPoints: 2, // Level 39 - pontos usados (5+9+1+4+4+6+0+0+8+0) = 37 pontos usados, sobram 2
    skillLevels: {
      stamina: 5,
      haki: 9,
      resistance: 1,
      hakiArmament: 4,
      hakiObservation: 4,
      fightingStyle: 6,
      weapon: 0,
      devilFruit: 0,
      profession: 8,
      race: 0
    },
    battlePass: {
      bronze: 0,
      gold: 0
    },
    dailyMissions: {
      scenes: 0,
      combat: 0
    },
    expBonus: {
      initial: 25000,
      tutorial: 0,
      punishments: 0
    },
    weeklyTasks: {
      currentWeek: getCurrentWeekString(),
      tasksCompleted: 3,
      tasksThisMonth: 11,
      expEarnedThisWeek: 15000,
      expEarnedThisMonth: 20000
    },
    organization: {
      name: 'Exército Revolucionário',
      type: 'revolutionary_army',
      position: 'Comandante'
    },
    fightingStyle: ['Arte do Tempo', 'Estilo Livre'],
    inventory: [
      { item: 'Cachimbo de Metal', quantity: 1 },
      { item: 'Capa do Exército Revolucionário', quantity: 1 },
      { item: 'Documentos Secretos', quantity: 5 },
      { item: 'Log Pose Especial', quantity: 1 },
      { item: 'Suprimentos Médicos', quantity: 10 }
    ]
  },
  {
    id: '7',
    userId: '7',
    name: 'Big News Morgans',
    nickname: 'Rei das Notícias',
    level: 25,
    bounty: 0, // Jornalista neutro
    energies: {
      stamina: {
        current: 120000,
        max: calculateStaminaMax(3)
      },
      haki: {
        current: 150000,
        max: calculateHakiMax(4)
      },
      resistance: {
        current: 9500,
        max: calculateResistanceMax(0)
      }
    },
    background: 'Presidente da World Economy News Paper e usuário da Tori Tori no Mi, Modelo: Albatroz. Especialista em espalhar notícias pelo mundo.',
    diary: 'Uma notícia bombástica está se desenvolvendo! O mundo deve saber sobre os eventos que moldam nossa era!',
    devilFruit: 'Tori Tori no Mi, Modelo: Albatroz - Permite se transformar em um albatroz gigante, ideal para voos longos e coleta de informações.',
    haki: 'Haki da Observação (Intermediário)',
    race: 'Humano',
    profession: 'Arqueólogo',
    appearance: 'Homem-pássaro albatros grande e imponente, sempre animado com notícias',
    age: 45,
    creationDate: '2024-01-01',
    xp: 1300000,
    victories: 10,
    defeats: 0,
    islands: { level1: 25, level2: 15, level3: 8 },
    tasks: 300,
    skillPoints: 4, // Level 25 - pontos usados (3+4+0+2+3+0+0+0+9+0) = 21 pontos usados, sobram 4
    skillLevels: {
      stamina: 3,
      haki: 4,
      resistance: 0,
      hakiArmament: 2,
      hakiObservation: 3,
      fightingStyle: 0,
      weapon: 0,
      devilFruit: 0,
      profession: 9,
      race: 0
    },
    battlePass: {
      bronze: 0,
      gold: 0
    },
    dailyMissions: {
      scenes: 0,
      combat: 0
    },
    expBonus: {
      initial: 25000,
      tutorial: 0,
      punishments: 0
    },
    weeklyTasks: {
      currentWeek: getCurrentWeekString(),
      tasksCompleted: 2,
      tasksThisMonth: 14,
      expEarnedThisWeek: 10000,
      expEarnedThisMonth: 20000
    },
    organization: {
      name: 'World Economy News Paper',
      type: 'journalist_agency',
      position: 'Presidente'
    },
    fightingStyle: ['Estilo Livre'],
    inventory: [
      { item: 'Câmera Fotográfica', quantity: 1 },
      { item: 'Bloco de Notas', quantity: 50 },
      { item: 'Den Den Mushi de Transmissão', quantity: 3 },
      { item: 'Binóculos Especiais', quantity: 1 },
      { item: 'Arquivo de Notícias', quantity: 100 }
    ]
  }
];

// Notícias mock
export const mockNews: News[] = [
  {
    id: '1',
    title: 'Novo Yonko é Coroado!',
    content: 'Após uma batalha épica no Novo Mundo, um novo Yonko emergiu, mudando completamente o equilíbrio de poder nos mares. Os Marines estão em alerta máximo.',
    author: 'Morgans',
    date: '2024-01-15'
  },
  {
    id: '2',
    title: 'Descoberta de Nova Ilha Misteriosa',
    content: 'Navegadores relataram o aparecimento de uma ilha nunca vista antes, envolta em uma névoa estranha. Alguns dizem que ela aparece apenas durante a lua cheia.',
    author: 'Jornal Marinho',
    date: '2024-01-10'
  },
  {
    id: '3',
    title: 'Revolução em Mariejois',
    content: 'Movimentos suspeitos foram detectados na sede do Governo Mundial. O Exército Revolucionário pode estar por trás dessas atividades.',
    author: 'Agente Secreto',
    date: '2024-01-05'
  }
];

// Entrevistas mock
export const mockInterviews: Interview[] = [
  {
    id: '1',
    title: 'Minha Primeira Aventura como Pirata',
    content: 'Era um dia ensolarado quando decidi deixar minha vila natal para me tornar um pirata. Nunca imaginei que encontraria tantos amigos verdadeiros pelo caminho...',
    author: '1',
    characterName: 'Monkey D. Luffy',
    date: '2024-01-12',
    status: 'approved'
  },
  {
    id: '2',
    title: 'O Caminho do Espadachim',
    content: 'Cada cicatriz em meu corpo conta uma história. Cada derrota me tornou mais forte. O caminho para se tornar o melhor espadachim do mundo não é fácil...',
    author: '3',
    characterName: 'Roronoa Zoro',
    date: '2024-01-08',
    status: 'approved'
  },
  {
    id: '3',
    title: 'Em Busca do All Blue',
    content: 'Todos os cozinheiros têm um sonho, e o meu é encontrar o lendário All Blue, onde todos os peixes dos quatro mares se encontram. Até lá, continuarei cozinhando para meus nakama.',
    author: '4',
    characterName: 'Vinsmoke Sanji',
    date: '2024-01-14',
    status: 'pending'
  },
  {
    id: '4',
    title: 'Justiça Absoluta nos Mares',
    content: 'Como marinheiro, meu dever é proteger os inocentes e manter a ordem. Cada pirata capturado é um passo em direção a um mundo mais seguro. A fumaça do meu cigarro marca minha determinação.',
    author: '5',
    characterName: 'Commodore Smoker',
    date: '2024-01-16',
    status: 'approved'
  },
  {
    id: '5',
    title: 'A Chama da Revolução',
    content: 'Cresci vendo as injustiças do mundo. A morte de Ace me ensinou que devemos lutar não apenas pelos nossos sonhos, mas pela liberdade de todos. O Exército Revolucionário é a esperança dos oprimidos.',
    author: '6',
    characterName: 'Sabo',
    date: '2024-01-18',
    status: 'pending'
  },
  {
    id: '6',
    title: 'Cobrindo as Grandes Notícias',
    content: 'Voei pelos quatro mares cobrindo as maiores histórias da nossa era. De Marineford às façanhas dos Yonkos, cada notícia molda o destino do mundo. Big News nunca decepciona!',
    author: '7',
    characterName: 'Big News Morgans',
    date: '2024-01-20',
    status: 'approved'
  }
];