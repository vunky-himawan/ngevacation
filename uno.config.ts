// uno.config.ts
import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
} from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
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
