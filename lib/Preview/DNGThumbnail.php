<?php
namespace OCA\dngviewer\Preview;

use OCP\IImage;
use GdImage;

final class DNGThumbnail implements IImage {
    private string $data;
    private string $mime;
    private int $width;
    private int $height;
    private int $orientation = -1;

    public function __construct(string $data, string $mime, int $width, int $height) {
        $this->data = $data;
        $this->mime = $mime;
        $this->width = $width;
        $this->height = $height;
    }

    public function valid(): bool {
        return !empty($this->data) && $this->width > 0 && $this->height > 0;
    }

    public function mimeType(): ?string {
        return $this->mime;
    }

    public function width(): int {
        return $this->width;
    }

    public function height(): int {
        return $this->height;
    }

    public function widthTopLeft(): int {
        return $this->width;
    }

    public function heightTopLeft(): int {
        return $this->height;
    }

    public function show(?string $mimeType = null): bool {
        header('Content-Type: ' . ($mimeType ?? $this->mime));
        echo $this->data;
        return true;
    }

    public function save(?string $filePath = null, ?string $mimeType = null): bool {
        if ($filePath === null) return false;
        return file_put_contents($filePath, $this->data) !== false;
    }

    public function resource(): GdImage|false {
        return imagecreatefromstring($this->data);
    }

    public function dataMimeType(): ?string {
        return $this->mime;
    }

    public function data(): ?string {
        return $this->data;
    }

    public function getOrientation(): int {
        return $this->orientation;
    }

    public function fixOrientation(): bool {
        return true; // Stub — your preview is already processed
    }

    public function resize(int $maxSize): bool {
        return false; // Not supported in static preview
    }

    public function preciseResize(int $width, int $height): bool {
        return false;
    }

    public function centerCrop(int $size = 0): bool {
        return false;
    }

    public function crop(int $x, int $y, int $w, int $h): bool {
        return false;
    }

    public function fitIn(int $maxWidth, int $maxHeight): bool {
        return false;
    }

    public function scaleDownToFit(int $maxWidth, int $maxHeight): bool {
        return false;
    }

    public function copy(): IImage {
        return new self($this->data, $this->mime, $this->width, $this->height);
    }

    public function cropCopy(int $x, int $y, int $w, int $h): IImage {
        return $this->copy(); // Stub — real implementation optional
    }

    public function preciseResizeCopy(int $width, int $height): IImage {
        return $this->copy();
    }

    public function resizeCopy(int $maxSize): IImage {
        return $this->copy();
    }

    public function loadFromData(string $str): GdImage|false {
        return imagecreatefromstring($str);
    }

    public function readExif(string $data): void {
        // Optional stub — RAW previews likely skip EXIF parsing
    }
}
