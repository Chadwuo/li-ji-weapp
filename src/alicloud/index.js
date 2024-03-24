import MPServerless from '@alicloud/mpserverless-sdk';
import options from '~/alicloud/dev.json';

const mpserverless = new MPServerless(wx, options);

export default mpserverless;