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
import { useState, useCallback } from 'react';
import { FluentProvider, webLightTheme, makeStyles, shorthands, tokens, Text, Card, Button, Avatar, } from '@fluentui/react-components';
import { Person20Regular, BoxRegular, Organization20Regular, } from '@fluentui/react-icons';
import { NetworkNavigator } from './NetworkNavigator';
var useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100%',
        fontFamily: tokens.fontFamilyBase,
    },
    appContainer: __assign(__assign({}, shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL)), { backgroundColor: tokens.colorNeutralBackground1, minHeight: '500px', maxWidth: '1200px', margin: '0 auto', boxSizing: 'border-box' }),
    header: __assign(__assign({ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM, marginBottom: tokens.spacingVerticalL }, shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM)), { backgroundColor: tokens.colorNeutralBackground2, borderRadius: tokens.borderRadiusLarge, boxShadow: tokens.shadow4, flexWrap: 'wrap', '@media screen and (max-width: 768px)': {
            flexDirection: 'column',
            textAlign: 'center',
            gap: tokens.spacingVerticalM,
        } }),
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
    statCard: __assign(__assign({}, shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM)), { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: tokens.spacingVerticalS, transition: 'transform 0.2s ease-in-out', ':hover': {
            transform: 'translateY(-2px)',
            boxShadow: tokens.shadow8,
        } }),
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
    quickLinkCard: __assign(__assign({ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM }, shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM)), { textAlign: 'left', justifyContent: 'flex-start', width: '100%', minHeight: '60px' }),
    quickLinkInfo: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
});
export var RhNetworkApp = function (_a) {
    var title = _a.title, description = _a.description, _b = _a.showQuickStats, showQuickStats = _b === void 0 ? true : _b;
    var styles = useStyles();
    var _c = useState(false), isNavigatorOpen = _c[0], setIsNavigatorOpen = _c[1];
    // Dados mock para demonstração - em produção viriam do SharePoint
    var mockColaboradores = [
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
    var mockProjetos = [
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
    var handleOpenNavigator = useCallback(function () {
        setIsNavigatorOpen(true);
    }, []);
    var handleCloseNavigator = useCallback(function () {
        setIsNavigatorOpen(false);
    }, []);
    return (React.createElement(FluentProvider, { theme: webLightTheme, className: styles.root },
        React.createElement("div", { className: styles.appContainer },
            React.createElement("div", { className: styles.header },
                React.createElement(Avatar, { name: "RH Network", icon: React.createElement(Organization20Regular, null), size: 48, color: "brand" }),
                React.createElement("div", { className: styles.headerContent },
                    React.createElement(Text, { size: 600, weight: "semibold" }, title || 'RH Network Dashboard'),
                    React.createElement(Text, { size: 300, style: { color: tokens.colorNeutralForeground2 } }, description || 'Sistema de navegação em rede para análise de relacionamentos')),
                React.createElement("div", { className: styles.headerActions },
                    React.createElement(Button, { appearance: "primary", onClick: handleOpenNavigator, icon: React.createElement(Organization20Regular, null) }, "Abrir Navegador de Rede"))),
            showQuickStats && (React.createElement("div", { className: styles.quickStats },
                React.createElement(Card, { className: styles.statCard },
                    React.createElement(Person20Regular, { style: { fontSize: '32px', color: tokens.colorBrandForeground1 } }),
                    React.createElement(Text, { size: 500, weight: "semibold" }, mockColaboradores.length),
                    React.createElement(Text, { size: 300, style: { color: tokens.colorNeutralForeground2 } }, "Colaboradores")),
                React.createElement(Card, { className: styles.statCard },
                    React.createElement(BoxRegular, { style: { fontSize: '32px', color: tokens.colorBrandForeground1 } }),
                    React.createElement(Text, { size: 500, weight: "semibold" }, mockProjetos.length),
                    React.createElement(Text, { size: 300, style: { color: tokens.colorNeutralForeground2 } }, "Projetos Ativos")))),
            React.createElement("div", { className: styles.quickLinksSection },
                React.createElement(Text, { size: 500, weight: "semibold", className: styles.quickLinksTitle }, "Acesso R\u00E1pido"),
                React.createElement("div", { className: styles.quickLinks }, mockColaboradores.slice(0, 3).map(function (colaborador) { return (React.createElement(Card, { key: colaborador.id, className: styles.quickLinkCard, style: { cursor: 'pointer' }, onClick: handleOpenNavigator },
                    React.createElement(Avatar, { name: colaborador.nome, size: 40, badge: { status: colaborador.ativo ? 'available' : 'busy' } }),
                    React.createElement("div", { className: styles.quickLinkInfo },
                        React.createElement(Text, { size: 400, weight: "medium" }, colaborador.nome),
                        React.createElement(Text, { size: 300, style: { color: tokens.colorNeutralForeground2 } },
                            colaborador.cargo,
                            " \u2022 ",
                            colaborador.departamento)))); }))),
            isNavigatorOpen && (React.createElement(NetworkNavigator, { isOpen: isNavigatorOpen, initialEntity: null, initialType: "colaborador", colaboradores: mockColaboradores, projetos: mockProjetos, onClose: handleCloseNavigator })))));
};
//# sourceMappingURL=RhNetworkApp.js.map