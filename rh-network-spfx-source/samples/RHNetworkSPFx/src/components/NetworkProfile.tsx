import * as React from 'react';
import { useMemo } from 'react';
import {
  makeStyles,
  shorthands,
  tokens,
  Card,
  Text,
  Avatar,
  Badge,
  Button,
  Divider,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
} from '@fluentui/react-components';
import {
  ArrowRight20Regular,
  Organization20Regular,
  BoxRegular,
  Person20Regular,
  Navigation20Regular,
  Eye20Regular,
} from '@fluentui/react-icons';
import { IColaborador, IProjeto, INavigationHistory, IRelacionamento } from '../models';

const useStyles = makeStyles({
  networkContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalL,
    ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL),
  },
  breadcrumbSection: {
    ...shorthands.padding(tokens.spacingVerticalS, 0),
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalL,
    ...shorthands.padding(tokens.spacingVerticalL),
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusLarge,
  },
  profileInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
  },
  quickActions: {
    display: 'flex',
    gap: tokens.spacingHorizontalS,
  },
  networkSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
  },
  networkGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: tokens.spacingVerticalL,
  },
  relationshipCard: {
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
  },
  relationshipHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalM,
  },
  connectionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
  },
  connectionItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shorthands.padding(tokens.spacingVerticalS, 0),
  },
  connectionInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
    flex: 1,
  },
  emptyState: {
    textAlign: 'center',
    ...shorthands.padding(tokens.spacingVerticalXL),
    color: tokens.colorNeutralForeground2,
  },
});

export interface INetworkProfileProps {
  colaborador: IColaborador;
  onNavigateToProfile: (type: 'colaborador' | 'projeto', id: string) => void;
  navigationHistory?: INavigationHistory[];
  colaboradores: IColaborador[];
  projetos: IProjeto[];
}

export const NetworkProfile: React.FC<INetworkProfileProps> = React.memo(({
  colaborador,
  onNavigateToProfile,
  navigationHistory = [],
  colaboradores,
  projetos,
}) => {
  const styles = useStyles();

  // Calcular relacionamentos
  const relacionamentos: IRelacionamento = useMemo(() => {
    try {
      if (!colaborador?.nome || !colaborador?.id) {
        return { subordinados: [], supervisor: null, projetos: [] };
      }
      
      // Encontrar supervisor
      const supervisor = colaboradores.find(c => c.nome === colaborador.supervisor) || null;
      
      // Encontrar subordinados
      const subordinados = colaboradores.filter(c => c.supervisor === colaborador.nome);
      
      // Encontrar projetos (você pode implementar a lógica de alocação aqui)
      const projetosDoColaborador = projetos.filter(p => 
        p.coordenador === colaborador.nome || p.po === colaborador.nome
      );
      
      return {
        subordinados,
        supervisor,
        projetos: projetosDoColaborador
      };
    } catch (error) {
      console.error('Erro ao calcular relacionamentos:', error);
      return { subordinados: [], supervisor: null, projetos: [] };
    }
  }, [colaborador, colaboradores, projetos]);

  const renderBreadcrumb = () => (
    <div className={styles.breadcrumbSection}>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbButton
            icon={<Organization20Regular />}
            onClick={() => onNavigateToProfile('colaborador', 'root')}
          >
            RH Dashboard
          </BreadcrumbButton>
        </BreadcrumbItem>
        {navigationHistory.map((item) => (
          <React.Fragment key={item.id}>
            <BreadcrumbDivider />
            <BreadcrumbItem>
              <BreadcrumbButton
                icon={item.type === 'projeto' ? <BoxRegular /> : <Person20Regular />}
                onClick={() => onNavigateToProfile(item.type, item.id)}
              >
                {item.name}
              </BreadcrumbButton>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
        <BreadcrumbDivider />
        <BreadcrumbItem>
          <Text weight="semibold">{colaborador.nome}</Text>
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
  );

  const renderProfileHeader = () => (
    <div className={styles.profileHeader}>
      <Avatar
        name={colaborador.nome}
        size={72}
        badge={{
          status: colaborador.ativo ? 'available' : 'busy'
        }}
      />
      <div className={styles.profileInfo}>
        <Text size={600} weight="semibold">{colaborador.nome}</Text>
        <Text size={400} style={{ color: tokens.colorNeutralForeground2 }}>
          {colaborador.cargo} • {colaborador.funcao}
        </Text>
        <Text size={300} style={{ color: tokens.colorNeutralForeground2 }}>
          {colaborador.email}
        </Text>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalS, marginTop: tokens.spacingVerticalS }}>
          <Badge
            size="small"
            appearance="filled"
            color={colaborador.ativo ? 'success' : 'warning'}
          >
            {colaborador.ativo ? 'Ativo' : 'Inativo'}
          </Badge>
          {relacionamentos.supervisor && (
            <Badge size="small" appearance="outline" color="brand">
              Reporta a {relacionamentos.supervisor.nome}
            </Badge>
          )}
          {relacionamentos.subordinados.length > 0 && (
            <Badge size="small" appearance="outline" color="informative">
              {relacionamentos.subordinados.length} subordinado(s)
            </Badge>
          )}
        </div>
      </div>
      <div className={styles.quickActions}>
        <Button
          appearance="secondary"
          icon={<Eye20Regular />}
        >
          Editar Perfil
        </Button>
      </div>
    </div>
  );

  const renderHierarchy = () => (
    <Card className={styles.relationshipCard}>
      <div className={styles.relationshipHeader}>
        <Organization20Regular />
        <Text size={500} weight="semibold">Hierarquia Organizacional</Text>
      </div>
      
      <div className={styles.connectionsList}>
        {/* Supervisor */}
        {relacionamentos.supervisor ? (
          <div className={styles.connectionItem}>
            <div className={styles.connectionInfo}>
              <Avatar name={relacionamentos.supervisor.nome} size={32} />
              <div>
                <Text size={400} weight="medium">{relacionamentos.supervisor.nome}</Text>
                <Text size={200} style={{ color: tokens.colorNeutralForeground2 }}>
                  Supervisor • {relacionamentos.supervisor.cargo}
                </Text>
              </div>
            </div>
            <Button
              appearance="subtle"
              size="small"
              icon={<ArrowRight20Regular />}
              onClick={() => onNavigateToProfile('colaborador', relacionamentos.supervisor!.id)}
            >
              Ver Perfil
            </Button>
          </div>
        ) : (
          <div className={styles.connectionItem}>
            <div className={styles.connectionInfo}>
              <Avatar icon={<Person20Regular />} size={32} />
              <Text size={300} style={{ color: tokens.colorNeutralForeground2 }}>
                Nenhum supervisor definido
              </Text>
            </div>
          </div>
        )}

        <Divider />

        {/* Subordinados */}
        {relacionamentos.subordinados.length > 0 ? (
          relacionamentos.subordinados.map((subordinado) => (
            <div key={subordinado.id} className={styles.connectionItem}>
              <div className={styles.connectionInfo}>
                <Avatar name={subordinado.nome} size={32} />
                <div>
                  <Text size={400} weight="medium">{subordinado.nome}</Text>
                  <Text size={200} style={{ color: tokens.colorNeutralForeground2 }}>
                    Subordinado • {subordinado.cargo}
                  </Text>
                </div>
              </div>
              <Button
                appearance="subtle"
                size="small"
                icon={<ArrowRight20Regular />}
                onClick={() => onNavigateToProfile('colaborador', subordinado.id)}
              >
                Ver Perfil
              </Button>
            </div>
          ))
        ) : (
          <div className={styles.connectionItem}>
            <div className={styles.connectionInfo}>
              <Avatar icon={<Person20Regular />} size={32} />
              <Text size={300} style={{ color: tokens.colorNeutralForeground2 }}>
                Nenhum subordinado
              </Text>
            </div>
          </div>
        )}
      </div>
    </Card>
  );

  const renderProjetos = () => (
    <Card className={styles.relationshipCard}>
      <div className={styles.relationshipHeader}>
        <BoxRegular />
        <Text size={500} weight="semibold">Projetos ({relacionamentos.projetos.length})</Text>
      </div>
      
      <div className={styles.connectionsList}>
        {relacionamentos.projetos.length > 0 ? (
          relacionamentos.projetos.map((projeto) => (
            <div key={projeto.id} className={styles.connectionItem}>
              <div className={styles.connectionInfo}>
                <Avatar
                  name={projeto.nome}
                  size={32}
                  color="colorful"
                />
                <div>
                  <Text size={400} weight="medium">{projeto.nome}</Text>
                  <Text size={200} style={{ color: tokens.colorNeutralForeground2 }}>
                    {projeto.status} • Coord: {projeto.coordenador}
                  </Text>
                </div>
              </div>
              <Button
                appearance="subtle"
                size="small"
                icon={<ArrowRight20Regular />}
                onClick={() => onNavigateToProfile('projeto', projeto.id)}
              >
                Ver Projeto
              </Button>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>
            <BoxRegular style={{ fontSize: '32px', color: tokens.colorNeutralForeground3 }} />
            <Text size={300}>Nenhum projeto atribuído</Text>
          </div>
        )}
      </div>
    </Card>
  );

  return (
    <div className={styles.networkContainer}>
      {renderBreadcrumb()}
      {renderProfileHeader()}
      
      <div className={styles.networkSection}>
        <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS }}>
          <Navigation20Regular />
          <Text size={500} weight="semibold">Rede de Relacionamentos</Text>
        </div>
        
        <div className={styles.networkGrid}>
          {renderHierarchy()}
          {renderProjetos()}
        </div>
      </div>
    </div>
  );
});

NetworkProfile.displayName = 'NetworkProfile';