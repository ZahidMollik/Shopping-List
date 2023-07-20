const itemForm=document.querySelector('#item-form');
const itemInput=document.querySelector('#item-input');
const itemList=document.querySelector('#item-list');
const clearall=document.querySelector('#clear');
const itemFilter=document.querySelector('#filter');

function addItem(e){
    e.preventDefault();
    const newItem=itemInput.value;

    if(newItem===''){
        alert('Please add an item');
        return;
    }
    //create list item
    const li=document.createElement('li');
    li.className='flex justify-between md:w-[45%] w-full border-[1px] border-solid border-[#ccc] rounded-md py-[10px] px-[15px] mx-1 mb-5 font-bold';
    li.appendChild(document.createTextNode(newItem));
    const button=createButton('remove-item btn-link text-red-600');
    li.appendChild(button);
    itemList.appendChild(li);
    checkUI();
    // console.log(itemList);
    itemInput.value='';
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

function removeItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        e.target.parentElement.parentElement.remove();
    }
    checkUI();
}

function clearItems(e){
    while (itemList.firstChild) {
        itemList.firstChild.remove();
    }
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
itemList.addEventListener('click',removeItem);
clearall.addEventListener('click',clearItems);
itemFilter.addEventListener('input',filterItem);

checkUI();