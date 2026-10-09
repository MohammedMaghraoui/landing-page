// ========================================
// PRODUCTS
// ========================================

const products = [

    {
        id: 1,
        name: "Sac Signature",
        category: "femme",
        price: 349,
        oldPrice: 449,
        description: "Un sac élégant et polyvalent conçu pour accompagner votre style quotidien.",
        fullDescription: "Le Sac Signature combine élégance, praticité et design moderne. Son format permet de transporter facilement vos essentiels tout en conservant une allure chic.",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85"
    },

    {
        id: 2,
        name: "Montre Essential",
        category: "homme",
        price: 389,
        oldPrice: 499,
        description: "Une montre minimaliste au design intemporel.",
        fullDescription: "La Montre Essential est pensée pour les hommes qui recherchent un style élégant et discret. Son design s'adapte aussi bien aux occasions professionnelles qu'aux sorties quotidiennes.",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85"
    },

    {
        id: 3,
        name: "Portefeuille Premium",
        category: "accessoires",
        price: 259,
        oldPrice: 329,
        description: "Portefeuille élégant avec finition premium.",
        fullDescription: "Un portefeuille compact et pratique avec une finition élégante. Idéal pour organiser vos cartes, billets et essentiels du quotidien.",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=85"
    },

    {
        id: 4,
        name: "Lunettes Urban",
        category: "homme",
        price: 299,
        oldPrice: 379,
        description: "Des lunettes modernes pour un style contemporain.",
        fullDescription: "Les Lunettes Urban apportent une touche moderne à votre look. Leur design polyvalent convient à différents styles vestimentaires.",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=85"
    },

    {
        id: 5,
        name: "Sac Mini Chic",
        category: "femme",
        price: 279,
        oldPrice: 349,
        description: "Petit format, grand style.",
        fullDescription: "Le Sac Mini Chic est idéal pour les sorties et les occasions où vous souhaitez garder uniquement l'essentiel avec vous.",
        image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1000&q=85"
    },

    {
        id: 6,
        name: "Ceinture Classic",
        category: "accessoires",
        price: 199,
        oldPrice: 249,
        description: "Une ceinture classique et élégante.",
        fullDescription: "Une pièce essentielle qui complète facilement vos tenues. Son design sobre permet de l'associer avec différents styles.",
        image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1000&q=85"
    },

    {
        id: 7,
        name: "Chemise Essential",
        category: "homme",
        price: 329,
        oldPrice: 399,
        description: "Chemise moderne à coupe élégante.",
        fullDescription: "Une chemise polyvalente qui peut être portée aussi bien avec un pantalon classique qu'avec un jean.",
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=85"
    },

    {
        id: 8,
        name: "Bracelet Élégance",
        category: "accessoires",
        price: 179,
        oldPrice: 229,
        description: "Bracelet minimaliste et élégant.",
        fullDescription: "Un bracelet discret conçu pour apporter une petite touche d'élégance à votre tenue quotidienne.",
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1000&q=85"
    }

];


// ========================================
// CART
// ========================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    renderCart();
}


// ========================================
// ADD TO CART
// ========================================

function addToCart(id, quantity = 1) {

    const existing = cart.find(
        item => item.id === id
    );

    if (existing) {

        existing.quantity += quantity;

    } else {

        cart.push({
            id: id,
            quantity: quantity
        });

    }

    saveCart();

    openCart();
}


// ========================================
// RENDER CART
// ========================================

function renderCart() {

    const items = document.getElementById("cartItems");
    const count = document.getElementById("cartCount");
    const totalElement = document.getElementById("cartTotal");

    if (!items) return;

    items.innerHTML = "";

    let total = 0;
    let countTotal = 0;

    cart.forEach(item => {

        const product = products.find(
            p => p.id === item.id
        );

        if (!product) return;

        total += product.price * item.quantity;
        countTotal += item.quantity;

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="cart-item-info">

                <h4>
                    ${product.name}
                </h4>

                <p>
                    ${product.price} DH
                </p>

                <div class="cart-controls">

                    <button onclick="changeQuantity(${product.id}, -1)">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button onclick="changeQuantity(${product.id}, 1)">
                        +
                    </button>

                    <button
                        class="remove-item"
                        onclick="removeFromCart(${product.id})"
                    >
                        🗑
                    </button>

                </div>

            </div>

        `;

        items.appendChild(div);

    });

    if (cart.length === 0) {

        items.innerHTML = `
            <div class="empty-cart">
                Votre panier est vide.
            </div>
        `;

    }

    if (count) {
        count.textContent = countTotal;
    }

    if (totalElement) {
        totalElement.textContent = total;
    }
}


// ========================================
// QUANTITY
// ========================================

function changeQuantity(id, amount) {

    const item = cart.find(
        item => item.id === id
    );

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {

        cart = cart.filter(
            item => item.id !== id
        );

    }

    saveCart();
}


// ========================================
// REMOVE
// ========================================

function removeFromCart(id) {

    cart = cart.filter(
        item => item.id !== id
    );

    saveCart();
}


// ========================================
// OPEN CART
// ========================================

function openCart() {

    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("overlay");

    if (!drawer) return;

    drawer.classList.add("active");

    if (overlay) {
        overlay.classList.add("active");
    }
}


// ========================================
// CLOSE CART
// ========================================

function closeCart() {

    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("overlay");

    if (drawer) {
        drawer.classList.remove("active");
    }

    if (overlay) {
        overlay.classList.remove("active");
    }
}


// ========================================
// CART EVENTS
// ========================================

function initCart() {

    const cartBtn = document.getElementById("cartBtn");
    const closeBtn = document.getElementById("closeCart");
    const overlay = document.getElementById("overlay");

    if (cartBtn) {
        cartBtn.addEventListener("click", openCart);
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", closeCart);
    }

    if (overlay) {
        overlay.addEventListener("click", closeCart);
    }

    renderCart();
}


// ========================================
// PRODUCT CARD
// ========================================

function productCard(product) {

    const discount = Math.round(
        ((product.oldPrice - product.price) /
            product.oldPrice) * 100
    );

    return `

        <article class="product-card">

            <a
                href="product.html?id=${product.id}"
                class="product-image"
            >

                <span class="product-badge">
                    -${discount}%
                </span>

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

            </a>

            <div class="product-info">

                <a href="product.html?id=${product.id}">

                    <h3>
                        ${product.name}
                    </h3>

                </a>

                <p class="product-desc">
                    ${product.description}
                </p>

                <div class="product-price">

                    <span class="price">
                        ${product.price} DH
                    </span>

                    <span class="old-price">
                        ${product.oldPrice} DH
                    </span>

                </div>

                <button
                    class="add-btn"
                    onclick="
                        event.preventDefault();
                        event.stopPropagation();
                        addToCart(${product.id});
                    "
                >
                    Ajouter au panier
                </button>

            </div>

        </article>

    `;
}


// ========================================
// HOME PRODUCTS
// ========================================

function initHomeProducts() {

    const grid = document.getElementById("productsGrid");

    if (!grid) return;

    function render(category = "all") {

        let result = products;

        if (category !== "all") {

            result = products.filter(
                product =>
                    product.category === category
            );

        }

        grid.innerHTML = result
            .map(productCard)
            .join("");
    }

    render();

    const filters =
        document.querySelectorAll(".filter");

    filters.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                filters.forEach(
                    b => b.classList.remove("active")
                );

                button.classList.add("active");

                render(
                    button.dataset.category
                );

            }
        );

    });
}


// ========================================
// CATEGORY PAGE
// ========================================

function initCategoryPage() {

    const grid =
        document.getElementById("productsGrid");

    if (!grid) return;

    const params =
        new URLSearchParams(
            window.location.search
        );

    const category =
        params.get("cat") || "femme";

    const categoryNames = {
        femme: "Femme",
        homme: "Homme",
        accessoires: "Accessoires"
    };

    const descriptions = {
        femme:
            "Découvrez notre sélection élégante pour femme.",

        homme:
            "Découvrez notre sélection moderne pour homme.",

        accessoires:
            "Complétez votre style avec nos accessoires."
    };

    
    const categoryHero = document.querySelector(".category-hero");

    const categoryImages = {
        femme: "./image/woman-fash.jpg",
        homme: "./image/man-fash.jpg",
        accessoires: "./image/accessoires.jpg"
    };

    if (categoryHero && categoryImages[category]) {
        categoryHero.style.backgroundImage = `
            linear-gradient(rgba(0,0,0,.42), rgba(0,0,0,.42)),
            url("${categoryImages[category]}")
        `;
    }


    const title =
        document.getElementById("categoryTitle");

    const description =
        document.getElementById(
            "categoryDescription"
        );

    if (title) {
        title.textContent =
            categoryNames[category] || "Collection";
    }

    if (description) {
        description.textContent =
            descriptions[category] || "";
    }

    let categoryProducts =
        products.filter(
            product =>
                product.category === category
        );

    function render(list) {

        grid.innerHTML =
            list.map(productCard).join("");

        const count =
            document.getElementById(
                "productsCount"
            );

        if (count) {

            count.textContent =
                `${list.length} produits`;

        }
    }

    render(categoryProducts);

    const sort =
        document.getElementById(
            "sortProducts"
        );

    if (sort) {

        sort.addEventListener(
            "change",
            () => {

                let sorted =
                    [...categoryProducts];

                if (
                    sort.value === "price-low"
                ) {

                    sorted.sort(
                        (a, b) =>
                            a.price - b.price
                    );

                }

                if (
                    sort.value === "price-high"
                ) {

                    sorted.sort(
                        (a, b) =>
                            b.price - a.price
                    );

                }

                if (
                    sort.value === "name"
                ) {

                    sorted.sort(
                        (a, b) =>
                            a.name.localeCompare(
                                b.name
                            )
                    );

                }

                render(sorted);

            }
        );

    }
}


// ========================================
// PRODUCT PAGE
// ========================================

function initProductPage() {

    const image =
        document.getElementById(
            "productImage"
        );

    if (!image) return;

    const params =
        new URLSearchParams(
            window.location.search
        );

    const id =
        Number(params.get("id"));

    const product =
        products.find(
            p => p.id === id
        );

    if (!product) {

        const main =
            document.querySelector("main");

        if (main) {

            main.innerHTML = `

                <section class="section">

                    <h1>
                        Produit introuvable
                    </h1>

                    <br>

                    <a
                        href="index.html"
                        class="primary-btn"
                    >
                        Retour à l'accueil
                    </a>

                </section>

            `;

        }

        return;
    }

    document.title =
        `${product.name} — Maison Élégance`;

    image.src =
        product.image;

    image.alt =
        product.name;

    const name =
        document.getElementById(
            "productName"
        );

    const price =
        document.getElementById(
            "productPrice"
        );

    const oldPrice =
        document.getElementById(
            "productOldPrice"
        );

    const description =
        document.getElementById(
            "productDescription"
        );

    const fullDescription =
        document.getElementById(
            "productFullDescription"
        );

    const category =
        document.getElementById(
            "productCategory"
        );

    if (name) {
        name.textContent =
            product.name;
    }

    if (price) {
        price.textContent =
            `${product.price} DH`;
    }

    if (oldPrice) {
        oldPrice.textContent =
            `${product.oldPrice} DH`;
    }

    if (description) {
        description.textContent =
            product.description;
    }

    if (fullDescription) {
        fullDescription.textContent =
            product.fullDescription;
    }

    if (category) {
        category.textContent =
            product.category.toUpperCase();
    }

    // Quantity

    let quantity = 1;

    const quantityElement =
        document.getElementById(
            "quantity"
        );

    const plus =
        document.getElementById("plus");

    const minus =
        document.getElementById("minus");

    if (plus) {

        plus.addEventListener(
            "click",
            () => {

                quantity++;

                quantityElement.textContent =
                    quantity;

            }
        );

    }

    if (minus) {

        minus.addEventListener(
            "click",
            () => {

                if (quantity > 1) {

                    quantity--;

                    quantityElement.textContent =
                        quantity;

                }

            }
        );

    }

    // Add to cart

    const addButton =
        document.getElementById(
            "addProductBtn"
        );

    if (addButton) {

        addButton.addEventListener(
            "click",
            () => {

                addToCart(
                    product.id,
                    quantity
                );

            }
        );

    }

    // Buy now

    const buyButton =
        document.getElementById(
            "buyNowBtn"
        );

    if (buyButton) {

        buyButton.addEventListener(
            "click",
            () => {

                addToCart(
                    product.id,
                    quantity
                );

            }
        );

    }

    // Related products

    const related =
        products
            .filter(
                p =>
                    p.category ===
                        product.category &&
                    p.id !== product.id
            )
            .slice(0, 4);

    const relatedContainer =
        document.getElementById(
            "relatedProducts"
        );

    if (relatedContainer) {

        relatedContainer.innerHTML =
            related
                .map(productCard)
                .join("");

    }
}


// ========================================
// SEARCH
// ========================================

function initSearch() {

    const searchBtn =
        document.getElementById(
            "searchBtn"
        );

    const searchBox =
        document.getElementById(
            "searchBox"
        );

    const searchInput =
        document.getElementById(
            "searchInput"
        );

    const searchResults =
        document.getElementById(
            "searchResults"
        );

    if (
        !searchBtn ||
        !searchBox ||
        !searchInput
    ) {
        return;
    }

    searchBtn.addEventListener(
        "click",
        () => {

            searchBox.classList.toggle(
                "active"
            );

            if (
                searchBox.classList.contains(
                    "active"
                )
            ) {

                searchInput.focus();

            }

        }
    );

    searchInput.addEventListener(
        "input",
        () => {

            const query =
                searchInput.value
                    .trim()
                    .toLowerCase();

            if (!searchResults) return;

            if (!query) {

                searchResults.innerHTML =
                    "";

                return;

            }

            const results =
                products.filter(
                    product =>

                        product.name
                            .toLowerCase()
                            .includes(query) ||

                        product.description
                            .toLowerCase()
                            .includes(query) ||

                        product.category
                            .toLowerCase()
                            .includes(query)
                );

            if (
                results.length === 0
            ) {

                searchResults.innerHTML = `

                    <div class="search-empty">
                        Aucun produit trouvé.
                    </div>

                `;

                return;

            }

            searchResults.innerHTML =
                results
                    .slice(0, 6)
                    .map(
                        product => `

                            <a
                                href="product.html?id=${product.id}"
                                class="search-result"
                            >

                                <img
                                    src="${product.image}"
                                    alt="${product.name}"
                                >

                                <div>

                                    <strong>
                                        ${product.name}
                                    </strong>

                                    <span>
                                        ${product.price} DH
                                    </span>

                                </div>

                            </a>

                        `
                    )
                    .join("");

        }
    );
}


// ========================================
// MOBILE MENU
// ========================================

function initMobileMenu() {

    const menuBtn =
        document.getElementById(
            "menuBtn"
        );

    const closeMenu =
        document.getElementById(
            "closeMenu"
        );

    const menu =
        document.getElementById(
            "mobileMenu"
        );

    if (!menuBtn || !menu) return;

    menuBtn.addEventListener(
        "click",
        () => {

            menu.classList.add(
                "active"
            );

        }
    );

    if (closeMenu) {

        closeMenu.addEventListener(
            "click",
            () => {

                menu.classList.remove(
                    "active"
                );

            }
        );

    }

}


// ========================================
// FAQ
// ========================================

function initFAQ() {

    const questions =
        document.querySelectorAll(
            ".faq-question"
        );

    questions.forEach(
        question => {

            question.addEventListener(
                "click",
                () => {

                    const item =
                        question.closest(
                            ".faq-item"
                        );

                    item.classList.toggle(
                        "active"
                    );

                }
            );

        }
    );
}


// ========================================
// CHECKOUT
// ========================================

function initCheckout() {

    const checkoutBtn =
        document.getElementById(
            "checkoutBtn"
        );

    const modal =
        document.getElementById(
            "checkoutModal"
        );

    const close =
        document.getElementById(
            "closeCheckout"
        );

    if (!checkoutBtn || !modal) return;

    checkoutBtn.addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                alert(
                    "Votre panier est vide."
                );

                return;

            }

            modal.classList.add(
                "active"
            );

        }
    );

    if (close) {

        close.addEventListener(
            "click",
            () => {

                modal.classList.remove(
                    "active"
                );

            }
        );

    }

    const form =
        document.getElementById(
            "checkoutForm"
        );

    if (form) {

        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const name =
                    document.getElementById(
                        "customerName"
                    ).value;

                const phone =
                    document.getElementById(
                        "customerPhone"
                    ).value;

                const city =
                    document.getElementById(
                        "customerCity"
                    ).value;

                const address =
                    document.getElementById(
                        "customerAddress"
                    ).value;

                let message =
                    `Bonjour, je souhaite commander :%0A%0A`;

                cart.forEach(item => {

                    const product =
                        products.find(
                            p => p.id === item.id
                        );

                    if (!product) return;

                    message +=
                        `• ${product.name} x${item.quantity} = ${product.price * item.quantity} DH%0A`;

                });

                const total =
                    cart.reduce(
                        (sum, item) => {

                            const product =
                                products.find(
                                    p => p.id === item.id
                                );

                            return sum +
                                product.price *
                                item.quantity;

                        },
                        0
                    );

                message +=
                    `%0ATotal : ${total} DH`;

                message +=
                    `%0A%0ANom : ${name}`;

                message +=
                    `%0ATéléphone : ${phone}`;

                message +=
                    `%0AVille : ${city}`;

                message +=
                    `%0AAdresse : ${address}`;

                // CHANGE THIS NUMBER
                const whatsappNumber =
                    "212600000000";

                window.open(
                    `https://wa.me/${whatsappNumber}?text=${message}`,
                    "_blank"
                );

            }
        );

    }
}


// ========================================
// NEWSLETTER
// ========================================

function initNewsletter() {

    const form =
        document.getElementById(
            "newsletterForm"
        );

    if (!form) return;

    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            alert(
                "Merci ! Vous êtes maintenant inscrit."
            );

            form.reset();

        }
    );
}


// ========================================
// START
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initHomeProducts();

        initCategoryPage();

        initProductPage();

        initSearch();

        initMobileMenu();

        initCart();

        initFAQ();

        initCheckout();

        initNewsletter();

    }
);