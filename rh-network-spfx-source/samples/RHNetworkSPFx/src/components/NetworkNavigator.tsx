import * as React from 'react';
import { useCallback, useState, useEffect } from 'react';
import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';
import { IColaborador, IProjeto, INavigationHistory } from '../models';
import { NetworkProfile } from './NetworkProfile';
import { ProjetoNetworkProfile } from './ProjetoNetworkProfile';

const useStyles = makeStyles({
  dialogSurface: {
    maxWidth: '90vw',
    maxHeight: '90vh',
    width: '1200px',
    height: '800px',
  },
  dialogContent: {
    ...shorthands.padding(0),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  dialogBody: {
    flex: 1,
    ...shorthands.overflow('auto'),
    ...shorthands.padding(0),
  },
});

export interface INetworkNavigatorProps {
  isOpen: boolean;
  onClose: () => void;
  initialEntity: IColaborador | IProjeto | null;
  initialType: 'colaborador' | 'projeto';
  colaboradores: IColaborador[];
  projetos: IProjeto[];
}

export const NetworkNavigator: React.FC<INetworkNavigatorProps> = ({
  isOpen,
  onClose,
  initialEntity,
  initialType,
  colaboradores,
  projetos,
}) => {
  const styles = useStyles();
  const [currentEntity, setCurrentEntity] = useState<IColaborador | IProjeto | null>(initialEntity);
  const [currentType, setCurrentType] = useState<'colaborador' | 'projeto'>(initialType);
  const [navigationHistory, setNavigationHistory] = useState<INavigationHistory[]>([]);

  // Reset quando abre com nova entidade
  useEffect(() => {
    if (isOpen) {
      setCurrentEntity(initialEntity || { id: 'default', nome: 'Dashboard' } as IColaborador);
      setCurrentType(initialType || 'colaborador');
      setNavigationHistory([]);
    }
  }, [isOpen, initialEntity, initialType]);

  const handleNavigate = useCallback((type: 'colaborador' | 'projeto', id: string) => {
    if (id === 'root') {
      onClose();
      return;
    }

    // Encontrar a entidade
    const entity = type === 'colaborador' 
      ? colaboradores.find(c => c.id === id)
      : projetos.find(p => p.id === id);

    if (!entity) return;

    // Adicionar ao histórico
    if (currentEntity) {
      const currentName = currentType === 'colaborador' 
        ? (currentEntity as IColaborador).nome 
        : (currentEntity as IProjeto).nome;

      setNavigationHistory(prev => [...prev, {
        type: currentType,
        id: currentEntity.id,
        name: currentName
      }]);
    }

    // Navegar para nova entidade
    setCurrentEntity(entity);
    setCurrentType(type);
  }, [currentEntity, currentType, colaboradores, projetos, onClose]);

  const entityName = currentEntity && currentType === 'colaborador' 
    ? (currentEntity as IColaborador).nome 
    : currentEntity && currentType === 'projeto'
    ? (currentEntity as IProjeto).nome
    : 'Dashboard';

  return (
    <Dialog open={isOpen}>
      <DialogSurface className={styles.dialogSurface}>
        <DialogTitle>
          Rede de Relacionamentos - {entityName}
        </DialogTitle>
        <DialogContent className={styles.dialogContent}>
          <DialogBody className={styles.dialogBody}>
            {currentEntity && currentType === 'colaborador' ? (
              <NetworkProfile
                colaborador={currentEntity as IColaborador}
                navigationHistory={navigationHistory}
                onNavigateToProfile={handleNavigate}
                colaboradores={colaboradores}
                projetos={projetos}
              />
            ) : currentEntity && currentType === 'projeto' ? (
              <ProjetoNetworkProfile
                projeto={currentEntity as IProjeto}
                navigationHistory={navigationHistory}
                onNavigateToProfile={handleNavigate}
                colaboradores={colaboradores}
                projetos={projetos}
              />
            ) : (
              <div>Nenhuma entidade selecionada</div>
            )}
          </DialogBody>
        </DialogContent>
        <DialogActions>
          <Button
            appearance="secondary"
            icon={<Dismiss24Regular />}
            onClick={onClose}
          >
            Fechar
          </Button>
        </DialogActions>
      </DialogSurface>
    </Dialog>
  );
};