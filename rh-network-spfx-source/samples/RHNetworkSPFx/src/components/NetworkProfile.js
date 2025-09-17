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
export var NetworkProfile = React.memo(function (_a) {
    var colaborador = _a.colaborador, onNavigateToProfile = _a.onNavigateToProfile, _b = _a.navigationHistory, navigationHistory = _b === void 0 ? [] : _b, colaboradores = _a.colaboradores, projetos = _a.projetos;
    var styles = useStyles();
    // Calcular relacionamentos
    var relacionamentos = useMemo(function () {
        try {
            if (!(colaborador === null || colaborador === void 0 ? void 0 : colaborador.nome) || !(colaborador === null || colaborador === void 0 ? void 0 : colaborador.id)) {
                return { subordinados: [], supervisor: null, projetos: [] };
            }
            // Encontrar supervisor
            var supervisor = colaboradores.find(function (c) { return c.nome === colaborador.supervisor; }) || null;
            // Encontrar subordinados
            var subordinados = colaboradores.filter(function (c) { return c.supervisor === colaborador.nome; });
            // Encontrar projetos (você pode implementar a lógica de alocação aqui)
            var projetosDoColaborador = projetos.filter(function (p) {
                return p.coordenador === colaborador.nome || p.po === colaborador.nome;
            });
            return {
                subordinados: subordinados,
                supervisor: supervisor,
                projetos: projetosDoColaborador
            };
        }
        catch (error) {
            console.error('Erro ao calcular relacionamentos:', error);
            return { subordinados: [], supervisor: null, projetos: [] };
        }
    }, [colaborador, colaboradores, projetos]);
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
                React.createElement(Text, { weight: "semibold" }, colaborador.nome))))); };
    var renderProfileHeader = function () { return (React.createElement("div", { className: styles.profileHeader },
        React.createElement(Avatar, { name: colaborador.nome, size: 72, badge: {
                status: colaborador.ativo ? 'available' : 'busy'
            } }),
        React.createElement("div", { className: styles.profileInfo },
            React.createElement(Text, { size: 600, weight: "semibold" }, colaborador.nome),
            React.createElement(Text, { size: 400, style: { color: tokens.colorNeutralForeground2 } },
                colaborador.cargo,
                " \u2022 ",
                colaborador.funcao),
            React.createElement(Text, { size: 300, style: { color: tokens.colorNeutralForeground2 } }, colaborador.email),
            React.createElement("div", { style: { display: 'flex', gap: tokens.spacingHorizontalS, marginTop: tokens.spacingVerticalS } },
                React.createElement(Badge, { size: "small", appearance: "filled", color: colaborador.ativo ? 'success' : 'warning' }, colaborador.ativo ? 'Ativo' : 'Inativo'),
                relacionamentos.supervisor && (React.createElement(Badge, { size: "small", appearance: "outline", color: "brand" },
                    "Reporta a ",
                    relacionamentos.supervisor.nome)),
                relacionamentos.subordinados.length > 0 && (React.createElement(Badge, { size: "small", appearance: "outline", color: "informative" },
                    relacionamentos.subordinados.length,
                    " subordinado(s)")))),
        React.createElement("div", { className: styles.quickActions },
            React.createElement(Button, { appearance: "secondary", icon: React.createElement(Eye20Regular, null) }, "Editar Perfil")))); };
    var renderHierarchy = function () { return (React.createElement(Card, { className: styles.relationshipCard },
        React.createElement("div", { className: styles.relationshipHeader },
            React.createElement(Organization20Regular, null),
            React.createElement(Text, { size: 500, weight: "semibold" }, "Hierarquia Organizacional")),
        React.createElement("div", { className: styles.connectionsList },
            relacionamentos.supervisor ? (React.createElement("div", { className: styles.connectionItem },
                React.createElement("div", { className: styles.connectionInfo },
                    React.createElement(Avatar, { name: relacionamentos.supervisor.nome, size: 32 }),
                    React.createElement("div", null,
                        React.createElement(Text, { size: 400, weight: "medium" }, relacionamentos.supervisor.nome),
                        React.createElement(Text, { size: 200, style: { color: tokens.colorNeutralForeground2 } },
                            "Supervisor \u2022 ",
                            relacionamentos.supervisor.cargo))),
                React.createElement(Button, { appearance: "subtle", size: "small", icon: React.createElement(ArrowRight20Regular, null), onClick: function () { return onNavigateToProfile('colaborador', relacionamentos.supervisor.id); } }, "Ver Perfil"))) : (React.createElement("div", { className: styles.connectionItem },
                React.createElement("div", { className: styles.connectionInfo },
                    React.createElement(Avatar, { icon: React.createElement(Person20Regular, null), size: 32 }),
                    React.createElement(Text, { size: 300, style: { color: tokens.colorNeutralForeground2 } }, "Nenhum supervisor definido")))),
            React.createElement(Divider, null),
            relacionamentos.subordinados.length > 0 ? (relacionamentos.subordinados.map(function (subordinado) { return (React.createElement("div", { key: subordinado.id, className: styles.connectionItem },
                React.createElement("div", { className: styles.connectionInfo },
                    React.createElement(Avatar, { name: subordinado.nome, size: 32 }),
                    React.createElement("div", null,
                        React.createElement(Text, { size: 400, weight: "medium" }, subordinado.nome),
                        React.createElement(Text, { size: 200, style: { color: tokens.colorNeutralForeground2 } },
                            "Subordinado \u2022 ",
                            subordinado.cargo))),
                React.createElement(Button, { appearance: "subtle", size: "small", icon: React.createElement(ArrowRight20Regular, null), onClick: function () { return onNavigateToProfile('colaborador', subordinado.id); } }, "Ver Perfil"))); })) : (React.createElement("div", { className: styles.connectionItem },
                React.createElement("div", { className: styles.connectionInfo },
                    React.createElement(Avatar, { icon: React.createElement(Person20Regular, null), size: 32 }),
                    React.createElement(Text, { size: 300, style: { color: tokens.colorNeutralForeground2 } }, "Nenhum subordinado"))))))); };
    var renderProjetos = function () { return (React.createElement(Card, { className: styles.relationshipCard },
        React.createElement("div", { className: styles.relationshipHeader },
            React.createElement(BoxRegular, null),
            React.createElement(Text, { size: 500, weight: "semibold" },
                "Projetos (",
                relacionamentos.projetos.length,
                ")")),
        React.createElement("div", { className: styles.connectionsList }, relacionamentos.projetos.length > 0 ? (relacionamentos.projetos.map(function (projeto) { return (React.createElement("div", { key: projeto.id, className: styles.connectionItem },
            React.createElement("div", { className: styles.connectionInfo },
                React.createElement(Avatar, { name: projeto.nome, size: 32, color: "colorful" }),
                React.createElement("div", null,
                    React.createElement(Text, { size: 400, weight: "medium" }, projeto.nome),
                    React.createElement(Text, { size: 200, style: { color: tokens.colorNeutralForeground2 } },
                        projeto.status,
                        " \u2022 Coord: ",
                        projeto.coordenador))),
            React.createElement(Button, { appearance: "subtle", size: "small", icon: React.createElement(ArrowRight20Regular, null), onClick: function () { return onNavigateToProfile('projeto', projeto.id); } }, "Ver Projeto"))); })) : (React.createElement("div", { className: styles.emptyState },
            React.createElement(BoxRegular, { style: { fontSize: '32px', color: tokens.colorNeutralForeground3 } }),
            React.createElement(Text, { size: 300 }, "Nenhum projeto atribu\u00EDdo")))))); };
    return (React.createElement("div", { className: styles.networkContainer },
        renderBreadcrumb(),
        renderProfileHeader(),
        React.createElement("div", { className: styles.networkSection },
            React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS } },
                React.createElement(Navigation20Regular, null),
                React.createElement(Text, { size: 500, weight: "semibold" }, "Rede de Relacionamentos")),
            React.createElement("div", { className: styles.networkGrid },
                renderHierarchy(),
                renderProjetos()))));
});
NetworkProfile.displayName = 'NetworkProfile';
//# sourceMappingURL=NetworkProfile.js.map