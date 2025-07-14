export function registerFileAction(action) {
  if (typeof window._nc_fileactions === 'undefined') {
    window._nc_fileactions = []
    console.log('[dngviewer] FileActions initialized')
  }

  // Prevent duplicate actions
  if (window._nc_fileactions.find(a => a.id === action.id)) {
    console.warn(`[dngviewer] FileAction ${action.id} already registered`)
    return
  }

  window._nc_fileactions.push(action)
}
