<template>
    <fragment>
        <template v-for="menu in menuData">
            <el-submenu :key="menu.id" :index="menu.id" v-if="menu.child && menu.child.length">
                <template slot="title">
                    <i :class="menu.icon" style="font-size:15px;"></i>
                    <span slot="title">{{menu.name}}</span>
                </template>
                <MenuTree :menuData="menu.child" ></MenuTree>
            </el-submenu>
            <template v-else>
                <el-menu-item v-if="menu.level > 1" :key="menu.id" :index="menu.path" @click="saveNavState(menu.path)">
                    <i :class="menu.icon" style="font-size:15px;"></i>
                    <span slot="title">{{menu.name}}</span>
                </el-menu-item>
                <el-menu-item v-else :key="menu.id">
                    <i :class="menu.icon" style="font-size:15px;"></i>
                    <span slot="title">{{menu.name}}</span>
                </el-menu-item>
            </template>
        </template>
    </fragment>
</template>
<script>
export default {
    name: 'MenuTree',
    props: ['menuData'],
    data() {
        return {
            activePath: ''
        }
    },
    methods: {
        // 保存激活的链接地址
        saveNavState(activePath) {
            console.log(activePath)
            this.$emit('auditchildFn', activePath  );
            if(activePath === '' || activePath=== null) return 
            window.sessionStorage.setItem('activePath', activePath)
            this.activePath = activePath
        }  
    }
}
</script>
<style lang="less" scoped>


.el-menu .el-menu-item {
    margin-left: 5px;
    i {
        display: inline-block;
        margin-right: 10px;
    }
}
.el-submenu .el-menu-item {
    height: 40px;
    line-height: 40px;
    background: #1A232A !important;
    
}
.iconfont{
    margin-right:10px;
}
.el-aside{
  position: relative;
  transition: all 0.5s;
  .el-menu{
    border-right:0 none;
     background: #0D2943 !important;
    .el-submenu {
         background: #fff !important;
         .el-submenu__title {
             background: #0D2943 !important;
         }
     }
    //  .el-menu-item {
    //      background: #1A232A !important;
    //  }
     .el-submenu__title {
         background: #0D2943 !important;
     }
    .el-submenu__title:hover {
        .el-submenu {
         background: #275784 !important;
         .el-submenu__title {
             background: #275784 !important;
         }
     }
    }
    .is-active {
        color: #fff !important;
        background: #1890ff !important;
    }
    
  }

}
</style>