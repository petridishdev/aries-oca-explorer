import { useCallback, useEffect, useMemo, useState } from "react";
import CredentialCard from "./components/CredentialCard";
import Form from "./components/Form";
import OverlayBundle from "./services/OverlayBundle";

function App() {
  const [overlay, setOverlay] = useState<OverlayBundle | undefined>(undefined);

  const handleOverlay = useCallback((overlay: OverlayBundle) => {
    setOverlay(overlay);
  }, []);

  return (
    <div className="App">
      <Form onOverlay={handleOverlay} />
      {overlay && <CredentialCard overlay={overlay} />}
    </div>
  );
}

export default App;
