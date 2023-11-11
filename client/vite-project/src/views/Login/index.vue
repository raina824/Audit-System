<script setup>
import { reactive, ref, onMounted } from 'vue'
import { alertMessage } from '../../util/base.js'

import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// 导入动画库
import gsap from "gsap";
// 导入dat.gui
import * as dat from 'dat.gui'
onMounted(() => {

    // const gui = new dat.GUI();
    // 1、创建场景
    const scene = new THREE.Scene();

    // 2、创建相机
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        300
    );

    const textureLoader = new THREE.TextureLoader();
    const particlesTexture = textureLoader.load("./textures/particles/1.png");
    // 设置相机位置
    camera.position.set(0, 0, 18);
    scene.add(camera);

    const cubeGeometry = new THREE.BoxBufferGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial({
        wireframe: true,
    });
    const redMaterial = new THREE.MeshBasicMaterial({
        color: "#ff0000",
    });

    // 1000立方体
    let cubeArr = [];
    let cubeGroup = new THREE.Group();
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            for (let z = 0; z < 5; z++) {
                const cube = new THREE.Mesh(cubeGeometry, material);
                cube.position.set(i * 2 - 4, j * 2 - 4, z * 2 - 4);
                cubeGroup.add(cube);
                cubeArr.push(cube);
            }
        }
    }
    // 
    // scene.add(cubeGroup);

    // 创建三角形酷炫物体
    // 添加物体
    // 创建几何体
    var sjxGroup = new THREE.Group();
    for (let i = 0; i < 50; i++) {
        // 每一个三角形，需要3个顶点，每个顶点需要3个值
        const geometry = new THREE.BufferGeometry();
        const positionArray = new Float32Array(9);
        for (let j = 0; j < 9; j++) {
            if (j % 3 == 1) {
                positionArray[j] = Math.random() * 10 - 5;
            } else {
                positionArray[j] = Math.random() * 10 - 5;
            }
        }
        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(positionArray, 3)
        );
        let color = new THREE.Color(Math.random(), Math.random(), Math.random());
        const material = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.5,
            side: THREE.DoubleSide,
        });
        // 根据几何体和材质创建物体
        let sjxMesh = new THREE.Mesh(geometry, material);
        //   console.log(mesh);
        sjxGroup.add(sjxMesh);
    }
    sjxGroup.position.set(0, 0, 0);
    scene.add(sjxGroup);

    // 弹跳小球
    const sphereGroup = new THREE.Group();
    const sphereGeometry = new THREE.SphereBufferGeometry(1, 20, 20);
    const spherematerial = new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
    });
    const sphere = new THREE.Mesh(sphereGeometry, spherematerial);
    // 投射阴影
    sphere.castShadow = true;

    // sphereGroup.add(sphere);

    // // 创建平面
    const planeGeometry = new THREE.PlaneBufferGeometry(20, 20);
    const plane = new THREE.Mesh(planeGeometry, spherematerial);
    plane.position.set(0, -1, 0);
    plane.rotation.x = -Math.PI / 2;
    // 接收阴影
    plane.receiveShadow = true;
    sphereGroup.add(plane);

    // 灯光
    // 环境光
    const light = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
    sphereGroup.add(light);

    const smallBall = new THREE.Mesh(
        new THREE.SphereBufferGeometry(0.1, 20, 20),
        new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    smallBall.position.set(2, 2, 2);
    //直线光源
    const pointLight = new THREE.PointLight(0xff0000, 3);
    // pointLight.position.set(2, 2, 2);
    pointLight.castShadow = true;

    // 设置阴影贴图模糊度
    pointLight.shadow.radius = 20;
    // 设置阴影贴图的分辨率
    pointLight.shadow.mapSize.set(512, 512);

    // 设置透视相机的属性
    smallBall.add(pointLight);
    sphereGroup.add(smallBall);

    sphereGroup.position.set(0, -60, 0);
    // scene.add(sphereGroup);

    let arrGroup = [sphereGroup, sphereGroup, sphereGroup];

    // 创建投射光线对象
    const raycaster = new THREE.Raycaster();

    // 鼠标的位置对象
    const mouse = new THREE.Vector2();

    // 监听鼠标的位置
    window.addEventListener("mousemove", (event) => {
        mouse.x = event.clientX / window.innerWidth - 0.5;
        mouse.y = event.clientY / window.innerHeight - 0.5;
    });

    // 监听鼠标的位置
    window.addEventListener("click", (event) => {
        //   console.log(event);
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -((event.clientY / window.innerHeight) * 2 - 1);
        raycaster.setFromCamera(mouse, camera);
        let result = raycaster.intersectObjects(cubeArr);
        //   console.log(result);
        //   result[0].object.material = redMaterial;
        result.forEach((item) => {
            item.object.material = redMaterial;
        });
    });

    // 初始化渲染器
    // 渲染器透明
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    // 设置渲染的尺寸大小
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 开启场景中的阴影贴图
    renderer.shadowMap.enabled = true;
    renderer.physicallyCorrectLights = true;

    // console.log(renderer);
    // 将webgl渲染的canvas内容添加到body
    // document.body.appendChild(renderer.domElement);
    const canvasContainer = document.getElementById('canvasContainer');
    canvasContainer.appendChild(renderer.domElement);
    console.log(canvasContainer);
    // // 使用渲染器，通过相机将场景渲染进来
    // renderer.render(scene, camera);

    // 创建轨道控制器
    // const controls = new OrbitControls(camera, renderer.domElement);
    // // 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
    // controls.enableDamping = true;

    // 添加坐标轴辅助器
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
    // 设置时钟
    const clock = new THREE.Clock();

    gsap.to(cubeGroup.rotation, {
        x: "+=" + Math.PI * 2,
        y: "+=" + Math.PI * 2,
        duration: 10,
        ease: "power2.inOut",
        repeat: -1,
    });
    gsap.to(sjxGroup.rotation, {
        x: "-=" + Math.PI * 2,
        z: "+=" + Math.PI * 2,
        y: "+=" + Math.PI * 2,
        duration: 12,
        ease: "power2.inOut",
        repeat: -1,
    });
    gsap.to(smallBall.position, {
        x: -3,
        duration: 6,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
    });
    gsap.to(smallBall.position, {
        y: 0,
        duration: 0.5,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
    });
    function render() {
        //   let time = clock.getElapsedTime();
        let deltaTime = clock.getDelta();

        //   cubeGroup.rotation.x = time * 0.5;
        //   cubeGroup.rotation.y = time * 0.5;

        //   sjxGroup.rotation.x = time * 0.4;
        //   sjxGroup.rotation.z = time * 0.3;

        //   smallBall.position.x = Math.sin(time) * 3;
        //   smallBall.position.z = Math.cos(time) * 3;
        //   smallBall.position.y = 2 + Math.sin(time * 10) / 2;
        //   sphereGroup.rotation.z = Math.sin(time) * 0.05;
        //   sphereGroup.rotation.x = Math.sin(time) * 0.05;

        //   根据当前滚动的scrolly，去设置相机移动的位置
        camera.position.y = -(window.scrollY / window.innerHeight) * 30;

        camera.position.x += (mouse.x * 10 - camera.position.x) * deltaTime * 5;
        //   controls.update();
        renderer.render(scene, camera);
        //   渲染下一帧的时候就会调用render函数
        requestAnimationFrame(render);
    }

    render();

    // 监听画面变化，更新渲染画面
    window.addEventListener("resize", () => {
        //   console.log("画面变化了");

        // 更新摄像头
        camera.aspect = window.innerWidth / window.innerHeight;
        //   更新摄像机的投影矩阵
        camera.updateProjectionMatrix();

        //   更新渲染器
        renderer.setSize(window.innerWidth, window.innerHeight);
        //   设置渲染器的像素比
        renderer.setPixelRatio(window.devicePixelRatio);
    });

    // 设置当前页
    let currentPage = 0;
    // 监听滚动事件
    window.addEventListener("scroll", () => {
        //   console.log(window.scrollY);
        const newPage = Math.round(window.scrollY / window.innerHeight);
        if (newPage != currentPage) {
            currentPage = newPage;
            console.log("改变页面，当前是：" + currentPage);
            console.log(arrGroup[currentPage].rotation);
            gsap.to(arrGroup[currentPage].rotation, {
                z: "+=" + Math.PI * 2,
                x: "+=" + Math.PI * 2,
                duration: 2,
                onComplete: () => {
                    console.log("旋转完成");
                },
            });

            // gsap.to(`.page${currentPage} h1`, {
            //   rotate: "+=360",
            //   duration: 1,
            // });
            gsap.fromTo(
                `.page${currentPage} h1`,
                { x: -300 },
                { x: 0, rotate: "+=360", duration: 1 }
            );
        }
    });
})
// 目标：raycaster
import { useStore } from '../../store/index.js'
import { login, register } from '../../api/index.js'
import router from '../../router';

let store = useStore() 
console.log(store);
// 封装的工具库

let loginFormData = reactive({
    username: '',
    password: ''
})
let changeLoginOrRegester = ref(true)
let regesterFormData = reactive({
    username: '',
    password: '',
})
const loginBtn = async () => {
    let res = await login(loginFormData)
    console.log(res);
    if (res.code == 200) {
        console.log(res.data);
        store.userInfo = res.data
        router.push('/main')
    } else {
        alertMessage(res.message, 'error')
    }
}
const RegesterBtn = async () => {
    let res = await register(regesterFormData)
    console.log(res);
    if (res.code == 200) {
        changeLoginOrRegester.value = true
    } else {
        alertMessage(res.message, 'error')
    }
}

</script>
<template>
    <div style="width: 100vw; height: 100vh;  position: relative;">
        <div id="canvasContainer" style="position: absolute;z-index:999;"></div>
        <!-- 登录  -->
        <div v-if="changeLoginOrRegester" class="form-container">
            <el-card class="box-card" shadow="hover">
                <template #header>
                    <div class="card-header">
                        <span>登录</span>
                        <el-button class="button" @click="changeLoginOrRegester = false" text>注册</el-button>
                    </div>
                </template>
                <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign"
                    style="max-width: 460px">
                    <el-form-item label="账号">
                        <el-input v-model="loginFormData.username" />
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input type="password" v-model="loginFormData.password" />
                    </el-form-item>
                    <el-form-item>
                        <el-button style="width: 100px;margin: 0 auto;" type="primary" @click="loginBtn">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

        </div>

        <!-- 注册 -->
        <div v-else class="form-container">
            <el-card class="box-card" shadow="hover">
                <template #header>
                    <div class="card-header">
                        <span>注册</span>
                        <el-button class="button" text @click="changeLoginOrRegester = true">登录</el-button>
                    </div>
                </template>
                <el-form :label-position="labelPosition" label-width="100px" style="max-width: 460px">
                    <el-form-item label="用户名">
                        <el-input v-model="regesterFormData.username" />
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input type="password" v-model="regesterFormData.password" />
                    </el-form-item>
                    <el-form-item>
                        <el-button style="width: 100px;margin: 0 auto;" type="primary" @click="RegesterBtn">注册</el-button>
                    </el-form-item>
                </el-form>
            </el-card>

        </div>
    </div>
</template>

<style scoped>
* {
    padding: 0;
    margin: 0;
}

.form-container {

    position: relative;
    z-index: 99999999999;
    width: 600px;
    height: 350px;
    /* background-color: aliceblue; */
    margin: 0 auto;
    transform: translateY(50%);
}

.el-form-item {
    padding: 10px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    opacity: 0.5;
    /* width: 480px; */
    height: 100%;
}

.box-card:hover {
    opacity: 1
}
</style>