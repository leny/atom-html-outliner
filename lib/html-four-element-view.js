"use babel";

/* leny/atom-html-outliner
 *
 * lib/html-four-element-view.js - HTMLFourElementView
 *
 * coded by leny@flatLand!
 * started at 03/09/2016
 */

import { $, View } from "atom-space-pen-views";

export default class HTMLFourElementView extends View {
    static content() {
        this.li( { "class": "element-four", "outlet": "sectionContainer" }, () => {
            this.div( { "class": "element", "outlet": "elementContainer" }, () => {
                this.span( { "outlet": "titleValue" } );
            } );
            this.ul( { "outlet": "subsectionsContainer" } );
        } );
    }

    constructor( oHeading ) {
        super();

        this.elementContainer.attr( "data-index", oHeading.level );

        // title
        this.titleValue.text( oHeading.text );

        // check for error
        if ( !Array.isArray( oHeading.parent ) ) {
            this.toggleClass( "has-error", oHeading.parent.level - oHeading.level < -1 );
        }

        // childs
        if ( oHeading.children && oHeading.children.length ) {
            this.addClass( "has-childs" );
            oHeading.children.forEach( ( oSubHeading ) => {
                this.subsectionsContainer.append( new HTMLFourElementView( oSubHeading ) );
            } );
        } else {
            this.subsectionsContainer.remove();
        }
    }
}
