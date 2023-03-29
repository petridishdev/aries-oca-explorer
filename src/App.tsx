import { useCallback, useEffect, useMemo, useState } from "react";
import Form from "./components/Form";
import OverlayForm from "./components/OverlayForm";
import OverlayBundle from "./services/OverlayBundle";

function App() {
  const [overlay, setOverlay] = useState<OverlayBundle | undefined>(undefined);

  const handleOverlay = useCallback((overlay: OverlayBundle) => {
    setOverlay(overlay);
  }, []);

  return (
    <div className="App">
      <Form onOverlay={handleOverlay} />
      {overlay && <OverlayForm overlay={overlay} />}
    </div>
  );
}

export default App;
