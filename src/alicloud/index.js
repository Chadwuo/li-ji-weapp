import MPServerless from '@alicloud/mpserverless-sdk';
import options from '~/alicloud/releases.json';

const mpserverless = new MPServerless(wx, options);

export default mpserverless;