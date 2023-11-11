<script setup>
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
import { useStore } from '../../../store/index'
let store= useStore()


</script>
<template>
    <el-menu router default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <el-menu-item index="/main/ownInfo" v-if="store.userInfo.power !== 'root'">
            <el-icon><icon-menu /></el-icon>
            <span>修改个人信息</span>
        </el-menu-item>
        <el-menu-item index="/main/approveInfo" v-if="store.userInfo.power == 'root'">
            <el-icon>
                <setting />
            </el-icon>
            <span>我的审批记录</span>
        </el-menu-item>
    </el-menu>
</template>
<style lang="scss" scoped>
.el-menu{
    margin-top: 5px;
    height: 100vh;
}
</style>