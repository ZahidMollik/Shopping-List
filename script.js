const itemForm=document.querySelector('#item-form');
const itemInput=document.querySelector('#item-input');
const itemList=document.querySelector('#item-list');
const clearall=document.querySelector('#clear');
const itemFilter=document.querySelector('#filter');

function displayItem(){
    let itemFromStorage=getItemFromStorage();
    itemFromStorage.forEach((item)=>addToDOM(item));
    checkUI();
}

function addItem(e){
    e.preventDefault();
    const newItem=itemInput.value;

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
    const button=createButton('remove-item btn-link text-red-600');
    li.appendChild(button);
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

function createButton(classes){
    const btn=document.createElement('button');
    btn.className=classes;
    const icon=createIcon('fa-solid fa-xmark');
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
}

itemForm.addEventListener('submit',addItem)
itemList.addEventListener('click',onClickItem);
clearall.addEventListener('click',clearItems);
itemFilter.addEventListener('input',filterItem);
document.addEventListener('DOMContentLoaded',displayItem);

checkUI();