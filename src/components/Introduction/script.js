let bgThree = document.getElementsByClassName('bgThree');
let bgOne = document.getElementsByClassName('bgOne');
let bgTwo = document.getElementsByClassName('bgTwo');


window.addEventListener('scroll', () => {
    let value = window.scrollY;

    bgThree.style.marginTop = value * 2.5 + 'px';
    bgOne.style.left = value * -1.5 + 'px';
    bgTwo.style.left = value * 1.5 + 'px';



});