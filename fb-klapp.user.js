// ==UserScript==
// @name            FB klapp
// @include         https://www.facebook.com/*
// @require         https://code.jquery.com/jquery-1.12.2.min.js
// ==/UserScript==

// Konfiguration für einzelne Arten von Meldungen

// Beiträge dieser Personen generell nicht zuklappen

nicht_zuklappen = [ "Karla Kolumna", "Rita Kimmkorn", ];

// mögliche Werte: 0 = nichts unternehmen, 1 = zuklappen

hat_beitrag_geteilt =                 1
hat_foto_geteilt =                    1
hat_video_geteilt =                   1
hat_erinnerung_geteilt =              0
mit_gefaellt_mir_markiert =           1
hat_das_kommentiert =                 1
hat_auf_einen_kommentar_geantwortet = 1
hat_darauf_reagiert =                 1
profilbild_aktualisiert =             1
titelbild_aktualisiert =              1
hat_neue_fotos_hinzugefuegt =         0
nimmt_an_einer_veranstaltung_teil =   0
wurde_markiert =                      1
alles_andere =                        0

// Konfiguration ENDE - Finger weg vom Rest!

// TODO: manche Beträge haben ein Bild vorm Namen -> buttons davor

/**
 * Fast ID generator based on work on UUID generator by Jeff Ward (jcward.com).
 * @license MIT license
 * @link http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
 **/
var ID = (function() {
  var self = {};
  var lut = []; for (var i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }
  self.generate = function() {
    var d0 = Math.random()*0xffffffff|0;
    var d1 = Math.random()*0xffffffff|0;
    return 'id'+lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+
      lut[d1&0xff]+lut[d1>>8&0xff]+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff];
  }
  return self;
})();

function unhide(content, button) {
  alert("asldjflsad");
  $("#" + button).show();
  $("#" + content).show();
}

function zuklappen(this_node) {

    // as we can have nested things like "X likes that Y has commented",
    // we need to find the top element of these

    // find the top node (the whole entry) of this wall entry
  
    var topnode = this_node.closest('div[data-testid="fbfeed_story"]');

    if (! topnode.hasClass('fb_share_away')) {

      topnode.addClass('fb_share_away');

      // find the first "likes/commented/..." element

      var this_node = topnode.find("span.fwn.fcg:first");

      // check if it contains "likes/commented on/..." or something else we may want to hide

      var text = this_node.text();

      if (   ( hat_beitrag_geteilt == 1 && / Beitrag geteilt\./.test(text) )
          || ( hat_foto_geteilt == 1 && / Foto geteilt\./.test(text) )
          || ( hat_video_geteilt == 1 && / Video geteilt\./.test(text) )
          || ( hat_erinnerung_geteilt == 1 && / hat eine Erinnerung geteilt\./.test(text) )
          || ( mit_gefaellt_mir_markiert == 1 && ( 
              / gefällt das\./.test(text) 
              || / mit .Gefällt mir. markiert\./.test(text) 
             ) )
          || ( hat_das_kommentiert == 1 && / (?:hat|haben) das kommentiert\./.test(text) )
          || ( hat_auf_einen_kommentar_geantwortet == 1 && / hat auf einen Kommentar dazu geantwortet\./.test(text) )
          || ( hat_darauf_reagiert == 1 && / hat darauf reagiert\./.test(text) )
          || ( profilbild_aktualisiert == 1 && / hat [^ ]* Profilbild aktualisiert\./.test(text) )
          || ( titelbild_aktualisiert == 1 && / hat [^ ]* Titelbild aktualisiert\./.test(text) )
          || ( hat_neue_fotos_hinzugefuegt == 1 && / hat (?:[^ ]* neue Fotos|ein neues Foto) hinzugefügt/.test(text) )
          || ( nimmt_an_einer_veranstaltung_teil == 1 && / nimmt an einer Veranstaltung teil\./.test(text) )
          || ( wurde_markiert == 1 && / wurde markiert\./.test(text) )
          || alles_andere == 1
      ) {

        // ganz entfernen: jNode.closest('div[data-testid="fbfeed_story"]').remove();

        // minimize 

        // check if post with this name inside should not be folded
        
        var toptext = topnode.text();
        var len = nicht_zuklappen.length;
        for (var i = 0; i < len; i++) {
          if (toptext.indexOf(nicht_zuklappen[i]) > -1) {
            return;
          }
        }

        // uuids for buttons and hidden content
        
        var id_show = ID.generate();
        var id_hide = ID.generate();
        var id_content = ID.generate();
        
        // hide content

        // original article
        var node = topnode.find('.userContent');
        var wrapper = $("<div class='fbsa_" + id_content + "'></div>").hide();
        node.next().wrap(wrapper);
        
        // comment of user who shared something
        wrapper = $("<div class='fbsa_" + id_content + "'></div>").hide();
        node.wrap(wrapper);
        
        // hide comments
        
        node = topnode.find('.commentable_item');
        if (node != null) {
          wrapper = $("<div class='fbsa_" + id_content + "'></div>").hide();
          node.wrap(wrapper);
        }

        // add buttons to show / hide content

        var button_show = $("<a href='#' onclick='" 
            + "$(\".fbsa_" + id_content + "\").show();"
            + "$(\".fbsa_" + id_show + "\").hide();"
            + "$(\".fbsa_" + id_hide + "\").show();"
            + "' title='anzeigen' class='fbsa_" 
            + id_show + "' style='margin-right:8px'><span><img src='https://raw.githubusercontent.com/koem/fb-klapp/master/auf.png'></span></a>");
        var button_hide = $("<a href='#' onclick='" 
            + "$(\".fbsa_" + id_content + "\").hide();"
            + "$(\".fbsa_" + id_show + "\").show();"
            + "$(\".fbsa_" + id_hide + "\").hide();"
            + "' title='anzeigen' class='fbsa_" 
            + id_hide + "' style='margin-right:8px'><span><img src='https://raw.githubusercontent.com/koem/fb-klapp/master/zu.png'></span></a>").hide();
        this_node.prepend(button_show);
        this_node.prepend(button_hide);
      }
    }
}

waitForKeyElements ("span.fwn.fcg", zuklappen, false);

/*--- waitForKeyElements():  A utility function, for Greasemonkey scripts,
    that detects and handles AJAXed content.
    Usage example:
        waitForKeyElements (
            "div.comments"
            , commentCallbackFunction
        );
        //--- Page-specific function to do what we want when the node is found.
        function commentCallbackFunction (jNode) {
            jNode.text ("This comment changed by waitForKeyElements().");
        }
    IMPORTANT: This function requires your script to have loaded jQuery.
*/
function waitForKeyElements (
    selectorTxt,    /* Required: The jQuery selector string that
                        specifies the desired element(s).
                    */
    actionFunction, /* Required: The code to run when elements are
                        found. It is passed a jNode to the matched
                        element.
                    */
    bWaitOnce,      /* Optional: If false, will continue to scan for
                        new elements even after the first match is
                        found.
                    */
    iframeSelector  /* Optional: If set, identifies the iframe to
                        search.
                    */
) {
    var targetNodes, btargetsFound;

    if (typeof iframeSelector == "undefined")
        targetNodes     = $(selectorTxt);
    else
        targetNodes     = $(iframeSelector).contents ()
                                           .find (selectorTxt);

    if (targetNodes  &&  targetNodes.length > 0) {
        btargetsFound   = true;
        /*--- Found target node(s).  Go through each and act if they
            are new.
        */
        targetNodes.each ( function () {
            var jThis        = $(this);
            var alreadyFound = jThis.data ('alreadyFound')  ||  false;

            if (!alreadyFound) {
                //--- Call the payload function.
                var cancelFound     = actionFunction (jThis);
                if (cancelFound)
                    btargetsFound   = false;
                else
                    jThis.data ('alreadyFound', true);
            }
        } );
    }
    else {
        btargetsFound   = false;
    }

    //--- Get the timer-control variable for this selector.
    var controlObj      = waitForKeyElements.controlObj  ||  {};
    var controlKey      = selectorTxt.replace (/[^\w]/g, "_");
    var timeControl     = controlObj [controlKey];

    //--- Now set or clear the timer as appropriate.
    if (btargetsFound  &&  bWaitOnce  &&  timeControl) {
        //--- The only condition where we need to clear the timer.
        clearInterval (timeControl);
        delete controlObj [controlKey]
    }
    else {
        //--- Set a timer, if needed.
        if ( ! timeControl) {
            timeControl = setInterval ( function () {
                    waitForKeyElements (    selectorTxt,
                                            actionFunction,
                                            bWaitOnce,
                                            iframeSelector
                                        );
                },
                300
            );
            controlObj [controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj   = controlObj;
}
