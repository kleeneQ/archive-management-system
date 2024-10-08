import store from '@/store/index'
export function hasPermission(perms) {
  let hasPermission = false
  let buttons = store.state.user.buttons
  for(var i = 0; i < buttons.length; i++) {
    if (buttons[i] === perms) {
      hasPermission = true
      break
    }
  }
  return hasPermission
}

export function hasPerms(perms) {
  return hasPermission(perms)
}
