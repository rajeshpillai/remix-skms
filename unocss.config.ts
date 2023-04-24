import { defineConfig, presetUno } from "unocss";

import presetAttributify from '@unocss/preset-attributify';
export default defineConfig({
    // more presets: https://uno.antfu.me/?s=preset
    presets: [
      presetUno(),
      presetAttributify({ /* preset options */ }),
    ]
});
