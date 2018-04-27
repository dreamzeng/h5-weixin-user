
const Api = require('@/api/index').default
export const SET_AUTH_INFO = 'SET_AUTH_INFO'
export const SET_LAWYER_INFO = 'SET_LAWYER_INFO'
export const SET_BASEINFO_LAWYER = 'SET_BASEINFO_LAWYER'

export default{
    state: {
        authObj: {},
        baseLawyerObj:{}, //基本资料
        lawyerInfoObj:{}
    },
    mutations: {
        [SET_AUTH_INFO](state, authObj){
            state.authObj = authObj
        },
        [SET_LAWYER_INFO](state, lawyerInfoObj){
            state.lawyerInfoObj = lawyerInfoObj
        },
        [SET_BASEINFO_LAWYER](state, baseLawyerObj){
            state.baseLawyerObj = baseLawyerObj
        }
    },
    actions:{
        getLawyerInfo(context){
            return new Promise((resolve, reject) =>{
                Api.auth.getLawyerInfo().then(resp=>{
                    context.commit(SET_BASEINFO_LAWYER, resp.data)
                    resolve(resp.data)
                }).catch(err=>{
                    reject(err)
                })
            })
        }
    }
}