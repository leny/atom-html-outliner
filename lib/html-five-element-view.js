"use babel";

/* leny/atom-html-outliner
 *
 * lib/html-five-element-view.js - HTMLFiveElementView
 *
 * coded by leny@flatLand!
 * started at 31/08/2016
 */

import { $, View } from "atom-space-pen-views";

export default class HTMLFiveElementView extends View {
    static content() {
        this.li( { "class": "element-five", "outlet": "sectionContainer" }, () => {
            this.div( { "class": "element", "outlet": "elementContainer" }, () => {
                this.em( { "outlet": "containerTagName" } );
                this.text( " " );
                this.span( { "outlet": "titleValue" } );
            } );
            this.ul( { "outlet": "subsectionsContainer" } );
        } );
    }

    constructor( oSection, iIndex = 0, bIsRoot = false ) {
        super();

        this.elementContainer.attr( "data-index", iIndex + 1 );
        this.toggleClass( "is-root", bIsRoot );

        // container tag name
        if ( bIsRoot ) {
            this.containerTagName.text( "document" );
        } else if ( oSection.startingNode ) {
            this.containerTagName.text( ( oSection.startingNode.tagName || "" ).toLowerCase() );
        }

        // section title
        if ( !!oSection.heading.implied ) {
            this.addClass( "has-error" );
            this.titleValue.text( "Untitled (no head element)" ); // TODO
        } else {
            this.titleValue.text( oSection.heading.innerText );
        }

        // subsections
        if ( oSection.sections && oSection.sections.length > 0 ) {
            this.addClass( "has-childs" );
            oSection.sections.forEach( ( oSubSection, iIndex ) => {
                this.subsectionsContainer.append( new HTMLFiveElementView( oSubSection, iIndex ) );
            } );
        } else {
            this.subsectionsContainer.remove();
        }
    }
}
