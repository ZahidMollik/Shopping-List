const itemForm=document.querySelector('#item-form');
const itemInput=document.querySelector('#item-input');
const itemList=document.querySelector('#item-list');
const clearall=document.querySelector('#clear');
const itemFilter=document.querySelector('#filter');
const formbtn = itemForm.querySelector("#btn");
let editMode = false;
const editmodecolor="bg-[#d1d5db]";


function addItem(e){
    e.preventDefault();
    const newItem=itemInput.value;
    if(editMode){
      const editItem=document.querySelector('.editmode');
      console.log(editItem.textContent);
      removeItemFromStorage(editItem.textContent);
      editItem.classList.remove('editmode');
      editItem.classList.remove('editmodecolor');
      editItem.remove();
      editMode=false;
   }
    if(newItem===''){
        alert('Please add an item');
        return;
    }
    else{
        if(checkIfItemExist(newItem)){
            alert('That item already exists!');
            return;
        }
    }
    addToDOM(newItem);
    addItemToStorage(newItem);
    checkUI();
    itemInput.value='';
}

function checkIfItemExist(item){
    const itemFromStorage=getItemFromStorage();
    return itemFromStorage.includes(item);
}

function addItemToStorage(item){
    let itemFromStorage=getItemFromStorage();
    //Add new item to array
    itemFromStorage.push(item);
    //convert to JSON String and Set to local storage
    localStorage.setItem('items',JSON.stringify(itemFromStorage));
}

function addToDOM(newItem){
    //create list item
    const li=document.createElement('li');
    li.className='flex justify-between md:w-[45%] w-full border-[1px] border-solid border-[#ccc] rounded-md py-[10px] px-[15px] mx-1 mb-5 font-bold';
    li.appendChild(document.createTextNode(newItem));
    const button1=createButton('remove-item btn-link text-red-600','fa-solid fa-xmark');
    const button2 = createButton('update-item btn-link text-red-600', 'fas fa-edit');
    li.appendChild(button1);
    li.appendChild(button2);
    itemList.appendChild(li);
}

function getItemFromStorage(){
    let itemFromStorage;
    if(localStorage.getItem('items')==null){
        itemFromStorage=[];
    }
    else{
        itemFromStorage=JSON.parse(localStorage.getItem('items'));
    }
    return itemFromStorage;
}

function createButton(classes,iconName){
    const btn=document.createElement('button');
    btn.className=classes;
    const icon=createIcon(iconName);
    btn.appendChild(icon);
    return btn;
}

function createIcon(classes){
    const icon=document.createElement('i');
    icon.className=classes;
    return icon;
}

function onClickItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement);
    }
    else if(e.target.parentElement.classList.contains('update-item')){
      updateItem(e.target.parentElement.parentElement);
  }
}

function updateItem(item) {
  editMode = true;
  itemList.querySelectorAll('li').forEach((i)=>i.classList.remove(editmodecolor));
  item.classList.add(editmodecolor);
  item.classList.add('editmode');
  formbtn.innerHTML = '<i class="fa-solid fa-plus"></i> Update Item';
  formbtn.className = "bg-[#22c55e] border-none rounded-md py-[5px] px-2 cursor-pointer";
  itemInput.value=item.textContent;
}

function removeItem(item){
    item.remove();

    removeItemFromStorage(item.textContent);

    checkUI();
}

function removeItemFromStorage(item){
    let itemFromStorage=getItemFromStorage();
    console.log(itemFromStorage);

    itemFromStorage=itemFromStorage.filter((i) => i !== item)
    localStorage.setItem('items',JSON.stringify(itemFromStorage));
}

function clearItems(e){
    while (itemList.firstChild) {
        itemList.firstChild.remove();
    }
    localStorage.removeItem('items');
    checkUI();
}

function filterItem(e){
    const items=itemList.querySelectorAll('li');
    const text=e.target.value.toLowerCase();
    items.forEach((item)=>{
        const itemName=item.firstChild.textContent.toLowerCase();

        console.log(itemName);
        if(itemName.indexOf(text)!=-1){
            item.style.display='flex';
        }
        else{
            item.style.display='none';
        }
    });
}

function displayItem(){
  let itemFromStorage=getItemFromStorage();
  itemFromStorage.forEach((item)=>addToDOM(item));
  checkUI();
}

function checkUI(){
    const items=itemList.querySelectorAll('li');
    if(items.length===0){
        clearall.style.display='none';
        itemFilter.style.display='none';
    }
    else{
        clearall.style.display='block';
        itemFilter.style.display='block';
    }
    formbtn.innerHTML='<i class="fa-solid fa-plus"></i> Add Item';
    formbtn.classList.remove('bg-[#22c55e]');
    formbtn.classList.add('bg-[#333]');
    formbtn.classList.add('text-[#fff]');
}

itemForm.addEventListener('submit',addItem)
itemList.addEventListener('click',onClickItem);
clearall.addEventListener('click',clearItems);
itemFilter.addEventListener('input',filterItem);
document.addEventListener('DOMContentLoaded',displayItem);

checkUI();