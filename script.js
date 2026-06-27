const products = [
{
id:1,
name:"iPhone 15 Pro",
category:"Phone",
price:999,
image:"images/iphone.jpg",
description:"Latest Apple iPhone with A17 Pro chip."
},
{
id:2,
name:"Samsung Galaxy S24",
category:"Phone",
price:850,
image:"images/samsung.jpg",
description:"Flagship Android smartphone."
},
{
id:3,
name:"MacBook Pro",
category:"Laptop",
price:1800,
image:"images/macbook.jpg",
description:"Apple M3 Performance Laptop."
},
{
id:4,
name:"Dell XPS 15",
category:"Laptop",
price:1400,
image:"images/dell.jpg",
description:"Premium Windows Laptop."
},
{
id:5,
name:"Nike Air Max",
category:"Shoes",
price:150,
image:"images/nike.jpg",
description:"Comfortable sports shoes."
},
{
id:6,
name:"Adidas Ultraboost",
category:"Shoes",
price:180,
image:"images/adidas.jpg",
description:"Lightweight running shoes."
},
{
id:7,
name:"Apple Watch",
category:"Watch",
price:450,
image:"images/applewatch.jpg",
description:"Fitness and smart watch."
},
{
id:8,
name:"Rolex",
category:"Watch",
price:1200,
image:"images/rolex.jpg",
description:"Luxury watch."
},
{
id:9,
name:"HP Pavilion",
category:"Laptop",
price:950,
image:"images/hp.jpg",
description:"Reliable laptop."
},
{
id:10,
name:"OnePlus 12",
category:"Phone",
price:720,
image:"images/oneplus.jpg",
description:"Fast Android phone."
},
{
id:11,
name:"Puma Shoes",
category:"Shoes",
price:120,
image:"images/puma.jpg",
description:"Comfortable sneakers."
},
{
id:12,
name:"Casio Watch",
category:"Watch",
price:90,
image:"images/casio.jpg",
description:"Affordable digital watch."
}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function featured(){

const container = document.getElementById("featuredProducts");

if(!container) return;

container.innerHTML="";

products.slice(0,4).forEach(product=>{

container.innerHTML += `
<div class="col-md-3 mb-4">
<div class="card shadow h-100">
<img src="${product.image}" class="card-img-top">
<div class="card-body text-center">
<h5>${product.name}</h5>
<h4 class="text-success">$${product.price}</h4>
<a href="shop.html" class="btn btn-warning">Shop Now</a>
</div>
</div>
</div>
`;

});

}

function displayProducts(list){

const container = document.getElementById("productList");

if(!container) return;

container.innerHTML="";

list.forEach(product=>{

container.innerHTML += `
<div class="col-md-3 mb-4">
<div class="card h-100 shadow">
<img src="${product.image}" class="card-img-top" alt="${product.name}">
<div class="card-body text-center">
<h5>${product.name}</h5>
<p>${product.category}</p>
<h4 class="text-success">$${product.price}</h4>

<button class="btn btn-primary w-100 mb-2"
onclick="openProduct(${product.id})">
View Details
</button>

<button class="btn btn-success w-100"
onclick="addToCart(${product.id})">
Add To Cart
</button>

</div>
</div>
</div>
`;

});

}

function openProduct(id){

localStorage.setItem("selectedProduct",id);

window.location.href="product.html";

}

function loadProduct(){

const id = Number(localStorage.getItem("selectedProduct"));

const product = products.find(p => p.id === id);

if(!product) return;

const image = document.getElementById("detailImage");
const name = document.getElementById("detailName");
const price = document.getElementById("detailPrice");
const description = document.getElementById("detailDescription");

if(!image || !name || !price || !description) return;

image.src = product.image;
name.innerHTML = product.name;
price.innerHTML = "$" + product.price;
description.innerHTML = product.description;

window.currentProduct = product;

}

function addCurrentProduct(){

if(window.currentProduct){

addToCart(window.currentProduct.id);

alert("Added To Cart");

}

}
function addToCart(id){

let item = cart.find(p => p.id === id);

if(item){

item.quantity++;

}else{

let product = products.find(p => p.id === id);

cart.push({
...product,
quantity:1
});

}

saveCart();

alert("Product Added Successfully!");

}
function saveCart(){

localStorage.setItem("cart",JSON.stringify(cart));

updateCartCount();

}


function updateCartCount(){

const badge=document.getElementById("cartCount");

if(!badge) return;

let total=0;

cart.forEach(item=>{

total+=item.quantity;

});

badge.innerHTML=total;

}

function loadCart(){

const container=document.getElementById("cartItems");

const totalBox=document.getElementById("totalPrice");

if(!container || !totalBox) return;

container.innerHTML="";

let total=0;

if(cart.length===0){

container.innerHTML=`

<div class="alert alert-warning">

Your Cart is Empty.

</div>

`;

totalBox.innerHTML="0";

return;

}

cart.forEach((item,index)=>{

total+=item.price*item.quantity;

container.innerHTML+=`

<div class="card mb-3 shadow">

<div class="row g-0">

<div class="col-md-3">

<img
src="${item.image}"
class="img-fluid rounded-start"
style="height:180px;object-fit:cover;">

</div>

<div class="col-md-9">

<div class="card-body">

<h4>${item.name}</h4>

<p>${item.category}</p>

<h5 class="text-success">

$${item.price}

</h5>

<div class="mt-3">

<button
class="btn btn-secondary"
onclick="decrease(${index})">

-

</button>

<span class="mx-3">

${item.quantity}

</span>

<button
class="btn btn-secondary"
onclick="increase(${index})">

+

</button>

<button
class="btn btn-danger float-end"
onclick="removeItem(${index})">

Remove

</button>

</div>

</div>

</div>

</div>

</div>

`;

});

totalBox.innerHTML=total;

}

function increase(index){

cart[index].quantity++;

saveCart();

loadCart();

}

function decrease(index){

cart[index].quantity--;

if(cart[index].quantity<=0){

cart.splice(index,1);

}

saveCart();

loadCart();

}

function removeItem(index){

cart.splice(index,1);

saveCart();

loadCart();

}

const search=document.getElementById("search");

if(search){

search.addEventListener("keyup",function(){

const key=this.value.toLowerCase();

const result=products.filter(product=>

product.name.toLowerCase().includes(key)

);

displayProducts(result);

});

}


const category=document.getElementById("category");

if(category){

category.addEventListener("change",function(){

if(this.value==="all"){

displayProducts(products);

return;

}

const result=products.filter(product=>

product.category===this.value

);

displayProducts(result);

});

}

const sort=document.getElementById("sort");

if(sort){

sort.addEventListener("change",function(){

let temp=[...products];

if(this.value==="low"){

temp.sort((a,b)=>a.price-b.price);

}

if(this.value==="high"){

temp.sort((a,b)=>b.price-a.price);

}

displayProducts(temp);

});

}

const checkout=document.getElementById("checkoutForm");

if(checkout){

checkout.addEventListener("submit",function(e){

e.preventDefault();

if(cart.length===0){

alert("Your cart is empty!");

return;

}

alert("Order Placed Successfully!");

cart=[];

localStorage.removeItem("cart");

updateCartCount();

window.location.href="index.html";

});

}

updateCartCount();

featured();

displayProducts(products);

loadProduct();

loadCart();