import * as React from 'react';
import { IColaborador, IProjeto } from '../models';
export interface INetworkNavigatorProps {
    isOpen: boolean;
    onClose: () => void;
    initialEntity: IColaborador | IProjeto | null;
    initialType: 'colaborador' | 'projeto';
    colaboradores: IColaborador[];
    projetos: IProjeto[];
}
export declare const NetworkNavigator: React.FC<INetworkNavigatorProps>;
