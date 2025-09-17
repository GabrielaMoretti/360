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
import { IColaborador, IProjeto, INavigationHistory } from '../models';

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

export interface IProjetoNetworkProfileProps {
  projeto: IProjeto;
  onNavigateToProfile: (type: 'colaborador' | 'projeto', id: string) => void;
  navigationHistory?: INavigationHistory[];
  colaboradores: IColaborador[];
  projetos: IProjeto[];
}

export const ProjetoNetworkProfile: React.FC<IProjetoNetworkProfileProps> = React.memo(({
  projeto,
  onNavigateToProfile,
  navigationHistory = [],
  colaboradores,
  projetos,
}) => {
  const styles = useStyles();

  // Calcular relacionamentos do projeto
  const relacionamentos = useMemo(() => {
    try {
      if (!projeto?.id || !projeto?.nome) {
        return { colaboradores: [], coordenador: null, projetosRelacionados: [] };
      }
      
      // Encontrar coordenador
      const coordenador = colaboradores.find(c => c.nome === projeto.coordenador) || null;
      
      // Encontrar equipe do projeto (implementar lógica de alocação)
      const equipe = colaboradores.filter(c => 
        c.nome === projeto.coordenador || c.nome === projeto.po
      );
      
      // Buscar projetos relacionados pelo mesmo coordenador ou departamento
      const projetosRelacionados = projetos.filter(p => 
        p.id !== projeto.id && (
          p.coordenador === projeto.coordenador ||
          p.departamento === projeto.departamento
        )
      ).slice(0, 5);
      
      return {
        colaboradores: equipe,
        coordenador,
        projetosRelacionados
      };
    } catch (error) {
      console.error('Erro ao calcular relacionamentos do projeto:', error);
      return { colaboradores: [], coordenador: null, projetosRelacionados: [] };
    }
  }, [projeto, colaboradores, projetos]);

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
          <Text weight="semibold">{projeto.nome}</Text>
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
  );

  const renderProfileHeader = () => (
    <div className={styles.profileHeader}>
      <Avatar
        name={projeto.nome}
        size={72}
        badge={{
          status: projeto.status === 'Ativo' ? 'available' : 'busy'
        }}
      />
      <div className={styles.profileInfo}>
        <Text size={600} weight="semibold">{projeto.nome}</Text>
        <Text size={400} style={{ color: tokens.colorNeutralForeground2 }}>
          Coordenador: {projeto.coordenador} • PO: {projeto.po}
        </Text>
        <Text size={300} style={{ color: tokens.colorNeutralForeground2 }}>
          {projeto.dataInicio ? new Date(projeto.dataInicio).toLocaleDateString('pt-BR') : ''} - {projeto.dataFim ? new Date(projeto.dataFim).toLocaleDateString('pt-BR') : 'Em andamento'}
        </Text>
        <div style={{ display: 'flex', gap: tokens.spacingHorizontalS, marginTop: tokens.spacingVerticalS }}>
          <Badge
            size="small"
            appearance="filled"
            color={projeto.status === 'Ativo' ? 'success' : projeto.status === 'Pausado' ? 'warning' : 'danger'}
          >
            {projeto.status}
          </Badge>
          {relacionamentos.coordenador && (
            <Badge size="small" appearance="outline" color="brand">
              Coordenado por {relacionamentos.coordenador.nome}
            </Badge>
          )}
          {relacionamentos.colaboradores.length > 0 && (
            <Badge size="small" appearance="outline" color="informative">
              {relacionamentos.colaboradores.length} colaborador(es)
            </Badge>
          )}
        </div>
      </div>
      <div className={styles.quickActions}>
        <Button
          appearance="secondary"
          icon={<Eye20Regular />}
        >
          Editar Projeto
        </Button>
      </div>
    </div>
  );

  const renderTeam = () => (
    <Card className={styles.relationshipCard}>
      <div className={styles.relationshipHeader}>
        <Person20Regular />
        <Text size={500} weight="semibold">Equipe ({relacionamentos.colaboradores.length})</Text>
      </div>
      
      <div className={styles.connectionsList}>
        {/* Coordenador */}
        {relacionamentos.coordenador && (
          <>
            <div className={styles.connectionItem}>
              <div className={styles.connectionInfo}>
                <Avatar name={relacionamentos.coordenador.nome} size={32} />
                <div>
                  <Text size={400} weight="medium">{relacionamentos.coordenador.nome}</Text>
                  <Text size={200} style={{ color: tokens.colorNeutralForeground2 }}>
                    Coordenador • {relacionamentos.coordenador.cargo}
                  </Text>
                </div>
              </div>
              <Button
                appearance="subtle"
                size="small"
                icon={<ArrowRight20Regular />}
                onClick={() => onNavigateToProfile('colaborador', relacionamentos.coordenador!.id)}
              >
                Ver Perfil
              </Button>
            </div>
            <Divider />
          </>
        )}

        {/* Membros da equipe */}
        {relacionamentos.colaboradores.length > 0 ? (
          relacionamentos.colaboradores.map((colaborador) => (
            <div key={colaborador.id} className={styles.connectionItem}>
              <div className={styles.connectionInfo}>
                <Avatar name={colaborador.nome} size={32} />
                <div>
                  <Text size={400} weight="medium">{colaborador.nome}</Text>
                  <Text size={200} style={{ color: tokens.colorNeutralForeground2 }}>
                    {colaborador.cargo} • {colaborador.funcao}
                  </Text>
                </div>
              </div>
              <Button
                appearance="subtle"
                size="small"
                icon={<ArrowRight20Regular />}
                onClick={() => onNavigateToProfile('colaborador', colaborador.id)}
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
                Nenhum membro na equipe
              </Text>
            </div>
          </div>
        )}
      </div>
    </Card>
  );

  const renderProjetosRelacionados = () => (
    <Card className={styles.relationshipCard}>
      <div className={styles.relationshipHeader}>
        <BoxRegular />
        <Text size={500} weight="semibold">Projetos Relacionados ({relacionamentos.projetosRelacionados.length})</Text>
      </div>
      
      <div className={styles.connectionsList}>
        {relacionamentos.projetosRelacionados.length > 0 ? (
          relacionamentos.projetosRelacionados.map((projetoRelacionado) => (
            <div key={projetoRelacionado.id} className={styles.connectionItem}>
              <div className={styles.connectionInfo}>
                <Avatar
                  name={projetoRelacionado.nome}
                  size={32}
                  color="colorful"
                />
                <div>
                  <Text size={400} weight="medium">{projetoRelacionado.nome}</Text>
                  <Text size={200} style={{ color: tokens.colorNeutralForeground2 }}>
                    {projetoRelacionado.status} • Coord: {projetoRelacionado.coordenador}
                  </Text>
                </div>
              </div>
              <Button
                appearance="subtle"
                size="small"
                icon={<ArrowRight20Regular />}
                onClick={() => onNavigateToProfile('projeto', projetoRelacionado.id)}
              >
                Ver Projeto
              </Button>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>
            <BoxRegular style={{ fontSize: '32px', color: tokens.colorNeutralForeground3 }} />
            <Text size={300}>Nenhum projeto relacionado encontrado</Text>
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
          {renderTeam()}
          {renderProjetosRelacionados()}
        </div>
      </div>
    </div>
  );
});

ProjetoNetworkProfile.displayName = 'ProjetoNetworkProfile';