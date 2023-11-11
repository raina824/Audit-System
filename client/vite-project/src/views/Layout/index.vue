
<script setup>
import Nav from './Nav/index.vue'
import Header from './Header/index.vue'

</script>
<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <Nav></Nav>
                </el-aside>
                <el-main> <router-view></router-view></el-main>
            </el-container>
        </el-container>
    </div>
</template>
<style>
.el-header{
    padding: 0;
}
</style>