
import { generateMocks } from "./mock/point.js";
import HeaderTripPresenter from "./presenter/header.js";
import BoardPointsPresenter from "./presenter/boardPoints.js";
import PointsPresenter from "./presenter/trip.js";

const COUNT_RENDER_DAYS_TRIP = 10;
const points = generateMocks(COUNT_RENDER_DAYS_TRIP);

const siteMainContainer = document.querySelector(`.trip-events`);
const siteHeaderMainTripContainer = document.querySelector(`.trip-main`);
const siteHeaderFilterTrip = siteHeaderMainTripContainer.querySelector(`.trip-main__trip-controls`);

new HeaderTripPresenter(points, siteHeaderMainTripContainer, siteHeaderFilterTrip).init();
new BoardPointsPresenter(siteMainContainer, points).init();
new PointsPresenter(siteMainContainer, points).init();
