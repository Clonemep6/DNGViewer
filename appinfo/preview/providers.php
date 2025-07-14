<?php
return [
  'providers' => [
    OCA\dngviewer\Preview\DNGProvider::class => [
      'mimetypes' => ['image/x-dcraw','image/x-adobe-dng'],
      'priority'  => 15,
    ],
  ],
];
