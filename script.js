const inputField = document.getElementById("input-search");
const foodContainer = document.getElementById("food-container");

// Search Food

function searchFood() {
  let inputText = inputField.value;
  console.log(inputText);
  inputField.value = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      foodContainer.innerHTML = "";
      data.meals?.forEach((food) => {
        const videoId = food.strYoutube.split("=")[1];
        console.log(videoId);
        const col = document.createElement("div");
        col.classList.add("col");
        col.innerHTML = `
            <div
             class="p-2 shadow p-3 bg-body rounded">
            <img
              class="img-fluid"
              src="${food.strMealThumb}"
              alt=""
            />
            <div class="d-flex justify-content-between mt-4"><h5>${
              food.strMeal
            }</h5>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#foodDetails${food.idMeal}"
            >
              Details
            </button> 
            </div>
            <div
        class="modal"
        id="foodDetails${food.idMeal}"
        tabindex="-1"
        aria-labelledby="foodModal"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
        >
          <div class="modal-content">
            <div class="modal-header text-center">
              <h3 class="modal-title" id="foodModal">How to make <span class="text-primary">${
                food.strMeal
              }</span> </h3>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <iframe
                class="container-fluid"
                height="400"
                src="https://www.youtube.com/embed/${videoId}"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              <div class="row row-col mt-3 mx-0 g-4">
                <div class="col col-4">
                  <div class="">
                    <h5>Ingradients</h5>
                    <p id="ingredients">
                      ${ingradientsList(food)}
                    </p>
                  </div>
                </div>
                <div class="col col-8">
                  <div class="ms-auto">
                    <h5>Instrction</h5>

                    <p class="text-secondary">
                      ${food.strInstructions}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
          </div>
          `;
        foodContainer.appendChild(col);
        // console.log(food);
      });
    });
}
inputField.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    // event.preventDefault();
    document.getElementById("button-search").click();
  }
});

const foodDetails = (mealId) => {
  console.log(mealId);
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => {
      const modal = document.createComment("div");
      modal.innerHTML = `
      
          `;
    });
};

function ingradientsList(food) {
  console.log(food);
  let ingredients = "";
  for (let i = 1; i < 10; i++) {
    console.log(food[`strIngredient${i}`]);
    ingredients +=
      "- " + food[`strIngredient${i}`] + " (" + food[`strMeasure${i}`] + ")";
    ingredients += "<br>";
  }
  return ingredients;
}
