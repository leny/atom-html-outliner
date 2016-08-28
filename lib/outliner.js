"use babel";

/* leny/atom-html-outliner
 *
 * lib/outliner.js - Outliner
 *
 * coded by leny@flatLand!
 * started at 29/08/2016
 */

/* globals atom */

import { MessagePanelView, LineMessageView, PlainMessageView } from "atom-message-panel";
import outlinerHTML5 from "h5o";

let sOutlinePanelTitle = '<span class="icon-microscope"></span> HTML Outliner Report',
    oMessagesPanel = new MessagePanelView( {
        "closeMethod": "destroy",
        "rawTitle": true,
    } ),
    fCheck,
    fShowResults;

fShowResults = function( oResults ) {
    // TODO: show results
    console.log( oResults );
};

fCheck = function() {
    let oEditor;

    if ( !( oEditor = atom.workspace.getActiveTextEditor() ) ) {
        return;
    }

    oMessagesPanel.clear();
    oMessagesPanel.setTitle( sOutlinePanelTitle, true );
    oMessagesPanel.attach();

    if ( atom.config.get( "html-outline.useFoldModeAsDefault" ) && oMessagesPanel.summary.css( "display" ) === "none" ) {
        oMessagesPanel.toggle();
    }

    oMessagesPanel.add( new PlainMessageView( {
        "message": '<span class="icon-hourglass"></span> Validation pending (this can take some time)...',
        "raw": true,
        "className": "text-info",
    } ) );

    if ( oEditor.getGrammar().scopeName.includes( "html" ) ) {
        console.log( "perform outlines" );
        // TODO: perform outlines
        // TODO: show results
    }
};

export default fCheck;
