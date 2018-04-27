import { asyncComponent } from '@/lib/utils';

const hIndex = asyncComponent('pages/home/index');

export let r = [
  {
    path: 'home',
    name: 'home',
    component: hIndex
  }
];
