import OverlayBundle from "../services/OverlayBundle";
import CredentialCard10 from "./CredentialCard10";

function CredentialCard({ overlay }: { overlay?: OverlayBundle }) {
  return <CredentialCard10 overlay={overlay} />;
}

export default CredentialCard;
