"use babel";

/* leny/atom-html-outliner
 *
 * lib/outliner-view.js - OutlinerView
 *
 * coded by leny@flatLand!
 * started at 30/08/2016
 */

import { $, ScrollView } from "atom-space-pen-views";
import { Disposable } from "atom";
import HTMLFiveElementView from "./html-five-element-view";

const MODES = {
    "FIVE": "five",
    "FOUR": "four",
};

export default class OutlinerView extends ScrollView {

    static content() {
        this.div( { "class": "outliner-view" }, () => {
            this.header( {}, () => {
                this.strong( {}, "Title: " );
                this.span( { "outlet": "pageTitle" } );
            } );
            this.div( { "class": "btn-toolbar" }, () => {
                this.div( { "class": "btn-group" }, () => {
                    this.button( { "type": "button", "class": "btn btn-default mode-selector mode-four", "outlet": "showHTMLFourOutlineButton" }, "HTML 4" );
                    this.button( { "type": "button", "class": "btn btn-default mode-selector mode-five", "outlet": "showHTMLFiveOutlineButton" }, "HTML 5" );
                } );
            } );
            this.div( { "class": "outline-container", "outlet": "container" } );
        } );
    }

    constructor() {
        super();

        this.mode = MODES.FIVE;

        this.panel = atom.workspace.addModalPanel( {
            "item": this,
            "visible": true
        } );
        this.addClass( "outliner-view" );
    }

    dispose() {
        // TODO
    }

    fill( oData ) {
        // header
        this.pageTitle.text( oData.title );

        // buttons
        this.find( ".mode-selector" ).each( ( iIndex, oElt ) => {
            let $elt = $( oElt );

            $elt.toggleClass( "selected", $elt.hasClass( `mode-${ this.mode }` ) );
        } );

        // content
        this.container.empty();
        if ( this.mode === MODES.FIVE ) {
            console.log( "Show HTML5 outline" );

            let $content = new HTMLFiveElementView( oData.five.sections[ 0 ], 0, true );

            this.container.append( $content );
        }
        if ( this.mode === MODES.FOUR ) {
            // TODO
            console.log( "Show HTML4 outline" );
        }
    }

    show( oData ) {
        this.fill( oData );
        this.panel.show();
    }

    cancel() {
        this.panel.hide();
    }
}