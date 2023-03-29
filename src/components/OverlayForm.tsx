import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import OverlayBundle from "../types/overlay/OverlayBundle";
import CredentialCard from "./CredentialCard";
import CredentialDetail from "./CredentialDetail";

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
    <Grid>
      <Grid paddingTop="1em">
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
      </Grid>

      <Grid container gap={4} paddingTop="1em">
        <Grid xs display="flex" justifyContent="center" alignItems="flex-start">
          <CredentialCard overlay={overlay} language={language} />
        </Grid>
        <Grid xs display="flex" justifyContent="center" alignItems="flex-start">
          <CredentialDetail overlay={overlay} language={language} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default OverlayForm;
