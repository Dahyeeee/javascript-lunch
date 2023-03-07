import Header from "@/component/main/Header";
import AddModal from "@/component/main/AddModal";
import RestaurantList from "@/component/main/RestaurantList";
import SelectContainer from "@/component/main/SelectContainer";
import AppController from "./AppController";

class App {
  constructor(body: Element) {
    this.renderComponents(body);
    this.addEvents();
    this.rerenderList();
  }

  renderComponents(body: Element) {
    Header.render(body);
    SelectContainer.render(body);
    RestaurantList.render(body);
    AddModal.render(body);
  }

  addEvents() {
    Header.addEvent(AddModal.openModal);
    SelectContainer.addEvent(AppController.setSelectedValue, this.rerenderList);
    AddModal.addEvent(AppController.addNewRestaurant, this.rerenderList);
  }

  rerenderList = () => {
    const newRestaurants = AppController.getRestaurantList();
    RestaurantList.updateList(newRestaurants);
  };
}

export default App;
