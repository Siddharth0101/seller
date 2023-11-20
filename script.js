async function detail(event) {
  event.preventDefault();
  let selling = document.querySelector("#selling_").value;
  let product = document.querySelector("#product_").value;
  let obj = {
    Selling: selling,
    Product: product,
  };
  try {
    await axios.post(
      "https://crudcrud.com/api/6d9fe8e5a36440248b3cc96836dde53c/DATA",
      obj
    );

    showOnScreen(obj);
  } catch (error) {
    console.error(error);
  }
}

let counter = 0;
async function showOnScreen(obj) {
  counter += parseFloat(obj.Selling);
  let totalDisplay = document.querySelector("#total_");
  totalDisplay.innerHTML = `Total: ${counter} inr`;
  let parent = document.querySelector("#itemList_");
  let child = document.createElement("li");
  let childText = document.createTextNode(`${obj.Selling} inr -${obj.Product}`);
  let deleteBtn = document.createElement("button");
  let deleteText = document.createTextNode("delete");
  deleteBtn.onclick = async () => {
    parent.removeChild(child);
    try {
      await axios.delete(
        `https://crudcrud.com/api/6d9fe8e5a36440248b3cc96836dde53c/DATA/${obj._id}`
      );
    } catch (error) {
      console.error(error);
    }
  };
  deleteBtn.appendChild(deleteText);
  child.appendChild(deleteBtn);
  child.appendChild(childText);
  parent.appendChild(child);
}

async function fetchData() {
  try {
    const res = await axios.get(
      "https://crudcrud.com/api/6d9fe8e5a36440248b3cc96836dde53c/DATA"
    );
    console.log(res);

    for (let i = 0; i < res.data.length; i++) {
      await showOnScreen(res.data[i]);
    }
  } catch (error) {
    console.error(error);
  }
}

window.addEventListener("DOMContentLoaded", fetchData);
