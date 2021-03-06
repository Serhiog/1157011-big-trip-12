import Abstract from "./abstract.js";


export default class TripFilterView extends Abstract {
  constructor(filters, currentFilter, points) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilter;
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this.setCheckedAttribute();
    this._points = points;
    this._checkPointDate();
  }

  createMainTripFilterTemplate() {
    return `<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">
      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
      <label class="trip-filters__filter-label" for="filter-future" id="future">Future</label>
    </div>

    <div class="trip-filters__filter">
      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
      <label class="trip-filters__filter-label" for="filter-past" id="past">Past</label>
    </div>

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
  }

  getTemplate() {
    return this.createMainTripFilterTemplate();
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().querySelectorAll(`.trip-filters__filter-input`).forEach((filter) => {
      filter.addEventListener(`click`, this._filterTypeChangeHandler);
    });
  }

  setCheckedAttribute() {
    this.getElement().querySelectorAll(`.trip-filters__filter-input`).forEach((element) => {
      if (element.value === this._currentFilter) {
        element.setAttribute(`checked`, ``);
      }
    });
  }

  _checkPointDate() {
    if (this._points.every(this._checkFuturePoints)) {
      const filterPastElement = this.getElement().querySelector(`#filter-past`);
      filterPastElement.setAttribute(`disabled`, ``);
      this.getElement().querySelector(`#past`).classList.add(`disabled`);
      this.getElement().querySelector(`#past`).style.cursor = `not-allowed`;
    } else if (this._points.every(this._checkPastPoints)) {
      const filterFutureElement = this.getElement().querySelector(`#filter-future`);
      filterFutureElement.setAttribute(`disabled`, ``);
      this.getElement().querySelector(`#future`).classList.add(`disabled`);
      this.getElement().querySelector(`#future`).style.cursor = `not-allowed`;
    }
  }

  _checkFuturePoints(point) {
    return point.startDate > new Date().getTime();
  }

  _checkPastPoints(point) {
    return point.startDate < new Date().getTime();
  }
}
