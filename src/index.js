// src/index.js
import { registerFileAction } from './files-actions.js'

registerFileAction({
  id: 'dngviewer-preview',

  // Menu label
  displayName: () => t('dngviewer', 'View raw preview'),

  // Use Nextcloud’s standard “eye” SVG
  iconSvgInline: () => `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9
           M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17
           M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5
           21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"
      />
    </svg>
  `,

  // Only enable when a single DNG/raw file is selected
  enabled: files =>
    files.length === 1 &&
    ['image/x-adobe-dng', 'image/x-dcraw'].includes(files[0].mime),

  // Make it the primary (double-click) action
  default: files =>
    files.length === 1 &&
    ['image/x-adobe-dng', 'image/x-dcraw'].includes(files[0].mime),

  // Open the PNG preview in Nextcloud’s Viewer
  exec: async node => {
    const fileId   = node.id ?? node.fileid
    const fileName = node.name ?? node.displayname
    const filePath = node.path

    if (!fileId || !fileName || !filePath) {
      console.warn('[dngviewer] Missing file info', { fileId, fileName, filePath })
      return false
    }

    // Build the DNG→PNG preview URL
    const previewUrl = OC.generateUrl(
      'apps/dngviewer/preview/{id}',
      { id: fileId, x: 2048, y: 2048 }
    )
    console.log('[dngviewer] previewUrl →', previewUrl)

    // Provide it as the previewUrl so Viewer bypasses WebDAV
    const fileInfo = {
      fileId,
      name:       fileName,
      path:       filePath,
      type:       'file',
      mime:       'image/png',
      previewUrl,
      hasPreview: true
    }

    OCA.Viewer.open({
      fileInfo,
      list:          [fileInfo],
      enableSidebar: false
    })

    return true
  }
})
