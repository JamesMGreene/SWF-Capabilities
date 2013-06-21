//
//  SWF embedding
//
$(function(){
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
                cookies = c.cookies_accepted(),
                caps = c.get_capabilities(false),
                $capsList = $('<dl></dl>');
        
            $capsList.append($('<dt>cookiesEnabled</dt><dd>' + JSON.stringify(cookies || false) + '</dd>'));
            if (caps) {
              $.each(caps, function(key, val) {
                $capsList.append($('<dt>' + key + '</dt><dd>' + JSON.stringify(val) + '</dd>'));
              });
            }
            else {
              $('#errors').text('Failed to fetch system capabilities!');
            }
            
            $results.empty().append($capsList);
          }, 1000);
        }
        else {
          $('#errors').text('Failed to load the SWF!');
        }
      };

  $results.text('Loading, please wait...');

  // Embed the damn thing already!
  swfobject.embedSWF(movieUrl, targetId, '1', '1', '10', xiUrl, flashVars, params, attrs, doneFn);

});