//
// SWF embedding
//
$(function() {
    var $results = $('#results'),
        movieUrl = './swf_capabilities.swf?version=' + (+new Date()),
        targetId = 'flash-container',
        /* MUST use this `flashObjId` value as the pre-built SWF expects it */
        flashObjId = 'capabilities',
        xiUrl = 'http://swfobject.googlecode.com/svn/trunk/swfobject/expressInstall.swf',
        flashVars = {},
        params = {
            allowscriptaccess: 'local',
            swliveconnect: 'true',
            wmode: 'transparent'
        },
        attrs = {
            id: flashObjId
        },
        doneFn = function(e) {
            if (e && e.success === true) {
                setTimeout(function() {
                    var c = window[flashObjId] || document[flashObjId] || $('#' + flashObjId)[0],
                        caps = $.extend(
                          { cookiesEnabled: c.cookies_accepted() },
                          c.get_capabilities(false)
                        ),
                        $capsList = $('<pre></pre>');

                    if (caps) {
                        $capsList.text(JSON.stringify(caps, null, 2);
                    }
                    else {
                        $('#errors').text('Failed to fetch system capabilities!');
                    }

                    $results.empty().append($capsList);
                }, 1000);
            } else {
                $('#errors').text('Failed to load the SWF!');
                $results.empty();
            }
        };

    $results.text('Loading, please wait...');

    // Embed the damn thing already!
    swfobject.embedSWF(movieUrl, targetId, '1', '1', '10', xiUrl, flashVars, params, attrs, doneFn);

});
