import {render, RenderPosition} from "../utils/render.js";
import TripSortView from "../view/trip-sort.js";

export default class BoardPointsPresenter {
  constructor(siteMainContainer, points) {
    this._siteMainContainer = siteMainContainer;
    this._sortView = new TripSortView();
    this._points = points;
  }

  _checkPoints() {
    switch (this._points.length === 0) {
      case true:
        this._sortView = ``;
        break;
      default:
        render(this._siteMainContainer, this._sortView, RenderPosition.BEFOREEND);
    }
  }

  init() {
    this._checkPoints();
  }
}
