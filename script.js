const itemForm=document.querySelector('#item-form');
const itemInput=document.querySelector('#item-input');
const itemList=document.querySelector('#item-list');

function addItem(e){
    e.preventDefault();
    const newItem=itemInput.value;

    if(newItem===''){
        alert('Please add an item');
        return;
    }

    const li=document.createElement('li');
    li.className='flex justify-between md:w-[45%] w-full border-[1px] border-solid border-[#ccc] rounded-md py-[10px] px-[15px] mx-1 mb-5 font-bold';
    li.appendChild(document.createTextNode(newItem));
    const button=createButton('remove-item btn-link text-red-600');
    li.appendChild(button);
    itemList.appendChild(li);
    console.log(itemList);
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

itemForm.addEventListener('submit',addItem)

