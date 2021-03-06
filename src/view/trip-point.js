import {formatTaskDueDate, msToTime} from "../utils/dates.js";
import Abstract from "./abstract.js";
import {EXTRA_TYPES} from "../consts.js";

export default class PointView extends Abstract {
  constructor(point) {
    super();
    this._point = point;
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  createTripPointTemplate(point) {
    const MAX_COUNT_OPTIONS = 3;
    const {startDate, endDate, id} = point;
    let {type} = point;
    type = type[0].toUpperCase() + type.substring(1);
    const city = point.city;
    const durMiliseconds = endDate.getTime() - startDate.getTime();
    const duration = msToTime(durMiliseconds);

    const t1 = formatTaskDueDate(startDate);
    const t2 = formatTaskDueDate(endDate);

    let optionsHtml = ``;
    const fixedOptions = [];
    let optionName;
    let optionPrice = 0;
    point.options.forEach((offer) => {
      fixedOptions.push(offer);
    });

    const typeCompare = (pointType) => pointType === type[0].toLowerCase() + type.substring(1);

    fixedOptions.slice(0, MAX_COUNT_OPTIONS).forEach((option) => {
      optionName = option.title;
      optionPrice = option.price;

      optionsHtml += `
        <li class="event__offer">
          <span class="event__offer-title">${optionName}</span> + €&nbsp;<span class="event__offer-price">${optionPrice}</span>
        </li >
      `;
    });

    return `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png"
                alt="Event type icon">
        </div>
        <h3 class="event__title"> ${type} ${EXTRA_TYPES.some(typeCompare) ? `in` : `to`} ${city}</h3>

        <div class="event__schedule">
            <p class="event__time">
                <time class="event__start-time" datetime=${startDate}>${t1}</time>
                —
                <time class="event__end-time" datetime=${endDate}>${t2}</time>
            </p>
            <p class="event__duration">${duration}</p >
        </div>


        <p class="event__price">
            € <span class="event__price-value">${point.price}</span>
        </p>

  <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${optionsHtml}
    </ul>

    <button class="event__rollup-btn" type="button" data-index=${id}>
      <span class="visually-hidden">Open event</span>
    </button>
    </div >
  </li > `;
  }

  getTemplate() {
    return this.createTripPointTemplate(this._point);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setPointClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }

  removePointClickHandler() {
    this.getElement().querySelector(`.event__rollup-btn`).removeEventListener(`click`, this._editClickHandler);
  }

  restoreHandlers() {
    this.setPointClickHandler();
  }
}

