import { data } from './cars.js'

const support = document.getElementById('support')
const marcaSelect = document.getElementById('marca')
const modelCarList = document.getElementById('model__text')
const carsInEkran = document.getElementById('cars_inEkran')
const buttonSituations = document.getElementById('btn__situation')
const currency = document.getElementById('currency')
const credit = document.getElementById('credit')
const priceMinMax = document.getElementById('price-min-max')
const barter = document.getElementById('barter')
const cityItemName = document.getElementById('dropdown-item')
const carListeningInDown = document.getElementById('car-listening')
const reset = document.getElementById('reset')
const addCar = document.getElementById('btn__new__add')
const yearMin = document.getElementById('year__min')
const yearMax = document.getElementById('year__max')
const bodyType = document.getElementById('body__type')
const buttonAll = document.getElementById('btn__down__all')
const buttonSales = document.getElementById('btn__down__sales')
const buttonOrder = document.getElementById('btn__down__order')
const newsShow = document.getElementById('show__add')
const btnNewCar = document.getElementById('btn__new')
const btnDrivenCar = document.getElementById('btn__driven')
const modalList = document.getElementById('modal')
const modalClose = document.getElementById('modal__close')
const btnClose = document.getElementById('close__btn')
const submitBtn = document.getElementById('submit__btn')
const markaInputAddCar = document.getElementById('marka__input')
const modelInputAddCar = document.getElementById('model__input')
const yearInputAddCar = document.getElementById('year__input')
const priceInputAddCar = document.getElementById('price__input')

const carsObject = data.map((item, index) => {
  return {
    id: index + 1,
    name: item.name,
    model: item.model,
    year: item.year,
    price: item.price,
    img: item.img || item.image,
  }
})

const favoriteCars = []

carsObject.forEach((car) => {
  const opt = document.createElement('option')
  opt.value = car.name
  opt.textContent = car.name
  marcaSelect.appendChild(opt)
})

carsObject.forEach((car) => {
  const carItem = document.createElement('div')
  carItem.textContent = car.name
  carListeningInDown.appendChild(carItem)
})

function displayCars(carsList) {
  carsInEkran.innerHTML = ''

  carsList.forEach((car) => {
    const carNews = document.createElement('div')
    carNews.classList.add('car-card')

    // Ürək ikonunu yaradırıq
    const imgFavorit = document.createElement('img')

    imgFavorit.classList.add('favorit__icon')
    const isFavorite = favoriteCars.some((fav) => fav.id === car.id)
    if (isFavorite) {
      imgFavorit.classList.add('active')
    }
    // Ürəyə kliklədikdə seçilmişlərə əlavə olunması
    imgFavorit.addEventListener('click', (e) => {
      e.stopPropagation()
      const isAlreadyFavorite = favoriteCars.some((fav) => fav.id === car.id)
      if (!isAlreadyFavorite) {
        favoriteCars.push(car)
        imgFavorit.classList.add('active')
        alert(`${car.name} ${car.model || ''} seçilmişlərə əlavə olundu!`)
      } else {
        // Əgər artıq varsa, seçilmişlərdən çıxarmaq istəsəniz:
        const index = favoriteCars.findIndex((fav) => fav.id === car.id)
        favoriteCars.splice(index, 1)
        imgFavorit.classList.remove('active') // Ağ rəngə qayıdır
        alert('Seçilmişlərdən silindi!')
      }
    })

    const imgElement = document.createElement('img')
    imgElement.src = car.img || ''
    imgElement.alt = car.name || 'Mashin'
    imgElement.style.width = '150px'

    const textElement = document.createElement('div')
    textElement.textContent = `
      ${car.name || ''} 
      ${car.model || ''} 
      İl: ${car.year || ''} 
      Qiymət: ${car.price || ''}
    `

    carNews.appendChild(imgFavorit)
    carNews.appendChild(imgElement)
    carNews.appendChild(textElement)

    carsInEkran.appendChild(carNews)
  })
}

displayCars(carsObject.slice(0, 15))

newsShow.addEventListener('click', () => {
  const selectedMarca = marcaSelect.value
  let filteredCars = carsObject

  if (marcaSelect.selectedIndex > 0) {
    filteredCars = filteredCars.filter((car) => car.name === selectedMarca)
  }

  if (marcaSelect.selectedIndex === 0) {
    displayCars(carsObject.slice(0, 15))
  } else {
    displayCars(filteredCars)
  }
})

support.addEventListener('mouseover', () => {
  support.style.color = 'red'
  support.style.cursor = 'default'
})

support.addEventListener('mouseout', () => {
  support.style.color = ''
})

marcaSelect.addEventListener('change', () => {
  if (marcaSelect.selectedIndex === 0) {
    modelCarList.disabled = true
    modelCarList.value = ''
    carsInEkran.innerHTML = ''
  } else {
    modelCarList.disabled = false

    const selectedCarName =
      marcaSelect.options[marcaSelect.selectedIndex].textContent
    modelCarList.value = selectedCarName

    const filteredCars = data.filter((car) => car.name === selectedCarName)
    displayCars(filteredCars)
  }
})

const dropdown = document.getElementById('cityDropdown')
const selectBtn = document.getElementById('dropdownSelectBtn')
const selectText = selectBtn.querySelector('span')
const checkboxes = document.querySelectorAll(
  '#dropdownList input[type="checkbox"]:not(#clearCity)',
)
const clearCheckbox = document.getElementById('clearCity')

selectBtn.addEventListener('click', (e) => {
  e.stopPropagation()
  dropdown.classList.toggle('active')
})

document.addEventListener('click', () => {
  dropdown.classList.remove('active')
})

document.getElementById('dropdownList').addEventListener('click', (e) => {
  e.stopPropagation()
})

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    clearCheckbox.checked = false
    updateSelectedCities()
  })
})

clearCheckbox.addEventListener('change', () => {
  if (clearCheckbox.checked) {
    checkboxes.forEach((cb) => (cb.checked = false))
    selectText.textContent = 'Seher'
  }
})

function updateSelectedCities() {
  let selected = []
  checkboxes.forEach((cb) => {
    if (cb.checked) {
      selected.push(cb.value)
    }
  })

  if (selected.length === 0) {
    selectText.textContent = 'Seher'
  } else if (selected.length === 1) {
    selectText.textContent = selected[0]
  } else {
    selectText.textContent = `Seçilib: ${selected.length}`
  }
}

credit.addEventListener('click', () => {
  credit.classList.toggle('active')
})

barter.addEventListener('click', () => {
  barter.classList.toggle('active')
})

currency.addEventListener('change', () => {
  if (currency.value) {
    currency.style.color = '#ca1016'
  }
})
currency.addEventListener('blur', () => {
  currency.style.color = ''
})

addCar.addEventListener('click', () => {
  modalList.style.display = 'block'
})

modalClose.addEventListener('click', () => {
  modalList.style.display = 'none'
})

btnClose.addEventListener('click', () => {
  modalList.style.display = 'none'
})

submitBtn.addEventListener('click', (e) => {
  e.preventDefault()

  const newCar = {
    id: carsObject.length + 1,
    name: markaInputAddCar.value,
    model: modelInputAddCar.value,
    year: Number(yearInputAddCar.value),
    price: Number(priceInputAddCar.value),
  }

  carsObject.push(newCar)
  displayCars(carsObject)

  modalList.style.display = 'none'
  markaInputAddCar.value = ''
  modelInputAddCar.value = ''
  yearInputAddCar.value = ''
  priceInputAddCar.value = ''
})
