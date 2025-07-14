import { registerHandler } from '@nextcloud/viewer'
import { ImageViewerComponent } from '@nextcloud/viewer/dist/components'

// ✅ Register .dng files with the default image viewer
registerHandler({
  id: 'dng-handler',
  component: ImageViewerComponent,
  mimes: ['image/x-dcraw'],
  group: 'image',
})

console.log('🟢 DNG viewer handler registered: using built-in image viewer')
