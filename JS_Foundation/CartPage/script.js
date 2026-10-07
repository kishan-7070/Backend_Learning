document.addEventListener('DOMContentLoaded',()=>{
    const products=[
        {id:1,name:"Product 1",price: 30.00},
        {id:2,name:"Product 2",price: 40.00},
        {id:3,name:"Product 3",price: 50.00},
    ];

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productList=document.getElementById("product-list");
    const cartItems=document.getElementById("cart-items");
    const emptyCartMessage=document.getElementById("empty-cart");
    const cartTotalMessage=document.getElementById("cart-total");
    const totalPriceDisplay=document.getElementById("total-price");
    const checkOutBtn=document.getElementById("checkout-btn");

    products.forEach(product =>{
        const productDiv=document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML=`
        <span>${product.name} -$${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to cart </button>
        `;
        productList.appendChild(productDiv);
    });

    productList.addEventListener("click",(e)=>{
        if(e.target.tagName==='BUTTON'){
            const productId=parseInt(e.target.getAttribute('data-id'));
            const product=products.find(p=>p.id===productId);
            addToCart(product);
        }
    });

     function addToCart(product){
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();

     }

     function renderCart(){
        cartItems.innerHTML="";
        let totalPrice=0;;

        if(cart.length>0){
            emptyCartMessage.classList.add('hidden');
            cartTotalMessage.classList.remove('hidden');
            cart.forEach((item,index)=>{
                totalPrice+=item.price;
                const cartItem=document.createElement('div');
                cartItem.classList.add('remove');
                cartItem.innerHTML=`
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <button data-id="${item.id}">Remove </button>
                `;

                cartItems.appendChild(cartItem);
                totalPriceDisplay.textContent=`${totalPrice.toFixed(2)}`
            })

        }else{
            emptyCartMessage.classList.add('hidden');
            totalPriceDisplay.textContent=`$0.00`;
            
        }
     }

     cartItems.addEventListener('click',(e) =>{
        if(e.target.tagName==="BUTTON"){
            const productId=parseInt(e.target.getAttribute('data-id'));
            const product=cart.find(p=>p.id===productId);
            remove(product);
        }
     })

function remove(product) {
    const index = cart.findIndex(p => p.id === product.id);
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}
renderCart();
     checkOutBtn.addEventListener('click',()=>{
        cart.length=0;
        localStorage.removeItem("cart");
        alert("Checkout Successfully");
        renderCart();
     })
});