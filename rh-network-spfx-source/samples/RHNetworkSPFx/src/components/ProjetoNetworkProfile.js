var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import { useMemo } from 'react';
import { makeStyles, shorthands, tokens, Card, Text, Avatar, Badge, Button, Divider, Breadcrumb, BreadcrumbItem, BreadcrumbButton, BreadcrumbDivider, } from '@fluentui/react-components';
import { ArrowRight20Regular, Organization20Regular, BoxRegular, Person20Regular, Navigation20Regular, Eye20Regular, } from '@fluentui/react-icons';
var useStyles = makeStyles({
    networkContainer: __assign({ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalL }, shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL)),
    breadcrumbSection: __assign(__assign({}, shorthands.padding(tokens.spacingVerticalS, 0)), { borderBottom: "1px solid ".concat(tokens.colorNeutralStroke2) }),
    profileHeader: __assign(__assign({ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalL }, shorthands.padding(tokens.spacingVerticalL)), { backgroundColor: tokens.colorNeutralBackground2, borderRadius: tokens.borderRadiusLarge }),
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
    relationshipCard: __assign({}, shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM)),
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
    connectionItem: __assign({ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }, shorthands.padding(tokens.spacingVerticalS, 0)),
    connectionInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: tokens.spacingHorizontalM,
        flex: 1,
    },
    emptyState: __assign(__assign({ textAlign: 'center' }, shorthands.padding(tokens.spacingVerticalXL)), { color: tokens.colorNeutralForeground2 }),
});
export var ProjetoNetworkProfile = React.memo(function (_a) {
    var projeto = _a.projeto, onNavigateToProfile = _a.onNavigateToProfile, _b = _a.navigationHistory, navigationHistory = _b === void 0 ? [] : _b, colaboradores = _a.colaboradores, projetos = _a.projetos;
    var styles = useStyles();
    // Calcular relacionamentos do projeto
    var relacionamentos = useMemo(function () {
        try {
            if (!(projeto === null || projeto === void 0 ? void 0 : projeto.id) || !(projeto === null || projeto === void 0 ? void 0 : projeto.nome)) {
                return { colaboradores: [], coordenador: null, projetosRelacionados: [] };
            }
            // Encontrar coordenador
            var coordenador = colaboradores.find(function (c) { return c.nome === projeto.coordenador; }) || null;
            // Encontrar equipe do projeto (implementar lógica de alocação)
            var equipe = colaboradores.filter(function (c) {
                return c.nome === projeto.coordenador || c.nome === projeto.po;
            });
            // Buscar projetos relacionados pelo mesmo coordenador ou departamento
            var projetosRelacionados = projetos.filter(function (p) {
                return p.id !== projeto.id && (p.coordenador === projeto.coordenador ||
                    p.departamento === projeto.departamento);
            }).slice(0, 5);
            return {
                colaboradores: equipe,
                coordenador: coordenador,
                projetosRelacionados: projetosRelacionados
            };
        }
        catch (error) {
            console.error('Erro ao calcular relacionamentos do projeto:', error);
            return { colaboradores: [], coordenador: null, projetosRelacionados: [] };
        }
    }, [projeto, colaboradores, projetos]);
    var renderBreadcrumb = function () { return (React.createElement("div", { className: styles.breadcrumbSection },
        React.createElement(Breadcrumb, null,
            React.createElement(BreadcrumbItem, null,
                React.createElement(BreadcrumbButton, { icon: React.createElement(Organization20Regular, null), onClick: function () { return onNavigateToProfile('colaborador', 'root'); } }, "RH Dashboard")),
            navigationHistory.map(function (item) { return (React.createElement(React.Fragment, { key: item.id },
                React.createElement(BreadcrumbDivider, null),
                React.createElement(BreadcrumbItem, null,
                    React.createElement(BreadcrumbButton, { icon: item.type === 'projeto' ? React.createElement(BoxRegular, null) : React.createElement(Person20Regular, null), onClick: function () { return onNavigateToProfile(item.type, item.id); } }, item.name)))); }),
            React.createElement(BreadcrumbDivider, null),
            React.createElement(BreadcrumbItem, null,
                React.createElement(Text, { weight: "semibold" }, projeto.nome))))); };
    var renderProfileHeader = function () { return (React.createElement("div", { className: styles.profileHeader },
        React.createElement(Avatar, { name: projeto.nome, size: 72, badge: {
                status: projeto.status === 'Ativo' ? 'available' : 'busy'
            } }),
        React.createElement("div", { className: styles.profileInfo },
            React.createElement(Text, { size: 600, weight: "semibold" }, projeto.nome),
            React.createElement(Text, { size: 400, style: { color: tokens.colorNeutralForeground2 } },
                "Coordenador: ",
                projeto.coordenador,
                " \u2022 PO: ",
                projeto.po),
            React.createElement(Text, { size: 300, style: { color: tokens.colorNeutralForeground2 } },
                projeto.dataInicio ? new Date(projeto.dataInicio).toLocaleDateString('pt-BR') : '',
                " - ",
                projeto.dataFim ? new Date(projeto.dataFim).toLocaleDateString('pt-BR') : 'Em andamento'),
            React.createElement("div", { style: { display: 'flex', gap: tokens.spacingHorizontalS, marginTop: tokens.spacingVerticalS } },
                React.createElement(Badge, { size: "small", appearance: "filled", color: projeto.status === 'Ativo' ? 'success' : projeto.status === 'Pausado' ? 'warning' : 'danger' }, projeto.status),
                relacionamentos.coordenador && (React.createElement(Badge, { size: "small", appearance: "outline", color: "brand" },
                    "Coordenado por ",
                    relacionamentos.coordenador.nome)),
                relacionamentos.colaboradores.length > 0 && (React.createElement(Badge, { size: "small", appearance: "outline", color: "informative" },
                    relacionamentos.colaboradores.length,
                    " colaborador(es)")))),
        React.createElement("div", { className: styles.quickActions },
            React.createElement(Button, { appearance: "secondary", icon: React.createElement(Eye20Regular, null) }, "Editar Projeto")))); };
    var renderTeam = function () { return (React.createElement(Card, { className: styles.relationshipCard },
        React.createElement("div", { className: styles.relationshipHeader },
            React.createElement(Person20Regular, null),
            React.createElement(Text, { size: 500, weight: "semibold" },
                "Equipe (",
                relacionamentos.colaboradores.length,
                ")")),
        React.createElement("div", { className: styles.connectionsList },
            relacionamentos.coordenador && (React.createElement(React.Fragment, null,
                React.createElement("div", { className: styles.connectionItem },
                    React.createElement("div", { className: styles.connectionInfo },
                        React.createElement(Avatar, { name: relacionamentos.coordenador.nome, size: 32 }),
                        React.createElement("div", null,
                            React.createElement(Text, { size: 400, weight: "medium" }, relacionamentos.coordenador.nome),
                            React.createElement(Text, { size: 200, style: { color: tokens.colorNeutralForeground2 } },
                                "Coordenador \u2022 ",
                                relacionamentos.coordenador.cargo))),
                    React.createElement(Button, { appearance: "subtle", size: "small", icon: React.createElement(ArrowRight20Regular, null), onClick: function () { return onNavigateToProfile('colaborador', relacionamentos.coordenador.id); } }, "Ver Perfil")),
                React.createElement(Divider, null))),
            relacionamentos.colaboradores.length > 0 ? (relacionamentos.colaboradores.map(function (colaborador) { return (React.createElement("div", { key: colaborador.id, className: styles.connectionItem },
                React.createElement("div", { className: styles.connectionInfo },
                    React.createElement(Avatar, { name: colaborador.nome, size: 32 }),
                    React.createElement("div", null,
                        React.createElement(Text, { size: 400, weight: "medium" }, colaborador.nome),
                        React.createElement(Text, { size: 200, style: { color: tokens.colorNeutralForeground2 } },
                            colaborador.cargo,
                            " \u2022 ",
                            colaborador.funcao))),
                React.createElement(Button, { appearance: "subtle", size: "small", icon: React.createElement(ArrowRight20Regular, null), onClick: function () { return onNavigateToProfile('colaborador', colaborador.id); } }, "Ver Perfil"))); })) : (React.createElement("div", { className: styles.connectionItem },
                React.createElement("div", { className: styles.connectionInfo },
                    React.createElement(Avatar, { icon: React.createElement(Person20Regular, null), size: 32 }),
                    React.createElement(Text, { size: 300, style: { color: tokens.colorNeutralForeground2 } }, "Nenhum membro na equipe"))))))); };
    var renderProjetosRelacionados = function () { return (React.createElement(Card, { className: styles.relationshipCard },
        React.createElement("div", { className: styles.relationshipHeader },
            React.createElement(BoxRegular, null),
            React.createElement(Text, { size: 500, weight: "semibold" },
                "Projetos Relacionados (",
                relacionamentos.projetosRelacionados.length,
                ")")),
        React.createElement("div", { className: styles.connectionsList }, relacionamentos.projetosRelacionados.length > 0 ? (relacionamentos.projetosRelacionados.map(function (projetoRelacionado) { return (React.createElement("div", { key: projetoRelacionado.id, className: styles.connectionItem },
            React.createElement("div", { className: styles.connectionInfo },
                React.createElement(Avatar, { name: projetoRelacionado.nome, size: 32, color: "colorful" }),
                React.createElement("div", null,
                    React.createElement(Text, { size: 400, weight: "medium" }, projetoRelacionado.nome),
                    React.createElement(Text, { size: 200, style: { color: tokens.colorNeutralForeground2 } },
                        projetoRelacionado.status,
                        " \u2022 Coord: ",
                        projetoRelacionado.coordenador))),
            React.createElement(Button, { appearance: "subtle", size: "small", icon: React.createElement(ArrowRight20Regular, null), onClick: function () { return onNavigateToProfile('projeto', projetoRelacionado.id); } }, "Ver Projeto"))); })) : (React.createElement("div", { className: styles.emptyState },
            React.createElement(BoxRegular, { style: { fontSize: '32px', color: tokens.colorNeutralForeground3 } }),
            React.createElement(Text, { size: 300 }, "Nenhum projeto relacionado encontrado")))))); };
    return (React.createElement("div", { className: styles.networkContainer },
        renderBreadcrumb(),
        renderProfileHeader(),
        React.createElement("div", { className: styles.networkSection },
            React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS } },
                React.createElement(Navigation20Regular, null),
                React.createElement(Text, { size: 500, weight: "semibold" }, "Rede de Relacionamentos")),
            React.createElement("div", { className: styles.networkGrid },
                renderTeam(),
                renderProjetosRelacionados()))));
});
ProjetoNetworkProfile.displayName = 'ProjetoNetworkProfile';
//# sourceMappingURL=ProjetoNetworkProfile.js.map