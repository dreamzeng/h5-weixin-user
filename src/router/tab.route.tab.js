import { asyncComponent } from '@/lib/utils';

const home = asyncComponent('pages/home/Home');
const message = asyncComponent('pages/message/Message');
const mine = asyncComponent('pages/ucenter/Mine');
const discover = asyncComponent('pages/discover/Discover');

export let r = [
  {
    path: 'home1',
    name: 'home1',
    component: home
  },
  {
    path: 'message',
    name: 'message',
    component: message
  },
  {
    path: 'mine',
    name: 'mine',
    component: mine
  },
  {
    path: 'discover',
    name: 'discover',
    component: discover
  }
];
