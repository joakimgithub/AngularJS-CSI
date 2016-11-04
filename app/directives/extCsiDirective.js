'use strict';
    // *** Directives ***
    // Directive för text <div csi-text></div>
app.directive("csiText", function() {
        return {
            restrict: 'A',
            templateUrl: 'app/views/extCsi-text.html'
        };
    });

