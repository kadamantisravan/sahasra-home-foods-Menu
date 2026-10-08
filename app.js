// ============================================
// SAHASRA HOME FOODS
// Customer Menu - Supabase Version
// ============================================


// ============================================
// SUPABASE CONFIGURATION
// ============================================

const SUPABASE_URL = 'https://tnfhlhpjcrsxfvywmstq.supabase.co';

const SUPABASE_KEY =
    'sb_publishable_1aczz9JfP7jpRUJ7sW5SXg_FwdxnL3S';

const { createClient } = supabase;

const db = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ============================================
// DOM ELEMENTS
// ============================================

const menu = document.querySelector('#menu');
const search = document.querySelector('#search');
const chips = document.querySelector('#chips');
const count = document.querySelector('#count');
const empty = document.querySelector('#empty');
const clearSearch = document.querySelector('#clearSearch');


// ============================================
// GLOBAL DATA
// ============================================

let sourceItems = [];
let active = 'All';


// ============================================
// CATEGORY EMOJIS
// ============================================

const categoryEmoji = {
    'Traditional Sweets': '🍬',
    'Laddu & Special Sweets': '🍥',
    'Milk Sweets': '🥛',
    'Pickles': '🥭',
    'Karam Podi & Masalas': '🌶️',
    'Hot Items & Snacks': '🥨'
};


// ============================================
// IMAGE PLACEHOLDER
// ============================================

const placeholderImage =
    'https://placehold.co/900x760/f5efe3/6b2f25?text=Sahasra+Home+Foods';


// ============================================
// LOAD PRODUCTS FROM SUPABASE
// ============================================

async function loadMenu() {

    try {

        menu.innerHTML = `
            <div class="menu-loading">
                <div>Loading our homemade menu...</div>
            </div>
        `;


        const { data, error } = await db
            .from('products')
            .select(`
                id,
                name_en,
                name_te,
                unit,
                price,
                image_url,
                description,
                is_available,
                sort_order,
                categories (
                    name_en
                )
            `)
            .eq('is_available', true)
            .order('sort_order', {
                ascending: true
            });


        if (error) {

            console.error(
                'Supabase product loading error:',
                error
            );

            throw error;
        }


        sourceItems = data.map(item => ({

            id: item.id,

            en: item.name_en,

            te: item.name_te,

            unit: item.unit,

            price: item.price,

            image: item.image_url,

            description: item.description,

            category:
                item.categories?.name_en || '',

            sort_order:
                item.sort_order

        }));


        console.log(
            `Loaded ${sourceItems.length} products from Supabase`
        );


        setupCategories();

        render();


    } catch (error) {

        console.error(
            'Failed to load menu:',
            error
        );


        menu.innerHTML = `
            <div
                style="
                    text-align:center;
                    padding:50px 20px;
                "
            >
                <div style="font-size:42px;">
                    ⚠️
                </div>

                <h3>
                    Unable to load menu
                </h3>

                <p>
                    Please refresh the page and try again.
                </p>

                <button
                    onclick="loadMenu()"
                    style="
                        margin-top:15px;
                        padding:10px 20px;
                        border:0;
                        border-radius:10px;
                        cursor:pointer;
                    "
                >
                    Try Again
                </button>
            </div>
        `;
    }
}


// ============================================
// SETUP CATEGORY BUTTONS
// ============================================

function setupCategories() {

    const categories = [
        'All',
        ...new Set(
            sourceItems.map(
                item => item.category
            )
        )
    ];


    chips.innerHTML =
        categories.map(category => {

            const emoji =
                category === 'All'
                    ? '✨'
                    : (
                        categoryEmoji[category]
                        || '🍽️'
                    );


            return `
                <button
                    class="chip ${
                        category === 'All'
                            ? 'active'
                            : ''
                    }"
                    data-cat="${category}"
                    role="tab"
                    type="button"
                >
                    ${emoji} ${category}
                </button>
            `;

        }).join('');
}


// ============================================
// CATEGORY CLICK
// ============================================

chips.addEventListener('click', event => {

    const button =
        event.target.closest('.chip');


    if (!button) {
        return;
    }


    active =
        button.dataset.cat;


    document
        .querySelectorAll('.chip')
        .forEach(chip => {

            chip.classList.toggle(
                'active',
                chip === button
            );

        });


    render();
});


// ============================================
// SEARCH
// ============================================

search.addEventListener(
    'input',
    () => {

        clearSearch.style.display =
            search.value
                ? 'block'
                : 'none';


        render();

    }
);


// ============================================
// CLEAR SEARCH
// ============================================

clearSearch.addEventListener(
    'click',
    () => {

        search.value = '';

        clearSearch.style.display =
            'none';

        search.focus();

        render();

    }
);


// ============================================
// PRICE FORMAT
// ============================================

function money(value) {

    if (
        value === null ||
        value === undefined ||
        value === ''
    ) {
        return 'Price on request';
    }


    return `₹${Number(value).toLocaleString('en-IN')}`;
}


// ============================================
// IMAGE URL
// ============================================

function getImageUrl(item) {

    if (
        item.image &&
        item.image.trim() !== ''
    ) {
        return item.image;
    }


    return placeholderImage;
}


// ============================================
// RENDER MENU
// ============================================

function render() {

    const query =
        search.value
            .trim()
            .toLowerCase();


    const list =
        sourceItems
            .map((item, index) => ({
                ...item,
                index
            }))
            .filter(item => {


                // Category filter

                const matchesCategory =
                    active === 'All' ||
                    item.category === active;


                // Search filter

                const searchableText =
                    `
                    ${item.en || ''}
                    ${item.te || ''}
                    ${item.category || ''}
                    `
                    .toLowerCase();


                const matchesSearch =
                    !query ||
                    searchableText.includes(
                        query
                    );


                return (
                    matchesCategory &&
                    matchesSearch
                );

            });


    // Update count

    count.textContent =
        list.length;


    // Empty state

    empty.classList.toggle(
        'hidden',
        list.length > 0
    );


    // No results

    if (list.length === 0) {

        menu.innerHTML = '';

        return;
    }


    // Render cards

    menu.innerHTML =
        list.map(item => {


            const image =
                getImageUrl(item);


            const emoji =
                categoryEmoji[
                    item.category
                ] || '🍽️';


            return `

                <article class="card">

                    <!-- IMAGE -->

                    <div class="photo-wrap">

                        <img
                            class="photo"
                            src="${image}"
                            alt="${escapeHtml(
                                item.en
                            )} — ${escapeHtml(
                                item.te
                            )}"
                            loading="lazy"
                            onerror="
                                this.onerror=null;
                                this.src='${placeholderImage}';
                            "
                        >

                        <div
                            class="photo-shade"
                        ></div>

                        <span
                            class="number"
                        >
                            #${item.index + 1}
                        </span>

                    </div>


                    <!-- CARD BODY -->

                    <div class="card-body">


                        <!-- CATEGORY -->

                        <div class="tag">

                            ${emoji}

                            ${escapeHtml(
                                item.category
                            )}

                        </div>


                        <!-- TELUGU NAME -->

                        <div class="name-te">

                            ${escapeHtml(
                                item.te
                            )}

                        </div>


                        <!-- ENGLISH NAME -->

                        <div class="name-en">

                            ${escapeHtml(
                                item.en
                            )}

                        </div>


                        ${
                            item.description
                                ? `
                                    <div
                                        class="description"
                                    >
                                        ${escapeHtml(
                                            item.description
                                        )}
                                    </div>
                                  `
                                : ''
                        }


                        <!-- PRICE + RATING -->

                        <div class="bottom">


                            <!-- PRICE -->

                            <div>

                                <div
                                    class="price"
                                >
                                    ${money(
                                        item.price
                                    )}
                                </div>


                                <div
                                    class="unit"
                                >
                                    ${
                                        item.unit ||
                                        'Serving'
                                    }
                                </div>

                            </div>


                            <!-- RATING -->

                            <div
                                class="rating"
                                aria-label="Rate ${
                                    item.en
                                }"
                            >

                                ${[1, 2, 3, 4, 5]
                                    .map(
                                        number => `
                                            <button
                                                class="star"
                                                type="button"
                                                data-rate="${number}"
                                                data-id="${item.id}"
                                                aria-label="${number} stars"
                                            >
                                                ★
                                            </button>
                                        `
                                    )
                                    .join('')}

                            </div>

                        </div>

                    </div>

                </article>

            `;

        }).join('');


    applyRatings();
}


// ============================================
// ESCAPE HTML
// ============================================

function escapeHtml(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return '';
    }


    return String(value)
        .replace(
            /&/g,
            '&amp;'
        )
        .replace(
            /</g,
            '&lt;'
        )
        .replace(
            />/g,
            '&gt;'
        )
        .replace(
            /"/g,
            '&quot;'
        )
        .replace(
            /'/g,
            '&#039;'
        );
}


// ============================================
// APPLY SAVED RATINGS
// ============================================

function applyRatings() {

    document
        .querySelectorAll('.rating')
        .forEach(rating => {


            const id =
                rating
                    .querySelector('.star')
                    ?.dataset.id;


            const value =
                Number(
                    localStorage.getItem(
                        'sahasra-rating-' + id
                    ) || 0
                );


            rating
                .querySelectorAll('.star')
                .forEach(
                    (star, index) => {

                        star.classList.toggle(
                            'on',
                            index < value
                        );

                    }
                );

        });
}


// ============================================
// SAVE RATING
// ============================================

menu.addEventListener(
    'click',
    event => {


        const button =
            event.target.closest('.star');


        if (!button) {
            return;
        }


        const id =
            button.dataset.id;


        const rating =
            button.dataset.rate;


        localStorage.setItem(
            'sahasra-rating-' + id,
            rating
        );


        applyRatings();

    }
);


// ============================================
// START APPLICATION
// ============================================

loadMenu();