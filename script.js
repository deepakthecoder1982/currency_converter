let country_choice = document.querySelectorAll(".converter select");
let country_image = document.querySelectorAll(".converter .children img");
// require("dotenv").config();
const APIkey = "5a485c84292e9954fa87da67";

for (let i = 0; i < country_choice.length; i++) {
  for (currency_code in country_list) {
    let options = `<option value="${country_list[currency_code]}">${currency_code}</option>`;
    country_choice[i].innerHTML += options;
  }
}

document.querySelector("#fromCountry").addEventListener("change", (e) => {
  const { value } = e.target;
  let image = document.querySelector(".converter .from_converter img");
  image.setAttribute(
    "src",
    `https://www.countryflagicons.com/FLAT/64/${value}.png` ||
      `https://www.countryflagicons.com/FLAT/64/US.png`
  );
});
document.querySelector("#toCountry").addEventListener("change", (e) => {
  const { value } = e.target;
  let image = document.querySelector(".converter .to_converter img");
  image.setAttribute(
    "src",
    `https://www.countryflagicons.com/FLAT/64/${value}.png`
  );
});

let Converter_btn = document.getElementById("convert-btn");
Converter_btn.addEventListener("click", async (e) => {
  let fromConverter = document.getElementById("fromCountry").value;
  e.preventDefault();
  for (let country_code in country_list) {
    if (country_list[country_code] == fromConverter) {
      fromConverter = country_code;
      break;
    }
  }
  try {
    let data = await fetch(
      `https://v6.exchangerate-api.com/v6/${APIkey}/latest/${fromConverter}`
    ).then((res) => res.json());
    console.log(data);
    let toConverter = document.getElementById("toCountry").value;
    let amount = document.getElementById("amount").value;

    for (let country_code in country_list) {
      if (country_list[country_code] == toConverter) {
        toConverter = country_code;
        break;
      }
    }
    let final_converson = amount * data.conversion_rates[toConverter];

    document.querySelector(
      ".conversion_rate"
    ).innerHTML = `<p>${amount} ${fromConverter} = ${final_converson.toFixed(
      2
    )} ${toConverter}</p>`;
  } catch (error) {
    console.log(error);
  }
});

document
  .querySelector(".switchingArrow")
  .addEventListener("click", async () => {
    let fromConverter = document.querySelector(".from_converter .children");
    let toConverter = document.querySelector(".to_converter .children");
    let amount = document.getElementById("amount").value;
    let toHtml = toConverter.innerHTML;
    let FromHtml = fromConverter.innerHTML;
    let from_Converter = document.getElementById("fromCountry").value;
    let to_Converter = document.getElementById("toCountry").value;

    fromConverter.innerHTML = toHtml;
    toConverter.innerHTML = FromHtml;

    let data = await fetch(
      `https://v6.exchangerate-api.com/v6/${APIkey}/latest/${fromConverter.value}`
    ).then((res) => res.json());
    console.log(data);

    document.querySelector(
      ".conversion_rate"
    ).innerHTML = `<p>${amount} ${from_Converter} = ${
      amount * data.conversion_rates[to_Converter]
    } ${to_Converter}</p>`;
  });
