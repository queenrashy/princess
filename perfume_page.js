function loadProducts() {
  fetch("http://127.0.0.1:5000/view/product")
    .then((res) => res.json())
    .then((data) => {
      let container = document.getElementById("product");
      container.innerHTML = ''
      if (!data.products || data.products.length === 0) {
        container.innerHTML = "<p>No Product found</p>";
        return;
      }
      //   the delete and edit button is also here
      data.products.forEach((p) => {
        container.innerHTML += `
           <div class='product-card'>
            <div class='product-card-div'>
                <img src="${baseUrl}/static/uploads/${p.filename}" style="width:150px;" >
              <div class='product-info'>
                <h3>${p.title}</h3>
                <p>${p.description}</p>
                <p>${p.price}</p>
              </div>
              <br>
              <button class='cart-btn' data-id='${p.id}'>Add to cart</button>
              <button class='buy-btn' data-id='${p.id}'>Buy</button>
            </div>
           </div>`;
        console.log(p.filename);
      });
      // add event listener after elements are added
      //   edit eventlistener
      document.querySelectorAll(".card-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const id = e.target.getAttribute("data-id");
          // call my edit function
          addToCart(id, data.products);
        });
      });

      // the delete listener
      document.querySelectorAll(".buy-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const id = e.target.getAttribute("data-id");
          // call edit function
          buyButton(id);
        });
      });
    })
    .catch((err) => {
      document.getElementById("product").innerHTML =
        "<p>Error loading products</p>";
      console.error("Fetch error:", err);
    });
}

// delete function
async function buyButton(id) {
  // ask if user is admin they want to delete
  if (!confirm("Are you sure you want to delete this product?")) return;
  // check if admin is logged in through local storage
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please login First");
  }
  // now the actual delete  route
  try {
    const response = await fetch(`${baseUrl}/card/add/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const result = await response.json();
    if (response.ok) {
      alert("Product deleted");
      location.reload(); //reload page and refresh them
    } else {
      alert("Failed to delete: " + result.message);
    }
  } catch (err) {
    alert("Error: " + err.message);
  }
}
// Edit product: Function
function editProduct(id, products) {
  const product = products.find((p) => p.id == id);
  if (!product) {
    alert("Product not found");
    return;
  }
  // show the edit of modal
  const editModal = document.getElementById("editModal");
  editModal.style.display = "block";

  // fill form fields with existing product data
  document.getElementById("edit-id").value = product.id;
  document.getElementById("edit-title").value = product.title;
  document.getElementById("edit-description").value = product.description;
  document.getElementById("edit-price").value = product.price;
}
// close modal funcion (attach to close button)
document.getElementById("closeEditModal").addEventListener("click", () => {
  document.getElementById("editModal").style.display = "none";
});
// sumbit edited product form
document
  .getElementById("editProductForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("edit-id").value;
    const title = document.getElementById("edit-title").value;
    const description = document.getElementById("edit-description").value;
    const price = document.getElementById("edit-price").value;

    const updatedData =  {title, description, price};

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login First");
      return (window.location.href = "/login_page.html");
    }
    // now the actual edit  route
    try {
      const response = await fetch(`${baseUrl}/a/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(updatedData),
      });
      const result = await response.json();
      if (response.ok) {
        alert("Product updated successfully");
        document.getElementById("editModal").style.display = "none";
    return (window.location.href = "/https://wa.me/2348139704781");

        location.reload(); //reload page and refresh them
        loadProducts();
      } else {
        alert("Failed to update: " +(result.message || "Unknown error"));
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  });
loadProducts();