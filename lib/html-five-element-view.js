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
        this.li( { "class": "element-five" }, () => {
            this.em( { "outlet": "containerTagName" } );
            this.span( { "outlet": "titleValue" } );
            this.ul( { "outlet": "subsectionsContainer" } );
        } );
    }

    constructor( oSection, iIndex = 0, bIsRoot = false ) {
        super();

        // TODO: add index to markup

        // container tag name
        if ( bIsRoot ) {
            this.containerTagName.text( "document" );
        } else if ( oSection.container ) {
            this.containerTagName.text( ( oSection.container.tagName || "" ).toLowerCase() );
        }

        // section title
        if ( oSection.heading ) {
            this.titleValue.text( oSection.heading.innerText );
        } else {
            this.titleValue.text( "no title" ); // TODO
        }

        // subsections
        if ( oSection.sections && oSection.sections.length > 0 ) {
            oSection.sections.forEach( ( oSubSection, iIndex ) => {
                this.subsectionsContainer.append( new HTMLFiveElementView( oSubSection, iIndex, false ) );
            } );

            for ( let oSubSection of oSection.sections ) {
                this.subsectionsContainer.append( new HTMLFiveElementView( oSubSection ) );
            }
        } else {
            this.subsectionsContainer.remove();
        }
    }
}
