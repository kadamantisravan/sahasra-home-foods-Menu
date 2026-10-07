const KEY='sahasra-menu-v1', CATKEY='sahasra-categories-v1', PINKEY='sahasra-admin-pin';
const $=s=>document.querySelector(s);
let items=JSON.parse(localStorage.getItem(KEY)||'null')||MENU_ITEMS.map(x=>({...x}));
let categories=JSON.parse(localStorage.getItem(CATKEY)||'null')||[...new Set(items.map(x=>x.category))];
let editIndex=-1;
const original=MENU_ITEMS.map(x=>({...x}));
function save(){localStorage.setItem(KEY,JSON.stringify(items));localStorage.setItem(CATKEY,JSON.stringify(categories));render();}
function render(){
 $('#itemCount').textContent=items.length; $('#catCount').textContent=categories.length; $('#storageState').textContent='Saved';
 $('#category').innerHTML=categories.map(c=>`<option>${esc(c)}</option>`).join('');
 const q=($('#filter').value||'').toLowerCase(); const list=items.map((x,i)=>({...x,i})).filter(x=>`${x.en} ${x.te} ${x.category}`.toLowerCase().includes(q));
 $('#rows').innerHTML=list.map(x=>`<tr><td><img class="item-img" src="${esc(x.image||'https://loremflickr.com/160/120/indian,food?lock='+(500+x.i))}" onerror="this.src='https://loremflickr.com/160/120/indian,food?lock=999'" alt=""></td><td><b>${esc(x.en)}</b></td><td>${esc(x.te)}</td><td>${esc(x.category)}</td><td>${esc(x.unit||'')}</td><td>${x.price==null?'—':'₹'+Number(x.price).toLocaleString('en-IN')}</td><td><button class="small-btn ghost" onclick="editItem(${x.i})">Edit</button> <button class="small-btn danger" onclick="deleteItem(${x.i})">Delete</button></td></tr>`).join('');
 $('#itemEmpty').classList.toggle('hidden',list.length>0); $('#categoryList').innerHTML=categories.map(c=>`<div class="cat"><span>${esc(c)}</span><button title="Delete category" onclick="deleteCategory(${JSON.stringify(c).replace(/"/g,'&quot;')})">×</button></div>`).join('');
}
function esc(v=''){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function reset(){editIndex=-1;$('#formTitle').textContent='Add New Item';$('#saveItem').textContent='Add Item';['en','te','unit','price','image'].forEach(id=>$('#'+id).value='');}
window.editItem=i=>{const x=items[i];editIndex=i;$('#formTitle').textContent='Edit Item';$('#saveItem').textContent='Save Changes';$('#en').value=x.en||'';$('#te').value=x.te||'';$('#category').value=x.category||categories[0];$('#unit').value=x.unit||'';$('#price').value=x.price??'';$('#image').value=x.image||'';window.scrollTo({top:0,behavior:'smooth'});};
window.deleteItem=i=>{if(confirm(`Delete ${items[i].en}?`)){items.splice(i,1);save();}};
window.deleteCategory=c=>{const used=items.some(x=>x.category===c);if(used){alert('This category still has items. Move or delete those items first.');return}if(confirm(`Delete category “${c}”?`)){categories=categories.filter(x=>x!==c);save();}};
$('#saveItem').onclick=()=>{const x={en:$('#en').value.trim(),te:$('#te').value.trim(),category:$('#category').value,unit:$('#unit').value.trim(),price:$('#price').value===''?null:Number($('#price').value),image:$('#image').value.trim()};if(!x.en||!x.te){alert('Please enter both English and Telugu names.');return}if(editIndex<0)items.push(x);else items[editIndex]=x;save();reset();};
$('#duplicateItem').onclick=()=>{if(editIndex<0){alert('Open an item with Edit first.');return}const x={...items[editIndex],en:items[editIndex].en+' Copy'};items.splice(editIndex+1,0,x);save();editItem(editIndex+1);};
$('#resetForm').onclick=reset;$('#filter').oninput=render;
$('#addCategory').onclick=()=>{const c=$('#newCategory').value.trim();if(!c)return;if(categories.some(x=>x.toLowerCase()===c.toLowerCase())){alert('That category already exists.');return}categories.push(c);$('#newCategory').value='';save();};
$('#exportData').onclick=()=>{const blob=new Blob([JSON.stringify({categories,items},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='sahasra-menu-backup.json';a.click();URL.revokeObjectURL(a.href);};
$('#importData').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);if(!Array.isArray(d.items)||!Array.isArray(d.categories))throw Error();items=d.items;categories=d.categories;save();alert('Backup restored successfully.')}catch{alert('Invalid backup file.')}};r.readAsText(f);};
$('#resetData').onclick=()=>{if(confirm('Reset all menu changes and restore the original menu?')){items=original.map(x=>({...x}));categories=[...new Set(items.map(x=>x.category))];save();reset();}};
$('#changePin').onclick=()=>{const p=$('#newPin').value.trim();if(p.length<4){alert('PIN should be at least 4 characters.');return}localStorage.setItem(PINKEY,p);$('#newPin').value='';alert('PIN changed.');};
$('.tabs').addEventListener('click',e=>{const b=e.target.closest('.tab');if(!b)return;document.querySelectorAll('.tab').forEach(x=>x.classList.toggle('active',x===b));document.querySelectorAll('.tab-panel').forEach(x=>x.classList.toggle('hidden',x.id!=='tab-'+b.dataset.tab));});
$('#viewSite').onclick=()=>location.href='index.html';$('#logout').onclick=()=>{sessionStorage.removeItem('sahasra-admin');location.reload();};
function open(){sessionStorage.setItem('sahasra-admin','1');$('#login').classList.add('hidden');$('#app').classList.remove('hidden');render();}
$('#loginBtn').onclick=()=>{const pin=localStorage.getItem(PINKEY)||'1234';if($('#pin').value===pin)open();else alert('Incorrect PIN.');};$('#pin').addEventListener('keydown',e=>{if(e.key==='Enter')$('#loginBtn').click();});
if(sessionStorage.getItem('sahasra-admin')==='1')open();
