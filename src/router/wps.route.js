import {asyncComponent} from '@/lib/utils'

const NewsDetail = asyncComponent('pages/newsdetail/news-detail')
const CommitList = asyncComponent('pages/newsdetail/commit-list')
const MyCollect = asyncComponent('pages/mycollect/my-collect')
export let r = [
    {
        path: '/NewsDetail/:articleId',
        name: 'NewsDetail',
        component: NewsDetail,
        meta: {
            title: '资讯详情'
            
        }
    },
    {
        path: '/CommitList/:articleId/:uuid',
        name: 'CommitList',
        component: CommitList,
        meta: {
            title: '评论列表'
        }
    },
    {
        path: '/MyCollect',
        name: 'MyCollect',
        component: MyCollect,
        meta: {
            title: '我的收藏',
            auth:true
        }
    }
]