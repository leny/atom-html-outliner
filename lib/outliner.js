"use babel";

/* leny/atom-html-outliner
 *
 * lib/outliner.js - Outliner
 *
 * coded by leny@flatLand!
 * started at 29/08/2016
 */

/* globals atom */

import outlinerHTML5 from "h5o";
import { outline as outlinerHTML4 } from "easy-outliner";
import OutlinerView from "./outliner-view";

const PARSER = new DOMParser();

export default function() {
    let oEditor, sContent, oDOM, sTitle,
        oHTMLFourOutline, oHTMLFiveOutline;

    if ( !( oEditor = atom.workspace.getActiveTextEditor() ) ) {
        return;
    }

    if ( !oEditor.getGrammar().scopeName.includes( "html" ) ) {
        return atom.notifications.addWarning( "Current file isn't HTML!" );
    }

    sContent = oEditor.getText();
    oHTMLFourOutline = outlinerHTML4( sContent );
    oDOM = PARSER.parseFromString( sContent, "text/html" );
    sTitle = oDOM.title;
    oHTMLFiveOutline = outlinerHTML5( oDOM.body );

    ( new OutlinerView() ).show( {
        "five": oHTMLFiveOutline,
        "four": oHTMLFourOutline,
        "title": sTitle,
    } );
};
