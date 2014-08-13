///ts:ref=Config.d.ts
/// <reference path="../../jsonInterfaces/Config.d.ts"/> ///ts:ref:generated
///ts:import=CssClasses
import CssClasses = require('../../util/CssClasses'); ///ts:import:generated

class Link {

    constructor(private _model: Config.Link) {

    }

    public getText(): string {
        return this._model.text;
    }

    public getLink(): string {
        return this._model.link;
    }

    public getStyle(): string {
        return this._model.separator ? CssClasses.NAVIGATOR_SEPARATOR : undefined;
    }

}

export = Link;
