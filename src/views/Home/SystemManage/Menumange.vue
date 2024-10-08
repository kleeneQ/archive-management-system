<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 卡片分类 -->
      <el-row>
        <el-col :span="24">
          <el-button size="small" v-if="hasPerms('/v1/menu/save')" type="primary" icon="el-icon-circle-plus-outline" @click="showCateDialogForm()">添加菜单</el-button>
          <el-button size="small" type="success" :icon="fold === true ? 'el-icon-arrow-down' : 'el-icon-arrow-up'" @click="openTable">{{fold === true ? '展开' : '折叠'}}</el-button>
        </el-col>
      </el-row>
      <!-- 表格主体 -->
      <!-- 分类表格
        :data(设置数据源) :columns(设置表格中列配置信息) :selection-type(是否有复选框)
        :expand-type(是否展开数据) show-index(是否设置索引列) index-text(设置索引列头)
        border(是否添加纵向边框) :show-row-hover(是否鼠标悬停高亮) -->
      <tree-table
        class="tree-table"
        v-if="hasPerms('/v1/menu/list')"
        :data="menusList"  
        :columns="columns"
        :stripe="true"
        :expand-type="false"
        :selection-type="false"
        :is-fold="fold"
        border
        :row-click="cellClick"
      >
        <!-- 图标 -->
        <template slot="icon" slot-scope="scope">
          <i :class="scope.row.menuLogo" style="font-size:20px;"></i>
        </template>
        <!-- 组件路径 -->
        <!-- <template slot="route" slot-scope="scope">
          <span v-if="scope.row.menuRoute == 'Layout'">--</span>
          <span v-else>
            {{ scope.row.menuRoute == null ? "--" : scope.row.menuRoute }}
          </span>
        </template> -->
        <!-- 类型 -->
        <template slot="sort" slot-scope="scope">
          <el-tag v-if="scope.row.menuParentLevel === 0">项目</el-tag>
          <el-tag type="success" v-else-if="scope.row.menuParentLevel === 1">目录</el-tag>
          <el-tag type="warning" v-else-if="scope.row.menuParentLevel === 2">菜单</el-tag>
          <el-tag type="info" v-else-if="scope.row.menuParentLevel === 3">按钮</el-tag>
        </template>
        
 

        <!-- 操作 -->
        <template slot="operate" slot-scope="scope">
          <el-button v-if="hasPerms('/v1/menu/save') && scope.row.menuParentLevel < 3" type="primary" size="mini" icon="el-icon-plus" @click="showCateDialogForm(scope.row)"></el-button>
          <el-button v-if="hasPerms('/v1/menu/update')" type="primary" size="mini" icon="el-icon-edit" @click="showDialogEdit(scope.row)"></el-button>
          <el-button v-if="hasPerms('/v1/menu/remove')" type="danger" size="mini" icon="el-icon-delete" @click="removeCateDataById(scope.row.menuId)"></el-button>
        </template>
      </tree-table>
    </el-card>
    <!-- 添加菜单的弹框 -->
    <el-dialog
        title="添加菜单"
        :visible.sync="addMenuDialogVisible"
        @close="addCatDialogClosed"
    >
        <el-form ref="catFormRef" :model="addMenuForm" :rules="catFormRules" label-width="150px">
            <el-form-item label="菜单父级分类:">
                <!-- props 配置选项 -->
                <el-cascader
                  :options="parentMenuList"
                  expand-trigger="hover"
                  :props="cascaderProps"
                  v-model="selectedKeys"
                  @change="parentMenuChanged"
                  clearable
                  change-on-select
                ></el-cascader>
            </el-form-item>
            <el-form-item label="菜单等级:" prop="menu_parent_level">
              <el-radio-group v-model="radio" @change="changeRadioFun">
                <el-radio label="0">项目</el-radio>
                <el-radio label="1">目录</el-radio>
                <el-radio label="2">菜单</el-radio>
                <el-radio label="3">按钮</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="菜单名称:" prop="menu_name">
              <el-input v-model="addMenuForm.menu_name" placeholder="格式: 用户总端"></el-input>
            </el-form-item>
            <el-form-item label="菜单路径:" prop="menu_url">
              <el-input v-model="addMenuForm.menu_url" placeholder="格式: /users/userList"></el-input>
            </el-form-item>
            <el-form-item label="路由:" v-if="addMenuForm.menu_parent_id !== 0">
              <el-input v-model="addMenuForm.menu_web_url" placeholder="格式: /users/userList"></el-input>
            </el-form-item>
            <el-form-item label="组成:" v-if="addMenuForm.menu_parent_id !== 0">
              <el-input v-model="addMenuForm.menu_route" placeholder="格式: Layout 或 users/userList"></el-input>
            </el-form-item>
            <el-form-item label="菜单权重:">
              <el-input v-model="addMenuForm.menu_weight" placeholder="格式: 0 或 1 或 2 或 3 或 4"></el-input>
            </el-form-item>

            <el-form-item label="是否写入系统日志:">
            <el-switch
              @change='menuLogFun'
              v-model="menuLogFlag"
              :active-text="menuLogtext"
              active-color="#409eff"
              inactive-color="#dcdfe6">
            </el-switch>
            </el-form-item>

            <el-form-item label="菜单logo:">
              <e-icon-picker v-model="addMenuForm.menu_logo" />
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addMenuDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addMenu">确 定</el-button>
        </span>
    </el-dialog>

    <!-- 编辑菜单的表单 -->
    <el-dialog
        title="编辑菜单"
        :visible.sync="editCatDialogVisible"
        @close="editCatDialogClosed"
    >
      <el-form
        ref="editCatFormRef"
        :model="editMenuForm"
        :rules="catFormRules"
        label-width="130px"
      >
        <el-form-item label="菜单父级分类">
          <el-cascader
            :options="parentMenuList"
            expand-trigger="hover"
            :props="cascaderProps"
            v-model="editSelectedKeys"
            @change="editParentMenuChanged"
            clearable
            change-on-select
          ></el-cascader>
        </el-form-item>
        <el-form-item label="菜单等级" prop="menu_parent_level">
          <el-radio-group v-model="radio" @change="changeRadioFun">
            <el-radio label="0">项目</el-radio>
            <el-radio label="1">目录</el-radio>
            <el-radio label="2">菜单</el-radio>
            <el-radio label="3">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单名称" prop="menu_name">
          <el-input v-model="editMenuForm.menu_name"></el-input>
        </el-form-item>
        <el-form-item label="菜单路径" prop="menu_url">
          <el-input v-model="editMenuForm.menu_url"></el-input>
        </el-form-item>
        <el-form-item label="路由" prop="menu_web_url">
          <el-input v-model="editMenuForm.menu_web_url"></el-input>
        </el-form-item>
        <el-form-item label="组成">
          <el-input v-model="editMenuForm.menu_route" placeholder="格式: Layout 或 users/userList"></el-input>
        </el-form-item>
        <el-form-item label="菜单权重" prop="menu_weight">
          <el-input v-model="editMenuForm.menu_weight"></el-input>
        </el-form-item>

        <el-form-item label="是否写入系统日志:">
            <el-switch
              @change='menuLogFun'
              v-model="menuLogFlag"
              :active-text="menuLogtext"
              active-color="#409eff"
              inactive-color="#dcdfe6">
            </el-switch>
            </el-form-item>

        <el-form-item label="菜单logo" prop="menu_logo">
          <e-icon-picker v-model="editMenuForm.menu_logo" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCatDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editMenu">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { 
  getMenusList,
  addMenuItem,
  modifyMenuItem,
  removeMenuItem
  } from '@/api/systemmange'
import { modificationMenus, AddAndEditModificationMenus, changeDetSelect } from '@/utils/index'
export default {
  data() {
    return {
      // 菜单数据列表
      menusList: [],
      // 控制表格的展开和收起
      fold: true,
      // 为table指定列的定义
      columns: [
        {
          label: '菜单名称',
          prop: 'menuName',
          width: '60px'
        },
        {
          label: '菜单图标',
          width: '11px',
          type: 'template',
          template: 'icon',
          align: 'center',
          headerAlign: 'center'
        },
        {
          label: '权重',
          prop: 'menuWeight',
          width: '8px',
          align: 'center',
          headerAlign: 'center'
        },
        {
          label: '菜单链接',
          prop: 'menuUrl',
          width: '45px',
          align: 'center',
          headerAlign: 'center'
        },
        {
          label: '路由',
          prop: 'menuWebUrl',
          width: '20px',
          align: 'center',
          headerAlign: 'center'
        },
        {
          label: '菜单类型',
          width: '15px',
          type: 'template', // 表示将当前列定义为模板列
          template: 'sort',
          align: 'center',
          headerAlign: 'center'
        },
        // {
        //   label: '是否记录日志',
        //   type: 'template',
        //   template: 'menuLog',
        //   align: 'center',
        //   width: '30px'
        // },
        {
          label: '操作',
          width: '25px',
          type: 'template',
          template: 'operate',
          align: 'center',
          headerAlign: 'center'
        }
      ],
      // 菜单名称验证
      catFormRules: {
        menu_name: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' }
        ],
        menu_url: [
          { required: true, message: '请输入菜单路径', trigger: 'blur' }
        ],
        menu_parent_level: [
          { required: true, message: '请输入菜单等级', trigger: 'blur' }
        ]
      },
      parentMenuList: [],
      // 指定级联选择器的配置对象
      cascaderProps: {
        value: 'menuId',
        label: 'menuName',
        children: 'children'
      },
      // 选中的父级菜单的id数组
      selectedKeys: [],
      // 保存选中菜单的id
      menu_id: '',
      // 添加菜单的表单显隐
      addMenuDialogVisible: false,
      radio: '0',
      addMenuForm: {
        menu_url: '', // 必填
        menu_parent_id: 0,  // 必填
        menu_parent_level: 0, // 必填
        menu_name: '',  // 必填
        menu_web_url: '',
        menu_logo: '',
        menu_log: '0',
        menu_weight: null,
        menu_route: ''
      },
      menuLogFlag:false,//是否写入系统日志 默认不写入
      menuLogtext:'不写入',
      // 编辑菜单的表单显隐
      editCatDialogVisible: false,
      // 编辑菜单时选中的父级菜单的id数组
      editSelectedKeys: [],
      // 编辑表单的数据
      editMenuForm: {
        menu_id: '',  // 必填
        menu_url: '',
        menu_parent_id: '',
        menu_parent_level: '',
        menu_name: '',
        menu_web_url: '',
        menu_logo: '',
        menu_log: '0',
        menu_weight: null,
        menu_route: '',

      }
    }
  },
  created() {
    this.getMenusList()
  },
  methods: {
    //是否记录到系统日志
    menuLogFun(){
      if (this.menuLogFlag) {
        this.editMenuForm.menu_log = '1'
        this.addMenuForm.menu_log = '1'
        this.menuLogtext = '写入'
      } else {
        this.menuLogtext = '不写入'
        this.addMenuForm.menu_log = '0'
        this.editMenuForm.menu_log = '0'
      }
      console.log( this.editMenuForm.menu_log )
      console.log( this.addMenuForm.menu_log )
    },
    // 获取菜单
    getMenusList() {
      getMenusList().then(response => {
        if (response.status === 200) {
          const { status, message, data } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          const menus = modificationMenus(data)
          this.menusList = menus
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 编辑菜单
    showDialogEdit(row) {
      console.log(row)
      this.getParentMenuList(row.menuParentId)
      this.radio = String(row.menuParentLevel)
      this.editMenuForm = {
        menu_id: row.menuId, // 必填
        menu_url: row.menuUrl,
        menu_parent_id: row.menuParentId,
        menu_name: row.menuName,
        menu_web_url: row.menuWebUrl || '',
        menu_logo: row.menuLogo || '',
        menu_parent_level: row.menuParentLevel,
        menu_weight: row.menuWeight || null,
        menu_route: row.menuRoute,
        menu_log:row.menuLog
      }
      if (row.menuLog == '1') {
        this.menuLogFlag = true
      } else {
        this.menuLogFlag = false
      }
      this.menuLogFun()
      this.editCatDialogVisible = true
    },

    // 监听编辑菜单表单关闭,将整个表单清空
    editCatDialogClosed() {
      this.$refs.editCatFormRef.resetFields()
      this.editMenuForm = {}
      this.editSelectedKeys = []
    },

    // 编辑菜单确定按钮
    editMenu() {
      console.log(this.editMenuForm)
      modifyMenuItem(this.editMenuForm).then(respose => {
        if (respose.status === 200) {
          const { data: res } = respose
          if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
          this.message({ message: res.message, type: 'success' })
          this.getMenusList()
          this.radio = '0'
          this.fold = true
          this.editMenuForm = {}
          this.editSelectedKeys = []
          this.editCatDialogVisible = false
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 点击显示添加分类弹框
    showCateDialogForm(row) {
      if (row === undefined) {
        this.getParentMenuList()
      } else {
        this.getParentMenuList(row.menuId, "add")
        this.radio = String(row.menuParentLevel + 1)
      }
      this.menuLogFlag = false
      this.addMenuDialogVisible = true
    },

    // 获取父级菜单数据列表
    getParentMenuList(menuParentId, source) {
      getMenusList().then(response => {
        if (response.status === 200) {
          const { status, message, data } = response.data
          if (status !== 200) return this.message({ message: message, type: 'error' })
          const menus = AddAndEditModificationMenus(data)
          if (source === undefined) {
            this.editSelectedKeys = changeDetSelect(menuParentId, menus)
          }
          if (source === 'add') {
            this.selectedKeys = changeDetSelect(menuParentId, menus)
          }
          this.parentMenuList = menus
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 监听添加菜单表单关闭,将整个表单清空
    addCatDialogClosed() {
      this.$refs.catFormRef.resetFields()
      this.selectedKeys = []
      this.addMenuForm = {
        menu_name: '',
        menu_parent_id: 0,
        menu_parent_level: 0,
        menu_url: '',
        menu_logo: '',
        menu_log: '0',
        menu_weight: 0
      }
    },

    // 等级选项发生变化的方法
    changeRadioFun(val) {
      console.log(Number(val))
      this.addMenuForm.menu_parent_level = Number(val)
      this.editMenuForm.menu_parent_level = Number(val)
    },

    // 编辑菜单时父级分类发生变化时触发
    editParentMenuChanged() {
      // 如果this.editSelectedKeys的length大于0，那么选中了父级菜单
      // 否则没选中
      if (this.editSelectedKeys.length > 0) {
        this.editMenuForm.menu_parent_id = this.editSelectedKeys[this.editSelectedKeys.length - 1]
        // console.log(this.editMenuForm.menu_parent_id)
        // 菜单的层级就是选中项的长度
        this.editMenuForm.menu_parent_level = this.editSelectedKeys.length
        return false
      }
    },

    // 选择项发生变化触发
    parentMenuChanged() {
      // 如果this.selectedKeys的length大于0，那么选中了父级菜单
      // 否则没选中
      console.log(this.selectedKeys.length)
      if (this.selectedKeys.length > 0) {
        this.addMenuForm.menu_parent_id = this.selectedKeys[this.selectedKeys.length - 1]
        // 菜单的层级就是选中项的长度
        this.addMenuForm.menu_parent_level = this.selectedKeys.length
        this.radio = String(this.selectedKeys.length)
        return false
      } else {
        this.addMenuForm.menu_parent_id = 0
        this.addMenuForm.menu_parent_level = 0
      }
    },

    // 添加菜单的确定按钮
    addMenu() {
      this.$refs.catFormRef.validate(valid => {
        if (!valid) return false
        if (this.addMenuForm.menu_parent_level === 0) {
            if (this.selectedKeys.length > 0) {
              this.addMenuForm.menu_parent_id = this.selectedKeys[this.selectedKeys.length - 1]
              // 菜单的层级就是选中项的长度
              this.addMenuForm.menu_parent_level = this.selectedKeys.length
            } else {
              this.addMenuForm.menu_parent_id = 0
              this.addMenuForm.menu_parent_level = 0
            }  
        } 
        this.addMenuForm.menu_weight = Number(this.addMenuForm.menu_weight)
        addMenuItem(this.addMenuForm).then(response => {
          if (response.status === 200) {
            const { data: res } = response
            if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
            this.message({ message: res.message, type: 'success' })
            this.getMenusList()
            this.radio = '0' 
            this.addMenuDialogVisible = false
          }
        }).catch(error => {
          console.log(error)
        })
      })
      
    },

    // 删除菜单项
    removeCateDataById(id) {
      const data = {
        menu_id: id
      }
      this.confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeMenuItem(data).then(response => {
          const { data: res } = response
          if (res.status !== 200) return this.message({ message: res.message, type: 'error' })
          this.message({ message: res.message, type: 'success' })
          this.getMenusList()
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {
        this.message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 展开表格
    openTable() {
      this.fold = !this.fold
    },
    // 单击某一单元格
    cellClick(){
    }
  }
}
</script>
<style lang="less" scoped>
.tree-table{
  margin-top:15px;
  font-size:14px;
}
.el-cascader{
  width:100%;
}
.el-icon-popper {
  z-index: 9999 !important;
}
</style>
