import * as React from 'react';
import { IColaborador, IProjeto, INavigationHistory } from '../models';
export interface IProjetoNetworkProfileProps {
    projeto: IProjeto;
    onNavigateToProfile: (type: 'colaborador' | 'projeto', id: string) => void;
    navigationHistory?: INavigationHistory[];
    colaboradores: IColaborador[];
    projetos: IProjeto[];
}
export declare const ProjetoNetworkProfile: React.FC<IProjetoNetworkProfileProps>;
