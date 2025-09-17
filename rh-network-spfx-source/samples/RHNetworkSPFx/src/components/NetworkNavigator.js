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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as React from 'react';
import { useCallback, useState, useEffect } from 'react';
import { Dialog, DialogSurface, DialogTitle, DialogContent, DialogBody, DialogActions, Button, makeStyles, shorthands, } from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';
import { NetworkProfile } from './NetworkProfile';
import { ProjetoNetworkProfile } from './ProjetoNetworkProfile';
var useStyles = makeStyles({
    dialogSurface: {
        maxWidth: '90vw',
        maxHeight: '90vh',
        width: '1200px',
        height: '800px',
    },
    dialogContent: __assign(__assign({}, shorthands.padding(0)), { height: '100%', display: 'flex', flexDirection: 'column' }),
    dialogBody: __assign(__assign({ flex: 1 }, shorthands.overflow('auto')), shorthands.padding(0)),
});
export var NetworkNavigator = function (_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, initialEntity = _a.initialEntity, initialType = _a.initialType, colaboradores = _a.colaboradores, projetos = _a.projetos;
    var styles = useStyles();
    var _b = useState(initialEntity), currentEntity = _b[0], setCurrentEntity = _b[1];
    var _c = useState(initialType), currentType = _c[0], setCurrentType = _c[1];
    var _d = useState([]), navigationHistory = _d[0], setNavigationHistory = _d[1];
    // Reset quando abre com nova entidade
    useEffect(function () {
        if (isOpen) {
            setCurrentEntity(initialEntity || { id: 'default', nome: 'Dashboard' });
            setCurrentType(initialType || 'colaborador');
            setNavigationHistory([]);
        }
    }, [isOpen, initialEntity, initialType]);
    var handleNavigate = useCallback(function (type, id) {
        if (id === 'root') {
            onClose();
            return;
        }
        // Encontrar a entidade
        var entity = type === 'colaborador'
            ? colaboradores.find(function (c) { return c.id === id; })
            : projetos.find(function (p) { return p.id === id; });
        if (!entity)
            return;
        // Adicionar ao histórico
        if (currentEntity) {
            var currentName_1 = currentType === 'colaborador'
                ? currentEntity.nome
                : currentEntity.nome;
            setNavigationHistory(function (prev) { return __spreadArray(__spreadArray([], prev, true), [{
                    type: currentType,
                    id: currentEntity.id,
                    name: currentName_1
                }], false); });
        }
        // Navegar para nova entidade
        setCurrentEntity(entity);
        setCurrentType(type);
    }, [currentEntity, currentType, colaboradores, projetos, onClose]);
    var entityName = currentEntity && currentType === 'colaborador'
        ? currentEntity.nome
        : currentEntity && currentType === 'projeto'
            ? currentEntity.nome
            : 'Dashboard';
    return (React.createElement(Dialog, { open: isOpen },
        React.createElement(DialogSurface, { className: styles.dialogSurface },
            React.createElement(DialogTitle, null,
                "Rede de Relacionamentos - ",
                entityName),
            React.createElement(DialogContent, { className: styles.dialogContent },
                React.createElement(DialogBody, { className: styles.dialogBody }, currentEntity && currentType === 'colaborador' ? (React.createElement(NetworkProfile, { colaborador: currentEntity, navigationHistory: navigationHistory, onNavigateToProfile: handleNavigate, colaboradores: colaboradores, projetos: projetos })) : currentEntity && currentType === 'projeto' ? (React.createElement(ProjetoNetworkProfile, { projeto: currentEntity, navigationHistory: navigationHistory, onNavigateToProfile: handleNavigate, colaboradores: colaboradores, projetos: projetos })) : (React.createElement("div", null, "Nenhuma entidade selecionada")))),
            React.createElement(DialogActions, null,
                React.createElement(Button, { appearance: "secondary", icon: React.createElement(Dismiss24Regular, null), onClick: onClose }, "Fechar")))));
};
//# sourceMappingURL=NetworkNavigator.js.map