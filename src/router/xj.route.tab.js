import { asyncComponent } from '@/lib/utils';

const find = asyncComponent('pages/find/find');

export let r = [
  {
    path: 'find',
    name: 'find',
    component: find,
    meta:{
    	title:'发现'
    }
  }
];
