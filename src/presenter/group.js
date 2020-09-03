
import TripPointListView from "../view/tripPointsList.js";
import InnerTripPointList from "../view/innerPointsList.js";
import PointPresenter from './point.js';
import { render, RenderPosition, remove } from "../utils/render.js";

export default class GroupPresenter {
  constructor(container, changeData, modeChange) {
    this._container = container;
    this._pointPresenter = {};
    this._modeChange = modeChange;
    this._changeData = changeData;
    this._handlePointChange = this._handlePointChange.bind(this);
  }

  init(points, dayNumber, showDate) {
    this.dayNumber = dayNumber;
    this._tripPointListElement = new TripPointListView(points[0].startDate, dayNumber, showDate);
    render(this._container, this._tripPointListElement, RenderPosition.BEFOREEND);
    this._innerTripPointList = new InnerTripPointList();
    render(this._tripPointListElement, this._innerTripPointList, RenderPosition.BEFOREEND);

    points.forEach((point) => {
      this._pointPresenter[point.id] = new PointPresenter(this._innerTripPointList, this._modeChange, this._handlePointChange, points);
      this._pointPresenter[point.id].init(point, this._innerTripPointList);
    });
  }

  _handlePointChange(updatedPoint) {
    this._changeData(updatedPoint, this.dayNumber);
  }

  getPointPresenter(point) {
    this._pointPresenter[point.id].init(point);
  }

  destroy() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    remove(this._innerTripPointList);
    remove(this._tripPointListElement);
    this._pointPresenter = {};
  }

  resetView() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }
}
