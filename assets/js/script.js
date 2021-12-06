const img = document.querySelector('.header__burger img')
const burger = document.querySelector('.header__burger')
const list = document.querySelector('.header__list')
const headerOverlay = document.querySelector('.header__overlay')
const menu = (args) => {
    args.map(e =>
        e.addEventListener('click', (e) => {
            e.preventDefault()
            if (list.classList.contains('active') && headerOverlay.classList.contains('active')) {
                list.classList.remove('active')
                headerOverlay.classList.remove('active')
                img.setAttribute('src', 'assets/img/icon-menu.svg')
            } else {
                list.classList.add('active')
                headerOverlay.classList.add('active')
                img.setAttribute('src', 'assets/img/icon-close.svg')
            }
        }))
}
menu([burger, headerOverlay])

const minus = document.querySelector('.gallery__minus')
const plus = document.querySelector('.gallery__plus')
const quantity = document.querySelector('.gallery__quantity')
const cartIcon = document.querySelector('.header__count')
const basket = document.querySelector('.header__basket')
const addCart = document.querySelector('.gallery__add-to-cart')
const cart = document.querySelector('.cart')

const cartMessage = document.querySelector('.cart__message')
const cartWrap = document.querySelector('.cart__wrap')


let countValue = 1;
let productsValue = 0;
let price = 250.00
let discount = 0.5

basket.addEventListener('click', (e) => {
    e.preventDefault()
    cart.classList.toggle('isOpen')
})

const counter = (val) => {
    if ((countValue + val) > 0) {
        countValue += val
    }
    quantity.textContent = countValue
}
minus.addEventListener('click', () => counter(-1));
plus.addEventListener('click', () => counter(1));

const updateCartIcon = () => {
    cartIcon.textContent = productsValue
    productsValue === 0 ? cartIcon.classList.remove('isOpen') : cartIcon.classList.add('isOpen')
}
const updateCartMessage = () => {
    if (productsValue === 0) {
        cartMessage.classList.remove('hidden')
        cartWrap.classList.remove('isOpen')
    } else {
        cartMessage.classList.add('hidden')
        cartWrap.classList.add('isOpen')
    }
}
const updateDelete = () => {
    productsValue--;
    updateCart()
    document.querySelector('.cart__count').textContent = productsValue
    document.querySelector('.cart__total').textContent = `$${(price * discount * productsValue).toFixed(2)}`
    if (productsValue === 0) {
        cartWrap.innerHTML = ''
    }
}
const addToCart = () => {
    productsValue += countValue
    cartWrap.innerHTML = `
                <div class="cart__info">
                  <div class="cart__img"><img src="assets/img/image-product-1.jpg"></div>
                  <div class="cart__details">
                    <p class="cart__product-name">Autumn Limited</p>
                    <div class="cart__amount"><span class="cart__price">${(price * discount).toFixed(2)}</span><span class="cart__multiply">x</span><span class="cart__count">${productsValue}</span><span class="cart__total">$${(price * discount * productsValue).toFixed(2)}</span></div>
                  </div>
                  <div class="cart__delete"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 14 16">
<defs>
<path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/>
</defs>
<use xlink:href="#a"/>
</svg>
                  </div>
                </div>
                <button class="cart__checkout" type="button">Checkout</button>
    `
    updateCart()
    document.querySelector('.cart__delete').addEventListener('click', updateDelete)
    quantity.textContent = '1'
    countValue = 1
}
addCart.addEventListener('click', addToCart)
const updateCart = () => {
    updateCartIcon();
    updateCartMessage();
}

const heroImg = document.querySelector('.gallery__product img')
const thumbsProducts = document.querySelectorAll('.thumbs__product')
const prev = document.querySelector('.gallery__button-prev')
const next = document.querySelector('.gallery__button-next')

const handlerClickPrev = () => {
    let imageIndex = getCurrentImageIndex();
    imageIndex--;
    if (imageIndex < 1) {
        imageIndex = 4;
    }
    setHeroImage(imageIndex)
}
const handlerClickNext = () => {
    let imageIndex = getCurrentImageIndex();
    imageIndex++;
    if (imageIndex > 4) {
        imageIndex = 1;
    }
    setHeroImage(imageIndex)
}
const setHeroImage = imageIndex => {
    heroImg.src = `assets/img/image-product-${imageIndex}.jpg`;
    thumbsProducts.forEach(img => {
        img.classList.remove('active')
    })
    thumbsProducts[imageIndex - 1].classList.add('active')
}

const getCurrentImageIndex = () => {
    return parseInt(heroImg.src.split('//').pop().split('/').pop().replace('.jpg', '').replace('image-product-', ''))
}
prev.addEventListener('click', handlerClickPrev)
next.addEventListener('click', handlerClickNext)

const onThumbClick = (e) => {
    thumbsProducts.forEach(thumbsProduct => {
        thumbsProduct.classList.remove('active');
    });
    e.target.classList.add('active');
    heroImg.src = e.target.firstElementChild.src.replace('-thumbnail', '');
}
thumbsProducts.forEach(thumbsProduct => thumbsProduct.addEventListener('click', onThumbClick))



const overlay = document.querySelector('.overlay')
const overlayLightBox = document.querySelector('.overlay__lightbox')
const lightBox = document.querySelector('.gallery__carousel')
let heroImgOverlay;
let overlayThumbsProducts;
const onHeroImgClick = () => {
    if (window.innerWidth >= 992) {
        if (overlayLightBox.childElementCount === 1) {
            const cloneLightBox = lightBox.cloneNode(true)
            overlayLightBox.append(cloneLightBox)

            overlayThumbsProducts = overlay.querySelectorAll('.thumbs__product')
            heroImgOverlay = overlay.querySelector('.gallery__product img')
            overlayThumbsProducts.forEach(thumbsProduct => thumbsProduct.addEventListener('click', onThumbClickLightOverlay))

            const prevOverlay = overlay.querySelector('.gallery__button-prev')
            const nextOverlay = overlay.querySelector('.gallery__button-next')
            prevOverlay.addEventListener('click', handlerClickPrevOverlay);
            nextOverlay.addEventListener('click', handlerClickNextOverlay);

            const closeOverlay = document.querySelector('.overlay__close')
            closeOverlay.addEventListener('click', overlayClose)
        }
        overlay.classList.remove('hidden')
    }

}

const overlayClose = () => {
    overlay.classList.add('hidden')
}
const onThumbClickLightOverlay = (e) => {
    overlayThumbsProducts.forEach(overlayThumbsProduct => {
        overlayThumbsProduct.classList.remove('active');
    });
    e.target.classList.add('active');
    heroImgOverlay.src = e.target.firstElementChild.src.replace('-thumbnail', '');
}
const handlerClickPrevOverlay = () => {
    let imageIndex = getCurrentImageIndexOverlay();
    imageIndex--;
    if (imageIndex < 1) {
        imageIndex = 4;
    }
    setHeroImageOverlay(imageIndex)
}
const handlerClickNextOverlay = () => {
    let imageIndex = getCurrentImageIndexOverlay();
    imageIndex++;
    if (imageIndex > 4) {
        imageIndex = 1;
    }
    setHeroImageOverlay(imageIndex)
}
const getCurrentImageIndexOverlay = () => {
    return parseInt(heroImgOverlay.src.split('//').pop().split('/').pop().replace('.jpg', '').replace('image-product-', ''))
}
const setHeroImageOverlay = imageIndex => {
    heroImgOverlay.src = `assets/img/image-product-${imageIndex}.jpg`;
    overlayThumbsProducts.forEach(overlayThumbsProduct => {
        overlayThumbsProduct.classList.remove('active')
    })
    overlayThumbsProducts[imageIndex - 1].classList.add('active')
}
heroImg.addEventListener('click', onHeroImgClick)