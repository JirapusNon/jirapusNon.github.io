import type { StaticImageData } from 'next/image';
import blockfintLogo from '../../customers/222997.webp';
import kbankLogo from '../../customers/2.png';
import gideonLogo from '../../customers/logo_gideon.svg';
import partnerLogo from '../../customers/logo.png';

export const TRUSTED_CUSTOMERS: ReadonlyArray<{
  id: string;
  name: string;
  logo: StaticImageData | string;
}> = [
  { id: 'gideon', name: 'Gideon', logo: gideonLogo },
  { id: 'kbank', name: 'KBank', logo: kbankLogo },
  { id: 'blockfint', name: 'Blockfint', logo: blockfintLogo },
  { id: 'partner', name: 'ลูกค้าองค์กร', logo: partnerLogo },
];
