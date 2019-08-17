(function index() {
  const items = document.querySelectorAll('.item');
  const tabletopWidth = document.getElementById('tabletopWidth');
  const tabletopLength = document.getElementById('tabletopLength');

  refreshPrice(document.querySelector('.item .item--active'));

  //навешиваем обработчики на все столешницы (item) - при клике (еще нужно при выборе с клавиатуры) меняем активную
  items.forEach((item) => {
    item.addEventListener('click', () => {
      if (!item.classList.contains('item--active')) {
        togglerItem(item);
      }
    })
  });

  //навешиваем обработчики на ширину и длину
  tabletopWidth.addEventListener('change', () => {
    refreshPrice();
  });

  tabletopLength.addEventListener('change', () => {
    refreshPrice();
  });

  //установка класса active только на выбраную столешницу
  function togglerItem(itemActive) {
    items.forEach((item) => {
      if (item === itemActive) {
        item.classList.add('item--active');
        refreshPrice(item);
      } else {
        item.classList.remove('item--active');
      }
    });
  }

  //обновляет данные и итоговую цену
  function refreshPrice(item) {
    const totalPrice = document.getElementById('totalPrice');
    const calculationTabletopLength = document.getElementById('calculationTabletopLength');
    const calculationTabletopPrice = document.getElementById('calculationTabletopPrice');
    const calculationEdgeLength = document.getElementById('calculationEdgeLength');
    const calculationEdgePrice = document.getElementById('calculationEdgePrice');

    let square = 0;
    let edge = 0;
    let price = 0;

    if (item) {
      calculationEdgePrice.innerText = item.dataset.mod;
    }

    square = Number(tabletopWidth.value) / 1000 * Number(tabletopLength.value) / 1000;
    square = roundPlus(square);
    edge = (Number(tabletopWidth.value) + Number(tabletopLength.value)) / 1000 * 2;
    edge = Math.ceil(edge);
    price = square * Number(calculationTabletopPrice.innerText) + edge * Number(calculationEdgePrice.innerText);
    price = roundPlus(price);

    calculationTabletopLength.innerText = square;
    calculationTabletopPrice.innerText = 1200;
    calculationEdgeLength.innerText = edge;
    totalPrice.innerText = price;
  }

  //округляет num с точностью до z после запятой
  function roundPlus(num, z = 2) {
    return Math.round(num * Math.pow(10, z)) / Math.pow(10, z);
  }
})();
