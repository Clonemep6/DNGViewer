<?php
namespace OCA\dngviewer\Listener;

class FormatFileInfoListener {
  public static function injectDngPreviewFlag(&$params) {
    $info =& $params['info'];
    if (in_array($info['mimetype'],
                 ['image/x-dcraw','image/x-adobe-dng'], true)
    ) {
      // Tell NC this file *can* be previewed
      $info['has_preview']   = true;
      $info['preview_max_x'] = 2048;
      $info['preview_max_y'] = 2048;
    }
  }
}
