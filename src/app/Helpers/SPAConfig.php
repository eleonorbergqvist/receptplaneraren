<?php

namespace App\Helpers;

class SPAConfig {
    public static function insertSPAConfig(string $html): string {
        $spaConfig = self::getSPAConfig();
        return preg_replace(
            '/<script\ id=\\"config\\"><\/script>/', $spaConfig, $html
        );
    }

    private static function getSPAConfig(): string {
        $config = [
            'API_URL' => "/api/",
            'OCR_SCANNER_URL' => env('OCR_SCANNER_URL'),
            'IMAGE_PREFIX' => env('IMAGE_PREFIX'),
        ];
        return '<script id="config">window.config = '.json_encode($config).'</script>';
    }
}
