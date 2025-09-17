import * as React from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DisplayMode } from '@microsoft/sp-core-library';
export interface IRhNetworkAppProps {
    title: string;
    description?: string;
    showQuickStats?: boolean;
    context?: WebPartContext;
    displayMode?: DisplayMode;
    updateProperty?: (value: string) => void;
}
export declare const RhNetworkApp: React.FC<IRhNetworkAppProps>;
