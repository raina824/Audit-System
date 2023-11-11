import request from './request.js'

// 登录
export function login(param){
    return request.post('/user/login',param)
}
// 注册
export function register(param){
    return request.post('/user/register',param)
}
// 提交审批 
export function submitApproval(param){
    return request.post('/user/approvalInfo',param)
}
// 通过审批
export function approvalPass(param){
    return request.post('/user/approvalPass',param)
}
// 查询审批
export function getApproverList(){
    return request.get('/user/getApproverList')
}