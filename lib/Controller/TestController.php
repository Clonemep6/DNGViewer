<?php
namespace OCA\dngviewer\Controller;

use OCP\AppFramework\Controller;
use OCP\IRequest;
use OCP\AppFramework\Http\TextPlainResponse;

class TestController extends Controller {
    public function __construct(string $appName, IRequest $request) {
        parent::__construct($appName, $request);
    }

    /**
    * @NoCSRFRequired
    */

    public function test(): TextPlainResponse {
        return new TextPlainResponse("✅ Test route is working!");
    }
}
