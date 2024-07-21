// uno.config.ts
import {
  defineConfig,
  presetTypography,
  presetUno,
  presetWebFonts,
} from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetTypography(),
    presetWebFonts({
      provider: "fontshare",
      fonts: {
        sathosi: "Sathosi",
        cabinet: "Cabinet Grotesk",
      },
    }),
  ],
});
