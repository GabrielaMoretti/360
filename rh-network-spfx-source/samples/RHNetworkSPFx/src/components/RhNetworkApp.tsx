import * as React from 'react';
import { useState, useCallback } from 'react';
import {
  FluentProvider,
  webLightTheme,
  makeStyles,
  shorthands,
  tokens,
  Text,
  Card,
  Button,
  Avatar,
  Badge,
} from '@fluentui/react-components';
import {
  Person20Regular,
  BoxRegular,
  Organization20Regular,
} from '@fluentui/react-icons';
import { NetworkNavigator } from './NetworkNavigator';
import { IColaborador, IProjeto, INavigationHistory } from '../models';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DisplayMode } from '@microsoft/sp-core-library';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    fontFamily: tokens.fontFamilyBase,
  },
  appContainer: {
    ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL),
    backgroundColor: tokens.colorNeutralBackground1,
    minHeight: '500px',
    maxWidth: '1200px',
    margin: '0 auto',
    boxSizing: 'border-box',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalL,
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: tokens.shadow4,
    flexWrap: 'wrap',
    '@media screen and (max-width: 768px)': {
      flexDirection: 'column',
      textAlign: 'center',
      gap: tokens.spacingVerticalM,
    },
  },
  headerContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
  },
  headerActions: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
    '@media screen and (max-width: 768px)': {
      width: '100%',
      justifyContent: 'center',
    },
  },
  quickStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: tokens.spacingVerticalM,
    marginBottom: tokens.spacingVerticalL,
    '@media screen and (max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
  statCard: {
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: tokens.spacingVerticalS,
    transition: 'transform 0.2s ease-in-out',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: tokens.shadow8,
    },
  },
  quickLinksSection: {
    marginBottom: tokens.spacingVerticalL,
  },
  quickLinksTitle: {
    marginBottom: tokens.spacingVerticalM,
    display: 'block',
  },
  quickLinks: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: tokens.spacingVerticalM,
    '@media screen and (max-width: 640px)': {
      gridTemplateColumns: '1fr',
    },
  },
  quickLinkCard: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
    textAlign: 'left',
    justifyContent: 'flex-start',
    width: '100%',
    minHeight: '60px',
  },
  quickLinkInfo: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
});

export interface IRhNetworkAppProps {
  title: string;
  description?: string;
  showQuickStats?: boolean;
  context?: WebPartContext; // Contexto do SPFx para acessar informações do ambiente
  displayMode?: DisplayMode; // Modo de exibição (Leitura/Edição)
  updateProperty?: (value: string) => void; // Callback para atualizar propriedades
}

export const RhNetworkApp: React.FC<IRhNetworkAppProps> = ({ 
  title, 
  description,
  showQuickStats = true 
}) => {
  const styles = useStyles();
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false);

  // Dados mock para demonstração - em produção viriam do SharePoint
  const mockColaboradores: IColaborador[] = [
    {
      id: '1',
      nome: 'Ana Silva',
      cargo: 'Gerente de Projetos',
      departamento: 'TI',
      email: 'ana.silva@empresa.com',
      dataAdmissao: '2020-03-15',
      telefone: '(11) 98765-4321',
      funcao: 'Gestão',
      status: 'Ativo',
      ativo: true,
    },
    {
      id: '2',
      nome: 'Carlos Santos',
      cargo: 'Desenvolvedor Senior',
      departamento: 'TI',
      email: 'carlos.santos@empresa.com',
      dataAdmissao: '2019-08-22',
      telefone: '(11) 99876-5432',
      funcao: 'Desenvolvimento',
      status: 'Ativo',
      ativo: true,
    },
    {
      id: '3',
      nome: 'Maria Oliveira',
      cargo: 'UX Designer',
      departamento: 'Design',
      email: 'maria.oliveira@empresa.com',
      dataAdmissao: '2021-01-10',
      telefone: '(11) 97654-3210',
      funcao: 'Design',
      status: 'Ativo',
      ativo: true,
    },
  ];

  const mockProjetos: IProjeto[] = [
    {
      id: '1',
      nome: 'Sistema de Gestão RH',
      descricao: 'Desenvolvimento de sistema interno para gestão de recursos humanos',
      status: 'Ativo',
      dataInicio: '2024-01-15',
      dataFim: '2024-12-31',
      coordenador: 'Ana Silva',
      po: 'Maria Oliveira',
      departamento: 'TI',
    },
    {
      id: '2',
      nome: 'Portal do Cliente',
      descricao: 'Desenvolvimento de portal para atendimento ao cliente',
      status: 'Ativo',
      dataInicio: '2024-03-01',
      dataFim: '2024-10-31',
      coordenador: 'Carlos Santos',
      po: 'Ana Silva',
      departamento: 'TI',
    },
  ];

  const handleOpenNavigator = useCallback(() => {
    setIsNavigatorOpen(true);
  }, []);

  const handleCloseNavigator = useCallback(() => {
    setIsNavigatorOpen(false);
  }, []);

  return (
    <FluentProvider theme={webLightTheme} className={styles.root}>
      <div className={styles.appContainer}>
        {/* Header */}
        <div className={styles.header}>
          <Avatar
            name="RH Network"
            icon={<Organization20Regular />}
            size={48}
            color="brand"
          />
          <div className={styles.headerContent}>
            <Text size={600} weight="semibold">
              {title || 'RH Network Dashboard'}
            </Text>
            <Text size={300} style={{ color: tokens.colorNeutralForeground2 }}>
              {description || 'Sistema de navegação em rede para análise de relacionamentos'}
            </Text>
          </div>
          <div className={styles.headerActions}>
            <Button
              appearance="primary"
              onClick={handleOpenNavigator}
              icon={<Organization20Regular />}
            >
              Abrir Navegador de Rede
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        {showQuickStats && (
          <div className={styles.quickStats}>
            <Card className={styles.statCard}>
              <Person20Regular style={{ fontSize: '32px', color: tokens.colorBrandForeground1 }} />
              <Text size={500} weight="semibold">
                {mockColaboradores.length}
              </Text>
              <Text size={300} style={{ color: tokens.colorNeutralForeground2 }}>
                Colaboradores
              </Text>
            </Card>
            
            <Card className={styles.statCard}>
              <BoxRegular style={{ fontSize: '32px', color: tokens.colorBrandForeground1 }} />
              <Text size={500} weight="semibold">
                {mockProjetos.length}
              </Text>
              <Text size={300} style={{ color: tokens.colorNeutralForeground2 }}>
                Projetos Ativos
              </Text>
            </Card>
          </div>
        )}

        {/* Quick Links */}
        <div className={styles.quickLinksSection}>
          <Text size={500} weight="semibold" className={styles.quickLinksTitle}>
            Acesso Rápido
          </Text>
          <div className={styles.quickLinks}>
            {mockColaboradores.slice(0, 3).map((colaborador) => (
              <Card
                key={colaborador.id}
                className={styles.quickLinkCard}
                style={{ cursor: 'pointer' }}
                onClick={handleOpenNavigator}
              >
                <Avatar 
                  name={colaborador.nome} 
                  size={40}
                  badge={{ status: colaborador.ativo ? 'available' : 'busy' }}
                />
                <div className={styles.quickLinkInfo}>
                  <Text size={400} weight="medium">
                    {colaborador.nome}
                  </Text>
                  <Text size={300} style={{ color: tokens.colorNeutralForeground2 }}>
                    {colaborador.cargo} • {colaborador.departamento}
                  </Text>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Network Navigator */}
        {isNavigatorOpen && (
          <NetworkNavigator
            isOpen={isNavigatorOpen}
            initialEntity={null}
            initialType="colaborador"
            colaboradores={mockColaboradores}
            projetos={mockProjetos}
            onClose={handleCloseNavigator}
          />
        )}
      </div>
    </FluentProvider>
  );
};