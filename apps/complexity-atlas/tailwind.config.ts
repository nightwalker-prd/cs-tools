import type { Config } from 'tailwindcss';
import preset from '@cstools/styles';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [preset],
};

export default config;
