export interface IColaborador {
  id: string;
  nome: string;
  email: string;
  cargo: string;
  funcao: string;
  departamento: string;
  supervisor?: string;
  ativo: boolean;
  dataAdmissao: string;
  telefone?: string;
  localizacao?: string;
  status: string;
}

export interface IProjeto {
  id: string;
  nome: string;
  coordenador: string;
  po: string;
  status: 'Ativo' | 'Pausado' | 'Concluído' | 'Cancelado';
  dataInicio: string;
  dataFim?: string;
  descricao?: string;
  departamento: string;
}

export interface IAlocacao {
  id: string;
  colaboradorId: string;
  projetoId: string;
  funcaoNoProjeto: string;
  dataInicio: string;
  dataFim?: string;
  percentualAlocacao: number;
  status: 'Ativa' | 'Inativa' | 'Pausada';
}

export interface IRelacionamento {
  subordinados: IColaborador[];
  supervisor: IColaborador | null;
  projetos: IProjeto[];
}

export interface INavigationHistory {
  type: 'colaborador' | 'projeto';
  id: string;
  name: string;
}