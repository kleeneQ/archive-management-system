// 引入mockjs
import Mock from 'mockjs'

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
          menuWebUrl: '/userManage',
          menuLogo: 'el-icon-user',
          menuParentLevel: 2,
          child: []
        },
        {
          menuId: '102',
          menuName: '角色管理',
          menuWebUrl: '/roleManage',
          menuLogo: 'el-icon-postcard',
          menuParentLevel: 2,
          child: []
        },
        {
          menuId: '103',
          menuName: '菜单管理',
          menuWebUrl: '/menuManage',
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
