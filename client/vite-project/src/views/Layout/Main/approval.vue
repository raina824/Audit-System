<template>
    <!-- 描述 -->
    <div style="position: relative;width: 80%;border: 2px solid #f5f5f5;padding: 10px;margin: 10px;box-sizing: border-box;">
        <div v-for="(item,index) in store.approvalData"> 
            <el-descriptions class="margin-top" title="修改个人信息审批" :column="3" :size="size" border>

                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle">
                                <user />
                            </el-icon>
                            Username
                        </div>
                    </template>
               {{ item.submittedInfo.username }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle">
                                <iphone />
                            </el-icon>
                            age
                        </div>
                    </template>
                    {{ item.submittedInfo.age }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle">
                                <location />
                            </el-icon>
                            password
                        </div>
                    </template>
                    {{ item.submittedInfo.password }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle">
                                <tickets />
                            </el-icon>
                            sex
                        </div>
                    </template>
                    <!-- 根据条件动态设置 el-tag 的 type -->
                    <el-tag :type="getStatusTagType(item.status)">{{ getStatusTagText(item.status) }}</el-tag>

                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon :style="iconStyle">
                                <office-building />
                            </el-icon>
                            imgurl
                        </div>
                    </template>
                    {{ item.submittedInfo.imgurl }}
                </el-descriptions-item>

            </el-descriptions>

            <div style="margin-top: 12px;position: absolute;right: 10px;">
                <!-- <el-button type="danger">拒绝审批</el-button> -->
                <el-button type="primary" @click="passApprove(item)">通过审批</el-button>
            </div>
        </div>

    </div>
</template>
  
<script setup>
import { getApproverList,approvalPass } from '../../../api/index.Js'
import { computed, ref, onMounted } from 'vue'

import {
    Iphone,
    Location,
    OfficeBuilding,
    Tickets,
    User,
} from '@element-plus/icons-vue'
import { useStore } from '../../../store/index'

let store = useStore()
console.log(store);

onMounted(() => {
    getApproverListOutSide()
})
const size = ref('')
const iconStyle = computed(() => {
    const marginMap = {
        large: '8px',
        default: '6px',
        small: '4px',
    }
    return {
        marginRight: marginMap[size.value] || marginMap.default,
    }
})
const blockMargin = computed(() => {
    const marginMap = {
        large: '32px',
        default: '28px',
        small: '24px',
    }
    return {
        marginTop: marginMap[size.value] || marginMap.default,
    }
})


const getStatusTagText = (status) => {
  switch (Number(status)) {
    case 1:
      return '审批中'
    case 2:
      return '审批不通过'
    case 3:
      return '审批'
    default:
      return '正常'
  }
}

const getStatusTagType = (status) => {
  switch (Number(status)) {
    case 1:
      return 'info'
    case 2:
      return 'danger'
    case 3:
      return 'success'
    default:
      return ''
  }
}
// 得到全部审批数据
const getApproverListOutSide = async () => {
    const res = await getApproverList()
    store.approvalData = res.data
}
// 通过审批 
const passApprove = async (item) => {
    console.log(item);
    const res = await approvalPass({approvalId:item.id})
    getApproverListOutSide()
}
</script>
  
<style scoped>
.el-descriptions {
    margin-top: 20px;
}

.cell-item {
    display: flex;
    align-items: center;
}

.margin-top {
    margin-top: 20px;
}
</style>
  