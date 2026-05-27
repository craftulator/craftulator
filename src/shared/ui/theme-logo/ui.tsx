import type {ThemeKey} from '../../theme/index.js';
import type {ThemeLogoProps} from './types.js';

import alchemicalLogo from '../../../../assets/themes/images/alchemical.png';
import animalLogo from '../../../../assets/themes/images/animal.png';
import biologicalLogo from '../../../../assets/themes/images/biological.png';
import engineeringLogo from '../../../../assets/themes/images/engineering.png';
import esotericLogo from '../../../../assets/themes/images/esoteric.png';
import fantasyLogo from '../../../../assets/themes/images/fantasy.png';
import futuristicLogo from '../../../../assets/themes/images/futuristic.png';
import generalLogo from '../../../../assets/themes/images/general.png';
import medievalLogo from '../../../../assets/themes/images/medieval.png';
import preciseLogo from '../../../../assets/themes/images/precise.png';
import spaceLogo from '../../../../assets/themes/images/space.png';

const themeLogoByKey: Record<ThemeKey, string> = {
  alchemical: alchemicalLogo,
  animal: animalLogo,
  biological: biologicalLogo,
  engineering: engineeringLogo,
  esoteric: esotericLogo,
  fantasy: fantasyLogo,
  futuristic: futuristicLogo,
  general: generalLogo,
  medieval: medievalLogo,
  precise: preciseLogo,
  space: spaceLogo,
};

export function ThemeLogo({themeKey}: ThemeLogoProps) {
  return (
    <img
      alt=''
      aria-hidden='true'
      className='theme-logo'
      src={themeLogoByKey[themeKey]}
    />
  );
}
