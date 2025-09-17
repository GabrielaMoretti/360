var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import * as ReactDom from 'react-dom';
import { RhNetworkApp } from '../../components/RhNetworkApp';
import * as strings from 'RhNetworkWebPartStrings';
import styles from '../../components/RhNetworkApp.module.scss';
var RhNetworkWebPart = /** @class */ (function (_super) {
    __extends(RhNetworkWebPart, _super);
    function RhNetworkWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RhNetworkWebPart.prototype.render = function () {
        var _this = this;
        // Aplicar estilos base ao domElement para melhor integração
        this.domElement.style.width = '100%';
        this.domElement.style.height = '100%';
        this.domElement.style.overflow = 'hidden';
        this.domElement.className = styles.webPartContainer;
        var element = React.createElement(RhNetworkApp, {
            title: this.properties.title || 'RH Network Dashboard',
            description: this.properties.description || 'Sistema de navegação em rede para análise de relacionamentos',
            context: this.context,
            displayMode: this.displayMode,
            updateProperty: function (value) {
                _this.properties.title = value;
            },
            showQuickStats: true
        });
        ReactDom.render(element, this.domElement);
    };
    RhNetworkWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    RhNetworkWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField('title', {
                                    label: strings.TitleFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return RhNetworkWebPart;
}(BaseClientSideWebPart));
export default RhNetworkWebPart;
//# sourceMappingURL=RhNetworkWebPart.js.map