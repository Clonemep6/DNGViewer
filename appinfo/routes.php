<?php
return [
    'routes' => [
        [
            'name' => 'test#test',
            'url' => '/test',
            'verb' => 'GET',
        ],
        [
            'name' => 'preview#showPreview',
            'url' => '/preview/{fileId}',
            'verb' => 'GET',
        ],
    ],
];
