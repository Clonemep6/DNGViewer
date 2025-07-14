<?php
declare(strict_types=1);

namespace OCA\dngviewer\AppInfo;

use OCP\AppFramework\App;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\Util;
use OCP\Preview\IProviderV2;
use Psr\Log\LoggerInterface;

use OCA\dngviewer\Preview\DNGProvider;

class Application extends App implements IBootstrap {

    public const APP_ID = 'dngviewer';

    public function __construct(array $urlParams = []) {
        parent::__construct(self::APP_ID, $urlParams);
    }

    /**
     * This method is called during the app registration phase.
     * It is used to register services, event listeners, and other components.
     * For this simple app, we don't need to register any services.
     */
    public function register(IRegistrationContext $context): void {
	$context->registerService(DNGProvider::class, function ($c) {
		return new DNGProvider($c->query(LoggerInterface::class));
	});

	$context->registerPreviewProvider(DNGProvider::class, '/^image\/(x-adobe-dng|x-dcraw)$/');

     }

    /**
     * This method is called during the app boot phase.
     * It is used to execute code after all apps have been registered.
     * We use it here to add our viewer's JavaScript file to the page.
     */
    public function boot(IBootContext $context): void {
        Util::addScript(self::APP_ID, 'viewer');
	Util::connectHook(
      'OCP\Files', 
      'formatFileInfo', 
      FormatFileInfoListener::class, 
      'injectDngPreviewFlag'
       );
    }
}
