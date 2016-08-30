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
import OutlinerView from "./outliner-view";

const PARSER = new DOMParser();

let oOutlinerView;

export default function() {
    let oEditor, sContent, oDOM, sTitle, oHTMLFiveOutline;

    if ( !( oEditor = atom.workspace.getActiveTextEditor() ) ) {
        return;
    }

    if ( !oEditor.getGrammar().scopeName.includes( "html" ) ) {
        return atom.notifications.addWarning( "Current file isn't HTML!" );
    }

    sContent = oEditor.getText();
    oDOM = PARSER.parseFromString( sContent, "text/html" );
    sTitle = oDOM.title;
    oHTMLFiveOutline = outlinerHTML5( oDOM.body );

    if ( !oOutlinerView ) {
        oOutlinerView = new OutlinerView();
    }

    oOutlinerView.show( {
        "five": oHTMLFiveOutline,
        "title": sTitle,
    } );
};
