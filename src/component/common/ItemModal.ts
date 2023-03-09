import { HandleWithId, Rerender, Restaurant } from "@/type/type";
import { categoryToSrc } from "@/utils/convertor";
import { StarImgPath } from "@/constant/Restaurant";
import { $ } from "@/utils/Dom";

class ItemModal {
  restaurant: Restaurant;

  constructor(restaurant: Restaurant) {
    this.restaurant = restaurant;
  }

  template() {
    return `
    <div class="item-modal modal--open">
      <div class="modal-backdrop item-modal-backdrop"></div>
      <div class="modal-container item-modal-container">
        <div class="images flex-row">
          <div class="restaurant__category">
            <img src=${categoryToSrc(this.restaurant.category)} alt=${
      this.restaurant.category
    }/></div>
          <img src=${
            this.restaurant.bookmarked
              ? `./${StarImgPath.FILLED_STAR}`
              : `./${StarImgPath.EMPTY_STAR}`
          } alt="bookmarked" class="item-bookmark bookmark"/>
        </div>
        <div class="item-information">
          <h3 class="item__name text-subtitle">${this.restaurant.name}</h3>
          <div class="item__takingTime text-body">캠퍼스부터 ${
            this.restaurant.takingTime
          }분 내</div>
          <p class="item__description text-body">${
            this.restaurant.description
          }</p>
          <span class="restaurant__link">
            <a target='_blank' href=${this.restaurant.link}>${
      this.restaurant.link
    }</a></span>
        </div>
        <div class="button-container">
          <button type="button" class="button button--secondary text-caption item-modal--delete">삭제하기</button>
          <button type="button" class="button button--primary text-caption item-modal--close">닫기</button>
        </div>
      </div>
    </div>
    `;
  }

  render() {
    $("body")?.insertAdjacentHTML("beforeend", this.template());
  }

  rerender(
    deleteRestaurant: HandleWithId,
    toggleBookmark: HandleWithId,
    rerenderList: Rerender
  ) {
    this.close();
    this.render();
    this.addEvent(deleteRestaurant, toggleBookmark, rerenderList);
  }

  close() {
    $(".item-modal")?.remove();
  }

  addEvent(
    deleteRestaurant: HandleWithId,
    toggleBookmark: HandleWithId,
    rerenderList: Rerender
  ) {
    $(".item-modal--close")?.addEventListener("click", () => {
      this.close();
    });

    $(".item-modal-backdrop")?.addEventListener("click", () => {
      this.close();
    });

    $(".item-modal--delete")?.addEventListener("click", () => {
      deleteRestaurant(this.restaurant.id);
      rerenderList();
      this.close();
    });

    $(".item-bookmark")?.addEventListener("click", () => {
      toggleBookmark(this.restaurant.id);
      this.restaurant.bookmarked = !this.restaurant.bookmarked;
      //별만 다시 넣는 작업으로 변경
      this.rerender(deleteRestaurant, toggleBookmark, rerenderList);
      rerenderList();
    });
  }
}

export default ItemModal;
