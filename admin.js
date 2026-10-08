// ======================================================
// SAHASRA HOME FOODS - ADMIN PANEL
// Supabase + Automatic Product Image Upload
// ======================================================

const SUPABASE_URL =
  'https://tnfhlhpjcrsxfvywmstq.supabase.co';

const SUPABASE_KEY =
  'sb_publishable_1aczz9JfP7jpRUJ7sW5SXg_FwdxnL3S';

const IMAGE_BUCKET = 'product-images';

const db = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

let items = [];
let categories = [];
let editId = null;

const $ = (selector) => document.querySelector(selector);


// ======================================================
// IMAGE UPLOAD UI
// ======================================================

function setupImageUpload() {
  const imageInput = $('#image');

  if (!imageInput) {
    console.warn('Image URL input #image not found.');
    return;
  }

  // Prevent creating the file input more than once
  if ($('#imageFile')) {
    return;
  }

  const wrapper = document.createElement('div');

  wrapper.style.marginTop = '10px';

  wrapper.innerHTML = `
    <label
      for="imageFile"
      style="
        display:block;
        margin-bottom:6px;
        font-weight:600;
      "
    >
      Or Upload Product Image
    </label>

    <input
      type="file"
      id="imageFile"
      accept="image/*"
      style="
        width:100%;
        padding:8px;
        border:1px solid #ddd;
        border-radius:8px;
        background:#fff;
      "
    >

    <div
      id="imagePreview"
      style="
        margin-top:10px;
        display:none;
      "
    >
      <img
        id="imagePreviewImg"
        src=""
        alt="Product preview"
        style="
          width:140px;
          height:105px;
          object-fit:cover;
          border-radius:10px;
          border:1px solid #ddd;
        "
      >
    </div>

    <small
      style="
        display:block;
        margin-top:5px;
        color:#777;
      "
    >
      JPG, PNG, WEBP up to 5 MB
    </small>
  `;

  imageInput.parentNode.insertBefore(
    wrapper,
    imageInput.nextSibling
  );

  $('#imageFile').addEventListener(
    'change',
    previewSelectedImage
  );
}


// ======================================================
// IMAGE PREVIEW
// ======================================================

function previewSelectedImage() {
  const fileInput = $('#imageFile');
  const preview = $('#imagePreview');
  const previewImg = $('#imagePreviewImg');

  if (!fileInput || !fileInput.files.length) {
    if (preview) {
      preview.style.display = 'none';
    }
    return;
  }

  const file = fileInput.files[0];

  if (!file.type.startsWith('image/')) {
    alert('Please select an image file.');
    fileInput.value = '';
    preview.style.display = 'none';
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert('Image size must be less than 5 MB.');
    fileInput.value = '';
    preview.style.display = 'none';
    return;
  }

  const reader = new FileReader();

  reader.onload = function (event) {
    previewImg.src = event.target.result;
    preview.style.display = 'block';
  };

  reader.readAsDataURL(file);
}


// ======================================================
// UPLOAD IMAGE TO SUPABASE STORAGE
// ======================================================

async function uploadProductImage(file) {
  if (!file) {
    return null;
  }

  if (!file.type.startsWith('image/')) {
    throw new Error('Selected file is not an image.');
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error('Image size must be less than 5 MB.');
  }

  const extension =
    file.name.split('.').pop().toLowerCase();

  const safeExtension =
    extension.replace(/[^a-z0-9]/gi, '');

  const uniqueName =
    'product-' +
    Date.now() +
    '-' +
    Math.random()
      .toString(36)
      .substring(2, 10) +
    '.' +
    safeExtension;

  console.log(
    'Uploading image:',
    uniqueName
  );

  const {
    error: uploadError
  } = await db.storage
    .from(IMAGE_BUCKET)
    .upload(
      uniqueName,
      file,
      {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type
      }
    );

  if (uploadError) {
    console.error(
      'Image upload error:',
      uploadError
    );

    throw uploadError;
  }

  const {
    data: publicData
  } = db.storage
    .from(IMAGE_BUCKET)
    .getPublicUrl(uniqueName);

  if (!publicData || !publicData.publicUrl) {
    throw new Error(
      'Could not generate public image URL.'
    );
  }

  console.log(
    'Image uploaded:',
    publicData.publicUrl
  );

  return publicData.publicUrl;
}


// ======================================================
// LOAD DATA
// ======================================================

async function loadData() {
  try {
    $('#storageState').textContent =
      'Loading...';

    // Load categories
    const {
      data: categoryData,
      error: categoryError
    } = await db
      .from('categories')
      .select('*')
      .order(
        'sort_order',
        { ascending: true }
      );

    if (categoryError) {
      throw categoryError;
    }

    categories = categoryData || [];


    // Load products
    const {
      data: productData,
      error: productError
    } = await db
      .from('products')
      .select(`
        *,
        categories (
          name_en
        )
      `)
      .order(
        'sort_order',
        { ascending: true }
      );

    if (productError) {
      throw productError;
    }

    items = productData || [];

    console.log(
      'Categories loaded:',
      categories.length
    );

    console.log(
      'Products loaded:',
      items.length
    );

    render();

    $('#storageState').textContent =
      'Supabase Connected';

  } catch (error) {
    console.error(
      'Supabase error:',
      error
    );

    $('#storageState').textContent =
      'Error';

    alert(
      'Could not connect to Supabase.\n\n' +
      error.message
    );
  }
}


// ======================================================
// RENDER
// ======================================================

function render() {
  $('#itemCount').textContent =
    items.length;

  $('#catCount').textContent =
    categories.length;


  // Category dropdown
  $('#category').innerHTML =
    categories
      .map(category => `
        <option value="${category.id}">
          ${esc(category.name_en)}
        </option>
      `)
      .join('');


  // Search
  const q =
    ($('#filter').value || '')
      .toLowerCase();


  const list =
    items.filter(item => {

      const categoryName =
        item.categories?.name_en || '';

      return `
        ${item.name_en || ''}
        ${item.name_te || ''}
        ${categoryName}
      `
        .toLowerCase()
        .includes(q);
    });


  // Table
  $('#rows').innerHTML =
    list
      .map(item => {

        const image =
          item.image_url ||
          'https://placehold.co/160x120/f5efe3/6b2f25?text=Sahasra';

        const category =
          item.categories?.name_en || '';

        return `
          <tr>

            <td>
              <img
                class="item-img"
                src="${esc(image)}"
                onerror="
                  this.src='https://placehold.co/160x120/f5efe3/6b2f25?text=Sahasra'
                "
                alt=""
              >
            </td>

            <td>
              <b>
                ${esc(item.name_en || '')}
              </b>
            </td>

            <td>
              ${esc(item.name_te || '')}
            </td>

            <td>
              ${esc(category)}
            </td>

            <td>
              ${esc(item.unit || '')}
            </td>

            <td>
              ${
                item.price == null
                  ? '—'
                  : '₹' +
                    Number(item.price)
                      .toLocaleString('en-IN')
              }
            </td>

            <td>

              <button
                class="small-btn ghost"
                onclick="editItem(${item.id})"
              >
                Edit
              </button>

              <button
                class="small-btn danger"
                onclick="deleteItem(${item.id})"
              >
                Delete
              </button>

            </td>

          </tr>
        `;
      })
      .join('');


  $('#itemEmpty')
    .classList
    .toggle(
      'hidden',
      list.length > 0
    );


  // Category list
  $('#categoryList').innerHTML =
    categories
      .map(category => `
        <div class="cat">

          <span>
            ${esc(category.name_en)}
          </span>

          <button
            title="Delete category"
            onclick="deleteCategory(${category.id})"
          >
            ×
          </button>

        </div>
      `)
      .join('');
}


// ======================================================
// ESCAPE HTML
// ======================================================

function esc(value = '') {
  return String(value).replace(
    /[&<>'"]/g,
    c => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[c])
  );
}


// ======================================================
// RESET FORM
// ======================================================

function reset() {
  editId = null;

  $('#formTitle').textContent =
    'Add New Item';

  $('#saveItem').textContent =
    'Add Item';

  $('#en').value = '';
  $('#te').value = '';
  $('#unit').value = '';
  $('#price').value = '';
  $('#image').value = '';

  if ($('#imageFile')) {
    $('#imageFile').value = '';
  }

  if ($('#imagePreview')) {
    $('#imagePreview').style.display =
      'none';
  }
}


// ======================================================
// EDIT ITEM
// ======================================================

window.editItem = function (id) {

  const item =
    items.find(
      x => x.id === id
    );

  if (!item) {
    return;
  }

  editId = id;

  $('#formTitle').textContent =
    'Edit Item';

  $('#saveItem').textContent =
    'Save Changes';

  $('#en').value =
    item.name_en || '';

  $('#te').value =
    item.name_te || '';

  $('#category').value =
    item.category_id;

  $('#unit').value =
    item.unit || '';

  $('#price').value =
    item.price ?? '';

  $('#image').value =
    item.image_url || '';


  // Show existing image
  if (
    item.image_url &&
    $('#imagePreview') &&
    $('#imagePreviewImg')
  ) {

    $('#imagePreviewImg').src =
      item.image_url;

    $('#imagePreview').style.display =
      'block';
  }


  if ($('#imageFile')) {
    $('#imageFile').value = '';
  }


  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};


// ======================================================
// DELETE ITEM
// ======================================================

window.deleteItem =
  async function (id) {

    const item =
      items.find(
        x => x.id === id
      );

    if (!item) {
      return;
    }

    if (
      !confirm(
        `Delete ${item.name_en}?`
      )
    ) {
      return;
    }


    const {
      error
    } = await db
      .from('products')
      .delete()
      .eq('id', id);


    if (error) {

      alert(
        'Delete failed:\n' +
        error.message
      );

      return;
    }


    await loadData();
  };


// ======================================================
// DELETE CATEGORY
// ======================================================

window.deleteCategory =
  async function (id) {

    const category =
      categories.find(
        x => x.id === id
      );

    if (!category) {
      return;
    }


    const used =
      items.some(
        item =>
          item.category_id === id
      );


    if (used) {

      alert(
        'This category still has items. ' +
        'Move or delete those items first.'
      );

      return;
    }


    if (
      !confirm(
        `Delete category "${category.name_en}"?`
      )
    ) {
      return;
    }


    const {
      error
    } = await db
      .from('categories')
      .delete()
      .eq('id', id);


    if (error) {

      alert(
        'Delete failed:\n' +
        error.message
      );

      return;
    }


    await loadData();
  };


// ======================================================
// SAVE / UPDATE ITEM
// ======================================================

$('#saveItem').onclick =
  async function () {

    const nameEn =
      $('#en').value.trim();

    const nameTe =
      $('#te').value.trim();

    const categoryId =
      Number(
        $('#category').value
      );

    const unit =
      $('#unit').value.trim();

    const priceValue =
      $('#price').value;

    const manualImage =
      $('#image').value.trim();


    // Validation
    if (!nameEn || !nameTe) {

      alert(
        'Please enter both English and Telugu names.'
      );

      return;
    }


    // Convert price
    let price = null;

    if (
      priceValue !== '' &&
      priceValue !== null
    ) {

      price =
        Number(priceValue);

      if (
        Number.isNaN(price)
      ) {

        alert(
          'Please enter a valid price.'
        );

        return;
      }
    }


    // ==================================================
    // IMAGE UPLOAD
    // ==================================================

    let imageUrl =
      manualImage || null;

    const imageFile =
      $('#imageFile')?.files?.[0];


    if (imageFile) {

      try {

        $('#saveItem').disabled =
          true;

        $('#saveItem').textContent =
          'Uploading Image...';


        imageUrl =
          await uploadProductImage(
            imageFile
          );


        // Put generated URL into image URL field
        $('#image').value =
          imageUrl;


      } catch (uploadError) {

        console.error(
          'Upload failed:',
          uploadError
        );

        alert(
          'Image upload failed:\n\n' +
          uploadError.message
        );

        $('#saveItem').disabled =
          false;

        $('#saveItem').textContent =
          editId === null
            ? 'Add Item'
            : 'Save Changes';

        return;

      } finally {

        $('#saveItem').disabled =
          false;
      }
    }


    // ==================================================
    // PRODUCT DATA
    // ==================================================

    const productData = {

      name_en:
        nameEn,

      name_te:
        nameTe,

      category_id:
        categoryId,

      unit:
        unit,

      price:
        price,

      image_url:
        imageUrl,

      is_available:
        true
    };


    console.log(
      'Product data:',
      productData
    );


    try {

      // ==================================================
      // ADD NEW ITEM
      // ==================================================

      if (editId === null) {

        $('#saveItem').disabled =
          true;

        $('#saveItem').textContent =
          'Saving...';


        const {
          error
        } = await db
          .from('products')
          .insert(
            productData
          );


        if (error) {
          throw error;
        }


        alert(
          'Item added successfully!'
        );
      }


      // ==================================================
      // UPDATE EXISTING ITEM
      // ==================================================

      else {

        $('#saveItem').disabled =
          true;

        $('#saveItem').textContent =
          'Saving...';


        const {
          error
        } = await db
          .from('products')
          .update(
            productData
          )
          .eq('id', editId);


        if (error) {
          throw error;
        }


        alert(
          'Item updated successfully!'
        );
      }


      // Clear form
      reset();

      // Reload latest data
      await loadData();


    } catch (error) {

      console.error(
        'Save error:',
        error
      );

      alert(
        'Save failed:\n\n' +
        error.message
      );


    } finally {

      $('#saveItem').disabled =
        false;

      $('#saveItem').textContent =
        editId === null
          ? 'Add Item'
          : 'Save Changes';
    }
  };


// ======================================================
// DUPLICATE ITEM
// ======================================================

$('#duplicateItem').onclick =
  async function () {

    if (editId === null) {

      alert(
        'Open an item with Edit first.'
      );

      return;
    }


    const item =
      items.find(
        x => x.id === editId
      );


    if (!item) {
      return;
    }


    const newItem = {

      name_en:
        item.name_en + ' Copy',

      name_te:
        item.name_te,

      category_id:
        item.category_id,

      unit:
        item.unit,

      price:
        item.price,

      image_url:
        item.image_url,

      description:
        item.description,

      is_available:
        item.is_available,

      sort_order:
        item.sort_order
    };


    const {
      error
    } = await db
      .from('products')
      .insert(
        newItem
      );


    if (error) {

      alert(
        'Duplicate failed:\n' +
        error.message
      );

      return;
    }


    await loadData();
  };


// ======================================================
// RESET FORM BUTTON
// ======================================================

$('#resetForm').onclick =
  reset;


// ======================================================
// SEARCH
// ======================================================

$('#filter').oninput =
  render;


// ======================================================
// ADD CATEGORY
// ======================================================

$('#addCategory').onclick =
  async function () {

    const name =
      $('#newCategory')
        .value
        .trim();


    if (!name) {
      return;
    }


    if (
      categories.some(
        c =>
          c.name_en.toLowerCase() ===
          name.toLowerCase()
      )
    ) {

      alert(
        'That category already exists.'
      );

      return;
    }


    const {
      error
    } = await db
      .from('categories')
      .insert({

        name_en:
          name,

        name_te:
          '',

        sort_order:
          categories.length + 1
      });


    if (error) {

      alert(
        'Category creation failed:\n' +
        error.message
      );

      return;
    }


    $('#newCategory').value =
      '';

    await loadData();
  };


// ======================================================
// VIEW SITE
// ======================================================

$('#viewSite').onclick =
  () => {

    location.href =
      'index.html';
  };


// ======================================================
// LOGOUT
// ======================================================

$('#logout').onclick =
  () => {

    sessionStorage.removeItem(
      'sahasra-admin'
    );

    location.reload();
  };


// ======================================================
// OPEN ADMIN
// ======================================================

function openAdmin() {

  sessionStorage.setItem(
    'sahasra-admin',
    '1'
  );


  $('#login')
    .classList
    .add('hidden');


  $('#app')
    .classList
    .remove('hidden');


  // Setup image upload UI
  setupImageUpload();


  loadData();
}


// ======================================================
// LOGIN
// ======================================================

$('#loginBtn').onclick =
  function () {

    const pin =
      localStorage.getItem(
        'sahasra-admin-pin'
      ) || '1234';


    if (
      $('#pin').value === pin
    ) {

      openAdmin();

    } else {

      alert(
        'Incorrect PIN.'
      );
    }
  };


$('#pin').addEventListener(
  'keydown',
  e => {

    if (
      e.key === 'Enter'
    ) {

      $('#loginBtn').click();
    }
  }
);


// ======================================================
// TABS
// ======================================================

$('.tabs').addEventListener(
  'click',
  e => {

    const button =
      e.target.closest('.tab');


    if (!button) {
      return;
    }


    document
      .querySelectorAll('.tab')
      .forEach(tab => {

        tab.classList.toggle(
          'active',
          tab === button
        );
      });


    document
      .querySelectorAll('.tab-panel')
      .forEach(panel => {

        panel.classList.toggle(
          'hidden',
          panel.id !==
          'tab-' +
          button.dataset.tab
        );
      });
  }
);


// ======================================================
// AUTO LOGIN
// ======================================================

if (
  sessionStorage.getItem(
    'sahasra-admin'
  ) === '1'
) {

  openAdmin();
}