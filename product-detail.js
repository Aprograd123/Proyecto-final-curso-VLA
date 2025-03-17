console.log("Starting product detail");

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id'); // Obtener el ID del producto desde la URL

// Si no se encuentra el ID, mostramos un mensaje en la consola
if (!productId) {
    console.error("No product ID found in URL");
    alert("No se encontró un ID de producto en la URL.");
} else {
    // Si existe el ID, llamamos a la función para obtener los detalles del producto
    getProductDetails(productId);
}

// Función para obtener los detalles del producto
async function getProductDetails(id) {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const product = await response.json();

        // Llamamos a la función que genera los detalles del producto
        displayProductDetail(product);
    } catch (error) {
        console.error("Error fetching product details", error);
        alert("Hubo un error al cargar los detalles del producto. Verifica el ID.");
    }
}

// Función para mostrar los detalles del producto
function displayProductDetail(product) {
    const { title, price, description, image, rating } = product;
    const { rate, count } = rating; // Desestructuramos 'rate' y 'count' de 'rating'
    const productDetailContainer = document.getElementById("productDetail");

    // Crear las estrellas para mostrar la valoración (redondeando el rate a un número entero)
    let stars = "";
    const fullStars = Math.floor(rate); // Número de estrellas llenas
    const hasHalfStar = rate % 1 !== 0; // Verificamos si hay una media estrella
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars += "★"; // Estrella llena
        } else if (i === fullStars && hasHalfStar) {
            stars += "☆"; // Estrella vacía (representando media estrella)
        } else {
            stars += "☆"; // Estrella vacía
        }
    }

    productDetailContainer.innerHTML = `
        <div class="card shadow-sm rounded">
            <img src="${image}" class="card-img-top img-fluid" alt="${title}" style="height: 500px; object-fit: contain;">
            <div class="card-body">
                <h5 class="card-title fs-4 fw-bold">${title}</h5>
                <p class="card-text fs-6 text-muted">${description}</p>
                <p class="fs-5 fw-bold text-success">$${price.toFixed(2)}</p>
                <p class="fs-5 text-warning">${stars}</p> <!-- Mostrar estrellas para la valoración -->
                <p class="fs-6 text-muted">(${count} reseñas)</p> <!-- Mostrar el número de reseñas -->
                <button class="btn btn-primary w-100">Comprar</button>
                <a href="./productos.html" class="btn btn-primary mt-4">volver<a/>
            </div>
        </div>
    `;
}