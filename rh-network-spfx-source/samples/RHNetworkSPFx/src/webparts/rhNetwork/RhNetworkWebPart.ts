import * as React from 'react';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { 
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import * as ReactDom from 'react-dom';
import { RhNetworkApp } from '../../components/RhNetworkApp';
import * as strings from 'RhNetworkWebPartStrings';
import styles from '../../components/RhNetworkApp.module.scss';

export interface IRhNetworkWebPartProps {
  title: string;
  description?: string;
  showQuickStats?: boolean;
}

export default class RhNetworkWebPart extends BaseClientSideWebPart<IRhNetworkWebPartProps> {
  
  public render(): void {
    // Aplicar estilos base ao domElement para melhor integração
    this.domElement.style.width = '100%';
    this.domElement.style.height = '100%';
    this.domElement.style.overflow = 'hidden';
    this.domElement.className = styles.webPartContainer;
    
    const element: React.ReactElement = React.createElement(
      RhNetworkApp,
      {
        title: this.properties.title || 'RH Network Dashboard',
        description: this.properties.description || 'Sistema de navegação em rede para análise de relacionamentos',
        context: this.context, // Utilizar o contexto do SPFx
        displayMode: this.displayMode,
        updateProperty: (value: string) => {
          this.properties.title = value;
        },
        showQuickStats: true
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
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
  }
}