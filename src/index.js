import "../templates/style.css";
import Header from "./component/disposable/Header";
import SelectContainer from "./component/disposable/SelectContainer";
import { $ } from "./utils/Dom";
import RestaurantList from "./component/disposable/RestaurantList";
import Modal from "./component/disposable/Modal";
import "../templates/add-button.png";
import "../templates/category-asian.png";
import "../templates/category-chinese.png";
import "../templates/category-etc.png";
import "../templates/category-japanese.png";
import "../templates/category-korean.png";
import "../templates/category-western.png";
import "../templates/favorite-icon-filled.png";
import "../templates/favorite-icon-lined.png";

new Header().render($(".body"));
new SelectContainer().render($(".body"));
new RestaurantList(template).render($(".body"));
new Modal().render($(".body"));
