<?php

namespace OCA\dngviewer\Preview;

use OCP\Files\File;
use OCP\Preview\IProviderV2;
use OCP\IImage;
use Psr\Log\LoggerInterface;
use OCP\Files\FileInfo;

class DNGProvider implements IProviderV2 {
    private LoggerInterface $logger;
    private bool $allowScalingUp;

    public function __construct(LoggerInterface $logger, bool $allowScalingUp = true) {
        $this->logger = $logger;
        $this->allowScalingUp = $allowScalingUp;
    }

    public function getMimeType(): string {
    return 'image/x-dcraw';
}

    public function isAvailable(FileInfo $file): bool {
    $this->logger->info('Checking availability for MIME: ' . $file->getMimeType());

    return $file->getMimeType() === 'image/x-dcraw';
    }



    public function getThumbnail(File $file, int $maxX, int $maxY): ?IImage {
        try {
            $content = $file->getContent();
            $imagick = new \Imagick();
            $imagick->readImageBlob($content);
            $imagick->setImageFormat('png');
            $imagick->resizeImage($maxX, $maxY, \Imagick::FILTER_LANCZOS, 1, $this->allowScalingUp);

            // Replace this with your actual IImage implementation
	    $width = $imagick->getImageWidth();
	    $height = $imagick->getImageHeight();


            return new DNGThumbnail($imagick->getImageBlob(), 'image/png', $width, $height);
        } catch (\Throwable $e) {
            $this->logger->error('dngviewer: Preview generation failed', [
                'file' => $file->getPath(),
                'exception' => $e,
            ]);
            return null;
        }
    }
}
