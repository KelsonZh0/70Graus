import { StyleSheet } from 'react-native';

export const CORES = {
  fundo:         '#000000',
  fundoCard:     '#1A1A1A',
  fundoInput:    '#262626',

  amarelo:       '#FACC15',
  laranja:       '#F97316',
  verde:         '#10B981',
  vermelho:      '#EF4444',

  textoPrimario:   '#FFFFFF',
  textoSecundario: '#A3A3A3',
  textoDesabilitado: '#525252',

  borda:         '#333333',
  bordaAtiva:    '#FACC15',

  statusBar:     'light',
} as const;

export const ESPACAMENTO = {
  xs:  4,
  sm:  8,
  md:  16,
  lg:  24,
  xl:  32,
  xxl: 48,
} as const;

export const RAIO = {
  sm:   6,
  md:   12,
  lg:   20,
  pill: 999,
} as const;

export const FONTE = {
  xs:   11,
  sm:   13,
  md:   15,
  lg:   18,
  xl:   22,
  xxl:  28,
  titulo: 34,
} as const;

export const HEADER_OPTIONS = {
  headerStyle: {
    backgroundColor: CORES.fundoCard,
  },
  headerTintColor: CORES.textoPrimario,
  headerTitleStyle: {
    fontWeight: 'bold' as const,
    fontSize: FONTE.lg,
  },
  headerShadowVisible: false,
} as const;

export const estilosGlobais = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: CORES.fundo,
  },
  conteudo: {
    flex: 1,
    paddingHorizontal: ESPACAMENTO.md,
  },

  card: {
    backgroundColor: CORES.fundoCard,
    borderRadius: RAIO.md,
    padding: ESPACAMENTO.md,
    marginBottom: ESPACAMENTO.sm,
    borderWidth: 1,
    borderColor: CORES.borda,
  },
  cardDestacado: {
    backgroundColor: CORES.fundoCard,
    borderRadius: RAIO.md,
    padding: ESPACAMENTO.md,
    marginBottom: ESPACAMENTO.sm,
    borderWidth: 1,
    borderColor: CORES.amarelo,
  },

  titulo: {
    fontSize: FONTE.xxl,
    fontWeight: 'bold',
    color: CORES.textoPrimario,
    marginBottom: ESPACAMENTO.sm,
  },
  subtitulo: {
    fontSize: FONTE.lg,
    fontWeight: '600',
    color: CORES.textoPrimario,
    marginBottom: ESPACAMENTO.xs,
  },
  texto: {
    fontSize: FONTE.md,
    color: CORES.textoSecundario,
    lineHeight: 22,
  },
  textoDestaque: {
    fontSize: FONTE.md,
    color: CORES.laranja,
    fontWeight: '600',
  },

  botaoPrimario: {
    backgroundColor: CORES.amarelo,
    borderRadius: RAIO.pill,
    paddingVertical: ESPACAMENTO.sm + 4,
    paddingHorizontal: ESPACAMENTO.lg,
    alignItems: 'center',
    marginTop: ESPACAMENTO.sm,
  },
  botaoPrimarioTexto: {
    color: '#000000',
    fontSize: FONTE.md,
    fontWeight: 'bold',
  },
  botaoSecundario: {
    borderWidth: 1,
    borderColor: CORES.amarelo,
    borderRadius: RAIO.pill,
    paddingVertical: ESPACAMENTO.sm + 4,
    paddingHorizontal: ESPACAMENTO.lg,
    alignItems: 'center',
    marginTop: ESPACAMENTO.sm,
  },
  botaoSecundarioTexto: {
    color: CORES.amarelo,
    fontSize: FONTE.md,
    fontWeight: '600',
  },

  tag: {
    backgroundColor: CORES.amarelo + '33',
    borderRadius: RAIO.pill,
    paddingHorizontal: ESPACAMENTO.sm,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  tagTexto: {
    color: CORES.amarelo,
    fontSize: FONTE.xs,
    fontWeight: '600',
  },

  separador: {
    height: 1,
    backgroundColor: CORES.borda,
    marginVertical: ESPACAMENTO.md,
  },

  centralizador: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: ESPACAMENTO.xl,
  },
   formulario: {
    marginTop: ESPACAMENTO.sm,
  },
  label: {
    fontSize: FONTE.md,
    color: CORES.textoPrimario,
    marginBottom: ESPACAMENTO.xs,
    fontWeight: '600',
    marginTop: ESPACAMENTO.sm,
  },
  input: {
    backgroundColor: CORES.fundoInput,
    color: CORES.textoPrimario,
    borderRadius: RAIO.md,
    paddingHorizontal: ESPACAMENTO.md,
    paddingVertical: 12, // Você pode ajustar a altura do input aqui
    marginBottom: ESPACAMENTO.sm,
    borderWidth: 1,
    borderColor: CORES.borda,
    fontSize: FONTE.md,
  },
});
