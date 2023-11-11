<template>
    <div style="width: 60%;">
        <div>
            <div class="flex items-center" style="margin-left: 4%;margin-bottom: 30px;">
                <el-avatar :size="32" class="mr-3" :src="store.userInfo.imgurl" />
                <span class="text-sm mr-2" style="color: var(--el-text-color-regular)">
                    信息修改
                </span>
                <!-- 根据条件动态设置 el-tag 的 type -->
                <el-tag :type="tagType">{{ tagText }}</el-tag>
            </div>
        </div>

        <div>
            <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
                class="demo-ruleForm">
                <el-form-item label="Username">
                    <el-input v-model="ruleForm.username" autocomplete="off" />
                </el-form-item>
                <el-form-item label="Password">
                    <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
                </el-form-item>

                <el-form-item label="Age">
                    <el-input v-model.number="ruleForm.age" />
                </el-form-item>
                <el-form-item label="Sex">
                    <el-input v-model="ruleForm.sex" />
                </el-form-item>
                <el-form-item label="Email">
                    <el-input v-model="ruleForm.email" />
                </el-form-item>
                <el-form-item label="Img URL">
                    <el-input v-model="ruleForm.imgurl" />
                </el-form-item>
                <el-form-item label="Power">
                    <el-input v-model="ruleForm.power" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">提交修改</el-button>
                    <!-- <el-button @click="resetForm(ruleFormRef)">Reset</el-button> -->
                </el-form-item>
            </el-form>


        </div>
    </div>
</template>
  
<script  setup>
import { ref, reactive, computed ,onMounted} from 'vue'
import { useStore } from '../../../store/index'
import { submitApproval, login } from '../../../api/index'
let store = useStore()
console.log(store);

onMounted(()=>{
})

const ruleFormRef = ref(null)

const checkEmpty = (rule, value, callback) => {
    if (!value || value == '') {
        callback(new Error(`Please input ${rule.label}`))
    } else {
        callback()
    }
}

const ruleForm = reactive({
    userId: store.userInfo.id,
    password: store.userInfo.password,
    username: store.userInfo.username,
    age: store.userInfo.age,
    sex: store.userInfo.sex,
    email: store.userInfo.email,
    imgurl: store.userInfo.imgurl,
    power: store.userInfo.power
})

const rules = reactive({
    pass: [{ validator: checkEmpty, trigger: 'blur', label: 'Password' }],
    checkPass: [{ validator: checkEmpty, trigger: 'blur', label: 'Confirm Password' }],
    age: [{ validator: checkEmpty, trigger: 'blur', label: 'Age' }],
    sex: [{ validator: checkEmpty, trigger: 'blur', label: 'Sex' }],
    email: [{ validator: checkEmpty, trigger: 'blur', label: 'Email' }],
    imgurl: [{ validator: checkEmpty, trigger: 'blur', label: 'Img URL' }],
    power: [{ validator: checkEmpty, trigger: 'blur', label: 'Power' }]
})

const submitForm = async () => {
    const res = await submitApproval(ruleForm)
    console.log(res);
    getUserInfo()
}

const resetForm = (formEl) => {
    if (!formEl) return
    formEl.value.resetFields()
}

const getUserInfo = async() => {
    const res = await login({ username: store.userInfo.username, password: store.userInfo.password })
    store.userInfo = res.data
}
// 定义状态变量和标签文本
const status = ref(0)

status.value = store.userInfo.status
const tagText = computed(() => {
    switch (Number(status.value)) {
        case 1:
            return '审批中'
        case 2:
            return '审批不通过'
        case 3:
            return '审批'
        default:
            return '正常'
    }
})
const tagType = computed(() => {
    switch (Number(status.value)) {
        case 1:
            return 'info'
        case 2:
            return 'danger'
        case 3:
            return 'success'
        default:
            return ''
    }
})

</script>
  