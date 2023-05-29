const coleccionBBDD = firebase.firestore().collection("BBDD"); 
let dataBBDD=[]
coleccionBBDD.get()
  .then((results) => {
    console.log(results)
    const data = results.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dataBBDD.push(...data)
    console.log("Toda data en la coleccion 'BBDD' ", data); 
 });
console.log(dataBBDD)

(function () {
    const listElements = document.querySelectorAll('.menu-item-show');
    const list = document.querySelector('.menu-links');
    const menu = document.querySelector('.menu-hamburguer');
    const colleccionBBDD = firebase.firestore().collection("BBDD");

    const addClick = () => {
        listElements.forEach(element => {
            element.addEventListener('click', () => {
                let subMenu = element.children[1];
                let height = 0;
                element.classList.toggle('menu-item-active');

                if (subMenu.clientHeight === 0) {
                    height = subMenu.scrollHeight;
                }
                subMenu.style.height = `${height}px`;
            });
        });
    }

    const deleteStyleHeight = () => {
        listElements.forEach(element => {
            if (element.children[1].getAttribute('style')) {
                element.children[1].removeAttribute('style');
                element.classList.remove('menu-item-active');
            }
        });
    }


    window.addEventListener('resize', () => {
        if (window.innerWidth > 800) {
            deleteStyleHeight();
            if (list.classList.contains('menu-links-show'))
                list.classList.remove('menu-links-show');
        } else {
            addClick();
        }
    });

    if (window.innerWidth <= 800) {
        addClick();
    }
    menu.addEventListener('click', () => list.classList.toggle('menu-links-show'));
})();


