"use babel";

/* leny/atom-html-outliner
 *
 * lib/outliner-view.js - OutlinerView
 *
 * coded by leny@flatLand!
 * started at 30/08/2016
 */

/* globals atom */

import { SelectListView, TextEditorView } from "atom-space-pen-views";
import HTMLFourElementView from "./html-four-element-view";
import HTMLFiveElementView from "./html-five-element-view";

const MODES = {
    "FIVE": "five",
    "FOUR": "four",
};

let aItems = [
    {
        "name": "Headings Outline",
        "mode": MODES.FOUR,
    },
    {
        "name": "HTML5 Outline",
        "mode": MODES.FIVE,
    },
];

export default class OutlinerView extends SelectListView {

    static content() {
        this.div( { "class": "outliner-view select-list" }, () => {
            this.header( {}, () => {
                this.strong( {}, "Title:" );
                this.text( " " );
                this.span( { "outlet": "pageTitle" } );
            } );
            this.subview( "filterEditorView", new TextEditorView( { "mini": true } ) );
            this.div( { "class": "error-message", "outlet": "error" } );
            this.div( { "class": "loading", "outlet": "loadingArea" }, () => {
                this.span( { "class": "loading-message", "outlet": "loading" } );
                this.span( { "class": "badge", "outlet": "loadingBadge" } );
            } );
            this.ol( { "class": "list-group", "outlet": "list" } );
            this.div( { "class": "outline-container" }, () => {
                this.ul( { "outlet": "container" } );
            } );
        } );
    }

    constructor() {
        super();

        atom.commands.add( this.filterEditorView.element, {
            "core:move-left": ( oEvent ) => {
                this.selectPreviousItemView();
                oEvent.stopPropagation();
            },
            "core:move-right": ( oEvent ) => {
                this.selectNextItemView();
                oEvent.stopPropagation();
            },
        } );

        this.panel = atom.workspace.addModalPanel( {
            "item": this,
            "visible": true,
        } );
        this.addClass( "outliner-view" );
    }

    getFilterKey() {
        return "name";
    }

    getFilterQuery() {
        return "";
    }

    viewForItem( oItem ) {
        return `<li>${ oItem.name }</li>`;
    }

    confirmed() {
        return;
    }

    selectItemView( oView ) {
        super.selectItemView( oView );
        this.fill();
    }

    populate() {
        this.setItems( aItems );
    }

    populateList() {
        super.populateList();
    }

    fill() {
        let oData = this._data,
            sMode = this.getSelectedItem().mode;

        // header
        this.pageTitle.text( oData.title );

        // content
        this.container.empty();
        if ( sMode === MODES.FIVE ) {
            this.container.append( new HTMLFiveElementView( oData.five.sections[ 0 ], 0, true ) );
        }
        if ( sMode === MODES.FOUR ) {
            oData.four.forEach( ( oSubTree ) => {
                this.container.append( new HTMLFourElementView( oSubTree ) );
            } );
        }
    }

    show( oData ) {
        this._data = oData;

        this.populate();
        this.list.find( ".selected" ).removeClass( "selected" );
        this.list.find( "li:last" ).addClass( "selected" );
        this.fill();
        this.panel.show();
        this.focusFilterEditor();
    }

    cancel() {
        this.panel.hide();
    }
}
