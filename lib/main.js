"use babel";

/* leny/atom-html-outliner
 *
 * lib/main.js - Main entry point
 *
 * coded by leny@flatLand!
 * started at 29/08/2016
 */

/* globals atom */

import { CompositeDisposable } from "atom";
import outliner from "./outliner";

let oConfig,
    oDisposables,
    fActivate, fDeactivate;

oConfig = {};

fActivate = function() {
    let oCommand;

    oDisposables && oDisposables.dispose();
    oDisposables = new CompositeDisposable();

    oCommand = atom.commands.add( "atom-text-editor:not([mini])", "html-outline:show-outline", () => {
        if ( atom.workspace.getActiveTextEditor().getGrammar().scopeName.includes( "text.html" ) ) {
            return outliner();
        }

        return atom.notifications.addWarning( "Current file isn't HTML!" );
    } );

    oDisposables.add( oCommand );
};

fDeactivate = function() {
    oDisposables && oDisposables.dispose();
};

export {
    oConfig as config,
    fActivate as activate,
    fDeactivate as deactivate,
};
