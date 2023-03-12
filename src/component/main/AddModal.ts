import { Restaurant } from "@/type/type";
import { $ } from "@/utils/Dom";
import Select from "@/component/common/Select";
import { OptionValue } from "@/constant/Restaurant";
import { generateId } from "@/utils/generateId";
import { convertStringToNumber } from "@/utils/convertor";
import restaurantListHandler from "@/domain/restaurantListHandler";
import AppController from "@/AppDataController";
import Render from "@/view/Render";
import restaurantValidator from "@/domain/restaurantValidator";
import {
  CATEGORY,
  CategorySelectAttribute,
  TakingTimeSelectAttribute,
  TAKING_TIME,
} from "@/data/componentData";

class AddModal {
  categorySelect;
  takingTimeSelect;

  constructor() {
    this.categorySelect = new Select(CategorySelectAttribute, [
      OptionValue.PLACE_HOLDER,
      ...CATEGORY,
    ]);
    this.takingTimeSelect = new Select(TakingTimeSelectAttribute, [
      OptionValue.PLACE_HOLDER,
      ...TAKING_TIME,
    ]);
  }

  template() {
    return `<section class="modal add-modal">
    <div class="modal-backdrop"></div>
    <div class="modal-container add-modal-container">
      <h2 class="modal-title text-title">새로운 음식점</h2>
      <form class="modal-form">
        <div class="form-item form-item--required category--input">
          <label for="category">카테고리</label>
          ${this.categorySelect.template()}
        </div>

        <div class="form-item form-item--required name--input">
          <label for="name">이름</label>
          <input type="text" name="name" id="name">
        </div>

        <div class="form-item form-item--required taking_time--input">
          <label for="takingTime text-caption">거리(도보 이동 시간) </label>
         ${this.takingTimeSelect.template()}
        </div>

        <div class="form-item">
          <label for="description">설명</label>
          <textarea name="description" id="description" cols="30" rows="5"></textarea>
          <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
        </div>

        <div class="form-item">
          <label for="link">참고 링크</label>
          <input type="url" name="link" id="link">
          <span class="help-text text-caption">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
        </div>

        <div class="button-container">
          <button type="button" class="button button--secondary text-caption modal--close">취소하기</button>
          <button type="submit" class="button button--primary text-caption modal--submit">추가하기</button>
        </div>
      </form>
    </div>
  </section>`;
  }

  render(target: Element) {
    target.insertAdjacentHTML("beforeend", this.template());
  }

  addEvent() {
    $(".modal--close")?.addEventListener("click", () => {
      this.close();
    });

    $(".modal-backdrop")?.addEventListener("click", () => {
      this.close();
    });

    $(".modal-form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      this.deleteErrorMessage();

      const restaurant = this.getFormData();

      try {
        restaurantValidator.validate(restaurant);
        restaurantListHandler.addRestaurant(restaurant);
        const restaurantList = AppController.getRestaurantList();
        Render.updateRestaurantList(restaurantList);
        this.close();
      } catch (e) {
        const error = (e as string).toString();
        const [errorTarget, errorMessage] = error.split(":");
        this.showErrorMessage(errorTarget, errorMessage);
      }
    });
  }

  getFormData() {
    const $modal = $(".modal-form") as HTMLFormElement;
    const formData = Object.fromEntries(new FormData($modal).entries());
    const restaurant = {
      id: generateId(),
      name: (<string>formData.name).trim(),
      takingTime: convertStringToNumber(<string>formData.takingTime),
      category: formData.category,
      link: formData.link,
      description: formData.description,
      bookmarked: false,
    } as Restaurant;

    return restaurant;
  }

  resetForm() {
    const modalForm = $(".modal-form") as HTMLFormElement;
    modalForm.reset();
    this.deleteErrorMessage();
  }

  open() {
    $(".add-modal")?.classList.add("modal--open");
  }

  close() {
    this.resetForm();
    $(".add-modal")?.classList.remove("modal--open");
  }

  showErrorMessage(target: string, message: string) {
    $(`.${target}--input`)?.insertAdjacentHTML(
      "beforeend",
      `<div class='error--message'>${message}</div>`
    );
  }

  deleteErrorMessage() {
    $(".error--message")?.remove();
  }
}

export default new AddModal();
