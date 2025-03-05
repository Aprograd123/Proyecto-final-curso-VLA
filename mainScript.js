console.log("Starting");

const apiUrl = "https://fakestoreapi.com/products";

// Función para crear una tarjeta de producto
function makeCard(producto, container) {
    const { id, title, price, description, image } = producto;

    const card = document.createElement("div");
    card.classList.add("row"); // Bootstrap grid

    // Enlace que lleva al detalle del producto
    const productLink = document.createElement('a');
    productLink.href = `product-detail.html?id=${id}`; // Aquí estamos pasando el ID del producto en la URL
    productLink.classList.add('text-decoration-none'); // Para evitar subrayado por defecto

    // Creación de la tarjeta dentro del enlace
    const cardContent = `
        <div class="bg-secondar h-100 text-white shadow ">
            <img src="${image}" class="card-img-top" alt="${title}" style="height: 250px; object-fit: contain;">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="fw-bold ${price > 50 ? 'text-success' : 'text-secondary'}">$${price.toFixed(2)}</p>
            </div>
        </div>
    `;

    productLink.innerHTML = cardContent;
    card.appendChild(productLink);
    container.appendChild(card);
}

// Función para obtener productos
async function getProducts() {
    try {
        const response = await fetch(apiUrl);
        const products = await response.json();

        // Filtrar productos de la categoría "electronics"
        const electronics = products.filter(product => product.category === "electronics");

        // Filtrar productos de la categoría "jewelery"
        const jewelery = products.filter(product => product.category === "jewelery");

        // Filtrar productos de la categoría "men's clothing"
        const mensClothing = products.filter(product => product.category === "men's clothing");

        // Filtrar productos de la categoría "women's clothing"
        const womensClothing = products.filter(product => product.category === "women's clothing");

        // Mostrar los productos de "electronics"
        const electronicsContainer = document.getElementById("electronicsContainer");
        if (electronics.length === 0) {
            electronicsContainer.innerHTML = "<p>No electronics found</p>";
        } else {
            electronics.forEach(product => {
                makeCard(product, electronicsContainer);
                console.log("Adding electronics product:", product);
            });
        }

        // Mostrar los productos de "jewelery"
        const jeweleryContainer = document.getElementById("jeweleryContainer");
        if (jewelery.length === 0) {
            jeweleryContainer.innerHTML = "<p>No jewelery found</p>";
        } else {
            jewelery.forEach(product => {
                makeCard(product, jeweleryContainer);
                console.log("Adding jewelery product:", product);
            });
        }

        // Mostrar los productos de "men's clothing"
        const mensClothingContainer = document.getElementById("mensClothingContainer");
        if (mensClothing.length === 0) {
            mensClothingContainer.innerHTML = "<p>No men's clothing found</p>";
        } else {
            mensClothing.forEach(product => {
                makeCard(product, mensClothingContainer);
                console.log("Adding men's clothing product:", product);
            });
        }

        // Mostrar los productos de "women's clothing"
        const womensClothingContainer = document.getElementById("womensClothingContainer");
        if (womensClothing.length === 0) {
            womensClothingContainer.innerHTML = "<p>No women's clothing found</p>";
        } else {
            womensClothing.forEach(product => {
                makeCard(product, womensClothingContainer);
                console.log("Adding women's clothing product:", product);
            });
        }

    } catch (error) {
        console.error("Error fetching products", error);
    }
}

getProducts();