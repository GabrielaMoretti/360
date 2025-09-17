import * as React from 'react';
import { IColaborador, IProjeto, INavigationHistory } from '../models';
export interface INetworkProfileProps {
    colaborador: IColaborador;
    onNavigateToProfile: (type: 'colaborador' | 'projeto', id: string) => void;
    navigationHistory?: INavigationHistory[];
    colaboradores: IColaborador[];
    projetos: IProjeto[];
}
export declare const NetworkProfile: React.FC<INetworkProfileProps>;
