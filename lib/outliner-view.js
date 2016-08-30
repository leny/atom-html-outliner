"use babel";

/* leny/atom-html-outliner
 *
 * lib/outliner-view.js - OutlinerView
 *
 * coded by leny@flatLand!
 * started at 30/08/2016
 */

import { $, $$, ScrollView } from "atom-space-pen-views";
import { Disposable } from "atom";

export default class OutlinerView extends ScrollView {

    static content() {
        this.div( { "class": "outliner-view" }, () => {
            this.div( { "class": "btn-toolbar" }, () => {
                this.div( { "class": "btn-group" }, () => {
                    this.button( { "type": "button", "class": "btn btn-default", "outlet": "showHTMLFourOutlineButton" }, "HTML4" );
                    this.button( { "type": "button", "class": "btn btn-info", "outlet": "showHTMLFiveOutlineButton" }, "HTML5" );
                } );
            } );
            this.div( { "class": "outline-container" } );
        } );
    }

    constructor( oData ) {
        super();

        this.panel = atom.workspace.addModalPanel( {
            "item": this,
            "visible": true
        } );
        this.addClass( "outliner-view" );

        console.log( "OutlinerView:", oData );
    }

    dispose() {
        // TODO
    }

    show() {
        this.populate();
        this.panel.show();
    }

    cancel() {
        this.panel.hide();
    }
}
