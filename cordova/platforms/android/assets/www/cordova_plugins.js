cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/io.litehelpers.sqliteStorage/www/SQLitePlugin.js",
        "id": "io.litehelpers.sqliteStorage.SQLitePlugin",
        "clobbers": [
            "SQLitePlugin"
        ]
    },
    {
        "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
        "id": "cordova-plugin-inappbrowser.inappbrowser",
        "clobbers": [
            "cordova.InAppBrowser.open",
            "window.open"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "io.litehelpers.sqliteStorage": "0.7.5",
    "com.phonegap.plugin.statusbar": "1.1.0",
    "cordova-plugin-inappbrowser": "1.0.1-dev"
}
// BOTTOM OF METADATA
});