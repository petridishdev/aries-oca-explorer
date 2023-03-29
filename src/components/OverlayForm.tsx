import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import OverlayBundle from "../services/OverlayBundle";
import CredentialCard from "./CredentialCard";

function OverlayForm({ overlay }: { overlay?: OverlayBundle }) {
  const [language, setLanguage] = useState<string>("");

  useEffect(() => {
    if (!overlay?.languages) {
      return;
    }
    setLanguage(overlay.languages[0]);
  }, [overlay?.languages]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLanguage((event.target as HTMLInputElement).value);
    },
    []
  );

  return (
    <div>
      <FormControl fullWidth>
        <FormLabel id="overlay-bundle-language-label">Language</FormLabel>
        <RadioGroup
          aria-labelledby="overlay-bundle-language-label"
          name="language"
          onChange={handleChange}
          value={language}
          row
        >
          {overlay?.languages?.map((language) => (
            <FormControlLabel
              key={language}
              value={language}
              control={<Radio />}
              label={language}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <CredentialCard overlay={overlay} language={language} />
    </div>
  );
}

export default OverlayForm;
