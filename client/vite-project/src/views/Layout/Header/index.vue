<template>
    <div>
        <div class="nav" style="display: flex; justify-content: space-between; color: white">
            <div class="left">
                <h3 style="line-height: 80px; margin-left: 20px"></h3>
            </div>
            <div class="right" style="display: flex; line-height: 80px; margin-right: 40px">
                <div style="margin-right: 30px">
                    <div style="position: relative;top: 5px;">
                        <el-avatar v-if="changeAviter == '女'"
                            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                        <el-avatar v-else-if="changeAviter == '男'"
                            src="http://101.43.220.89:8888/down/QdiRu1FgBnA0.png"></el-avatar>
                    </div>
                </div>
                <div>
                    <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                          下拉菜单<el-icon class="el-icon--right"><arrow-down /></el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="a">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>

                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue'
import router from '../../../router/index'
import { useStore } from '../../../store/index'
let store = useStore()
console.log(router);
const changeAviter = ref(localStorage.getItem('sex'))

const handleCommand = (command) => {
    console.log(command);
    if (command === "a") {
        store.$reset()
        router.push('/')
    }

}
</script>
  
<style scoped>
.el-card /deep/ .el-card__header {
    padding: 0;
}

.nav {
    height: 65px;
    background: #eef2ff;
}

.el-dropdown-link {
    font-size: 15px;
    line-height: 65px;
    cursor: pointer;
    color: #409eff;
}

.el-icon-arrow-down {
    font-size: 12px;
}
</style>
  