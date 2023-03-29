import OverlayBundle from './OverlayBundle';
import { IOverlayBundleData } from './OverlayBundleData.interface';

class OverlayBundleFactory {
    public static async fetchOverlayBundle(credentialDefinitionId: string, url: string): Promise<OverlayBundle> {
        const response = await fetch(url);
        const data: IOverlayBundleData[] = await response.json();
        return new OverlayBundle(credentialDefinitionId, data[0] as IOverlayBundleData);
    }
}

export default OverlayBundleFactory;
