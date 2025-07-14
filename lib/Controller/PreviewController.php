<?php
namespace OCA\dngviewer\Controller;

use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\FileDisplayResponse;
use OCP\AppFramework\Http\JSONResponse;
use OCP\Files\IRootFolder;
use OCP\IRequest;
use OCP\IUserSession;
use Psr\Log\LoggerInterface;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Http\DataDownloadResponse;
use Symfony\Component\HttpFoundation\Response;
use OCP\AppFramework\Http\StreamResponse;

class PreviewController extends Controller {

    private IRootFolder $rootFolder;
    private IUserSession $userSession;
    private LoggerInterface $logger;
    private ?string $userId;

    public function __construct(
        string $appName,
        IRequest $request,
        IRootFolder $rootFolder,
        IUserSession $userSession,
        LoggerInterface $logger
    ) {
        parent::__construct($appName, $request);
        $this->rootFolder = $rootFolder;
        $this->userSession = $userSession;
        $this->logger = $logger;
        $this->userId = $this->userSession->getUser()?->getUID();

        $this->logger->info('dngviewer: PreviewController initialized for user', [
            'userId' => $this->userId,
        ]);
    }

    /**
     * Show preview for DNG file as PNG image
     * @NoCSRFRequired
     */
    public function showPreview(int $fileId): StreamResponse|JSONResponse {
        $this->logger->info('dngviewer: showPreview called', ['fileId' => $fileId]);

        if ($this->userId === null) {
            $this->logger->warning('dngviewer: No user session found');
            return new JSONResponse(['error' => 'User not logged in'], 401);
        }

        try {
            $this->logger->info('dngviewer: Fetching user folder', ['userId' => $this->userId]);
            $userFolder = $this->rootFolder->getUserFolder($this->userId);

            $this->logger->info('dngviewer: Looking for file by ID', ['fileId' => $fileId]);
            $files = $userFolder->getById($fileId);

            if (empty($files)) {
                $this->logger->warning('dngviewer: File not found', ['fileId' => $fileId]);
                return new JSONResponse(['error' => 'File not found'], 404);
            }

            $file = $files[0];
            $this->logger->info('dngviewer: File found', ['filePath' => $file->getPath(), 'fileSize' => $file->getSize()]);

            $this->logger->info('dngviewer: Reading DNG content...');
            $dngContent = $file->getContent();

            $imagick = new \Imagick();
            $imagick->readImageBlob($dngContent);
            $imagick->setImageFormat('png');

            $this->logger->info('dngviewer: DNG converted to PNG successfully');
            $imageBlob = $imagick->getImageBlob();
   
            $stream = fopen('php://memory', 'r+');
            fwrite($stream, $imageBlob);
            rewind($stream);

            $response = new StreamResponse($stream);
            $response->addHeader('Content-Type', 'image/png');
            $response->addHeader('Content-Disposition', 'inline; filename="preview.png"');
            return $response;
 
        } catch (\ImagickException $e) {
            $this->logger->error('dngviewer: ImagickException', ['message' => $e->getMessage(), 'fileId' => $fileId]);
            return new JSONResponse(['error' => 'Image processing failed'], 500);
        } catch (\Exception $e) {
            $this->logger->error('dngviewer: Unexpected error', ['message' => $e->getMessage(), 'exception' => $e]);
            return new JSONResponse(['error' => 'Could not generate preview.'], 500);
        }
    }
}
