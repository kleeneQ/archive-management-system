// 引入mockjs
import Mock from 'mockjs'

// 全局用户数据存储
let mockUsersData = Mock.mock({
  'list|50': [
    {
      'user_id|+1': 1,
      'user_name': '@word(5, 10)',
      'user_true_name': '@cname',
      'user_tel': /^1[3-9]\d{9}$/,
      'user_email': '@email',
      'user_role|1': [
        [{ role_id: '1', role_name: '系统管理员' }],
        [{ role_id: '2', role_name: '普通用户' }],
        [{ role_id: '3', role_name: '档案管理员' }],
        [{ role_id: '1', role_name: '系统管理员' }, { role_id: '2', role_name: '普通用户' }]
      ],
      'user_forbid|1': [0, 1],
      'operator': '@cname',
      'user_create_time': '@datetime("yyyy-MM-dd HH:mm:ss")',
      'user_avatar': '@image("200x200", "#50B347", "#FFF", "Mock Avatar")',
      'user_sex|1': [1, 2]
    }
  ]
})

// 模拟登录接口
Mock.mock('/dev-api/v1/user/login', 'post', (options) => {
  const { user_name, user_password } = JSON.parse(options.body)

  // 简单的登录验证（实际使用时可以根据需要调整）
  if (user_name === 'admin' && user_password === 'e10adc3949ba59abbe56e057f20f883e') { // 123456的md5加密
    return {
      status: 200,
      message: '登录成功',
      data: {},
      headers: {
        authorization: 'mock_token_' + Date.now()
      }
    }
  } else {
    return {
      status: 401,
      message: '用户名或密码错误',
      data: {}
    }
  }
})

// 模拟验证码接口
Mock.mock('/dev-api/web/v1/user/verify-code/get', 'get', () => {
  // 直接返回一个简单的成功响应，让前端处理验证码图片生成
  return Mock.mock({
    status: 200,
    data: {}
  })
})

// 模拟获取用户信息接口
Mock.mock('/dev-api/v1/user/get', 'post', () => {
  return {
    status: 200,
    data: {
      status: 200,
      data: {
        user_id: '1',
        user_name: 'admin',
        user_true_name: '系统管理员',
        user_sex: 1,
        user_tel: '13800138000',
        user_email: 'admin@example.com',
        user_role: [
          {
            role_id: '1',
            role_name: '系统管理员'
          }
        ]
      }
    }
  }
})

// 模拟获取用户菜单列表接口
Mock.mock('/dev-api/v1/menu/list/side', 'post', (options) => {
  // 模拟菜单数据结构
  const mockMenuList = [
    {
      menuId: '1',
      menuName: '系统管理',
      menuWebUrl: '',
      menuLogo: 'el-icon-setting',
      menuParentLevel: 1,
      child: [
        {
          menuId: '101',
          menuName: '用户管理',
          menuWebUrl: '/list',
          menuLogo: 'el-icon-user',
          menuParentLevel: 2,
          child: []
        },
        {
          menuId: '102',
          menuName: '角色管理',
          menuWebUrl: '/role',
          menuLogo: 'el-icon-postcard',
          menuParentLevel: 2,
          child: []
        },
        {
          menuId: '103',
          menuName: '菜单管理',
          menuWebUrl: '/menumange',
          menuLogo: 'el-icon-menu',
          menuParentLevel: 2,
          child: []
        }
      ]
    },
    {
      menuId: '2',
      menuName: '档案管理',
      menuWebUrl: '',
      menuLogo: 'el-icon-document',
      menuParentLevel: 1,
      child: [
        {
          menuId: '201',
          menuName: '档案录入',
          menuWebUrl: '/archiveInput',
          menuLogo: 'el-icon-edit',
          menuParentLevel: 2,
          child: []
        },
        {
          menuId: '202',
          menuName: '档案查询',
          menuWebUrl: '/archiveQuery',
          menuLogo: 'el-icon-search',
          menuParentLevel: 2,
          child: []
        }
      ]
    },
    {
      menuId: '3',
      menuName: '统计分析',
      menuWebUrl: '/statistics',
      menuLogo: 'el-icon-data-line',
      menuParentLevel: 1,
      child: []
    }
  ]

  return {
    status: 200,
    data: {
      status: 200,
      message: '获取菜单成功',
      data: mockMenuList
    }
  }
})

// 模拟站内信列表接口
Mock.mock('/dev-api/v1/message/list', 'post', () => {
  // 生成模拟消息数据
  const mockMessages = Mock.mock({
    'list|15': [
      {
        'message_id|+1': 1,
        'message_title': '@ctitle(5, 15)',
        'message_content': '@cparagraph(1, 3)',
        'message_is_read|1': [0, 1],
        'create_time': '@datetime("yyyy-MM-dd HH:mm:ss")',
        'create_by': '@cname'
      }
    ],
    'total': 15
  })

  return {
    status: 200,
    data: {
      status: 200,
      message: '获取消息列表成功',
      data: mockMessages
    }
  }
})

// 模拟修改密码接口
Mock.mock('/dev-api/v1/user/change_password', 'post', (options) => {
  const { pre_password, user_password } = JSON.parse(options.body)

  // 模拟验证：假设原密码的MD5是 'e10adc3949ba59abbe56e057f20f883e'（123456的MD5）
  if (pre_password !== 'e10adc3949ba59abbe56e057f20f883e') {
    return {
      status: 200,
      data: {
        status: 400,
        message: '原密码错误'
      }
    }
  }

  return {
    status: 200,
    data: {
      status: 200,
      message: '修改密码成功'
    }
  }
})

// 模拟用户列表接口
Mock.mock('/dev-api/v1/user/list', 'post', (options) => {
  const params = JSON.parse(options.body)
  const page_num = params.page_num || 1
  const page_size = params.page_size || 10

  // 模拟搜索过滤
  let filteredList = [...mockUsersData.list]
  if (params.user_name) {
    filteredList = filteredList.filter(user =>
      user.user_name.includes(params.user_name)
    )
  }
  if (params.user_forbid !== null && params.user_forbid !== undefined) {
    filteredList = filteredList.filter(user =>
      user.user_forbid === parseInt(params.user_forbid)
    )
  }

  // 模拟分页
  const start = (page_num - 1) * page_size
  const end = start + page_size
  const paginatedList = filteredList.slice(start, end)

  return {
    status: 200,
    data: {
      status: 200,
      message: '获取用户列表成功',
      data: {
        list: paginatedList,
        total: filteredList.length,
        pageNum: page_num,
        pageSize: page_size
      }
    }
  }
})

// 模拟添加用户接口
Mock.mock('/dev-api/v1/user/save', 'post', (options) => {
  const userData = JSON.parse(options.body)

  // 模拟用户名重复检查
  const existingUser = mockUsersData.list.find(user => user.user_name === userData.user_name)
  if (existingUser) {
    return {
      status: 200,
      data: {
        status: 400,
        message: '用户名已存在，请更换用户名'
      }
    }
  }

  // 生成新用户ID
  const maxId = Math.max(...mockUsersData.list.map(user => user.user_id), 0)

  // 构建新用户对象
  const newUser = {
    user_id: maxId + 1,
    user_name: userData.user_name,
    user_true_name: userData.user_true_name || '',
    user_password: userData.user_password, // 注意：在实际项目中密码应该是加密存储的
    user_tel: userData.user_tel || '',
    user_email: userData.user_email || '',
    user_avatar: userData.user_avatar || '',
    user_sex: userData.user_sex || 1,
    user_role: userData.user_role_id ? [{
      role_id: userData.user_role_id,
      role_name: userData.user_role_id === '1' ? '系统管理员' :
        userData.user_role_id === '2' ? '普通用户' : '档案管理员'
    }] : [],
    user_forbid: 0, // 默认为启用状态
    operator: 'admin', // 模拟当前操作用户
    user_create_time: new Date().toLocaleString('zh-CN')
  }

  // 将新用户添加到全局数据中
  mockUsersData.list.push(newUser)

  return {
    status: 200,
    data: {
      status: 200,
      message: '添加用户成功'
    }
  }
})

// 模拟退出登录接口
Mock.mock('/dev-api/v1/user/login_out', 'post', () => {
  return {
    status: 200,
    data: {
      status: 200,
      message: '退出成功'
    }
  }
})

export default Mock
