import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
export interface IRhNetworkWebPartProps {
    title: string;
    description?: string;
    showQuickStats?: boolean;
}
export default class RhNetworkWebPart extends BaseClientSideWebPart<IRhNetworkWebPartProps> {
    render(): void;
    protected onDispose(): void;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
