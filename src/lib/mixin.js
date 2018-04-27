import {uuid,sStorage} from '@/lib/utils';
const scrollYList = sStorage.get('scrollYList') || {};

export default{
    data() {
        return {
            listenScroll:true,
            probeType:3,
            scrollY: -1,
        };
    },
    computed: {
        title() {
            return this.$route.meta && this.$route.meta.title || '';
        }
    },
    watch: {
        scrollY(newY) {
            let COMPONENT_NAME = this.$route.name;
            //记录滚动位置
            scrollYList[COMPONENT_NAME] = newY;
            sStorage.set('scrollYList',JSON.stringify(scrollYList));
        }
    },
    methods: {
        //滚动到指定位置
        scrollTo(vname) {
            setTimeout(()=>{
                let COMPONENT_NAME = this.$route.name;
                this.$refs[vname].scrollTo(0,scrollYList[COMPONENT_NAME] || 0);
            },20);
        },
        scroll(pos){
            this.scrollY = pos.y
        },
        getUuid(){
            return uuid();
        }
    }
}