import Cars from './Cars/Cars'

import { isFavorite, toggleFavorite } from '../src/favorite.js'

const productModelSelect = document.getElementById('product-model')
const newCarsList = document.getElementById('new-cars')
const searchInput = document.getElementById('search-input')
const findButton = document.getElementById('find-button')
const yeniElanBtn = document.getElementById('yeni-elan')
const addCarModal = document.getElementById('add-car-modal')
const yeniSiyahi = document.getElementById('yeni-siyahi')
const carForm = document.getElementById('car-form')
const minPrice = document.getElementById('min-price')
const maxPrice = document.getElementById('max-price')
const addNews = document.getElementById('submit-car')
const yanacaqNovu = document.getElementById('fuel-type')

// Xüsusiyyətlər massivinin hazırlanması
const carXarakteristika = Cars.map((car) => {
  return {
    id: car.id,
    basliq: `${car.marka} ${car.model}`,
    sekilTag: `<img src="../src/Cars/img ${car.sekil}" alt="${car.marka} ${car.model}" />`,
    detallar: `Şəhər: ${car.seher}, İl: ${car.il}, Rəng: ${car.reng}, Yanacaq: ${car.yanacaq}, Yürüş: ${car.yurus}`,
  }
})

// Avtomobil markaları üçün açılan siyahının doldurulması
function populateBrands() {
  const uniqueBrands = [...new Set(Cars.map((car) => car.marka))]
  productModelSelect.innerHTML = '<option value="">Bütün modellər</option>'
  uniqueBrands.forEach((marka) => {
    const option = document.createElement('option')
    option.value = marka
    option.textContent = marka
    productModelSelect.appendChild(option)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  populateBrands()
})

// İnterfeysdə nəqliyyat vasitələri siyahısını göstərən funksiya
function renderCarsToUI(carsToRender, title = 'Axtarış nəticələri') {
  if (carsToRender.length === 0) {
    newCarsList.innerHTML = `<p>Heç nə tapılmadı </p>`
    return
  }

  let htmlContent = `<p><strong>${title}</strong></p><br>`
  htmlContent += `<h3>Xarakteristikaları:</h3>`

  carsToRender.forEach((car) => {
    const charData = carXarakteristika.find((el) => el.id === car.id)
    const isFav = isFavorite(car.id)
    const activeClass = isFav ? 'icon active' : 'icon'
    htmlContent += `
      <div class="new-cars" data-id="${car.id}">
      <img class="${activeClass}" src="./icons/plus-solid-full.svg" alt="Favorit" data-car-id="${car.id}" />
        <p><strong>Marka / Model:</strong> ${car.marka} ${car.model}</p>
        <p><strong>Xarakteristika:</strong> ${charData?.detallar || 'Məlumat yoxdur'}</p>
        <p><strong>Şəkil:</strong><br> ${charData?.sekilTag || 'Məlumat yoxdur'}</p>
      </div>
    `
  })
  newCarsList.innerHTML = htmlContent

  attachFavoriteListeners()
}

// Sevimlilər işarələrinə klikləri idarə edən funksiya
function attachFavoriteListeners() {
  const favIcons = newCarsList.querySelectorAll('.icon')

  favIcons.forEach((icon) => {
    icon.addEventListener('click', (e) => {
      const carId = Number(e.target.getAttribute('data-car-id'))
      const isNowFav = toggleFavorite(carId)

      // Siyahını yenidən yükləmədən ikon sinfini dinamik şəkildə dəyişdirin
      if (isNowFav) {
        e.target.classList.add('active')
      } else {
        e.target.classList.remove('active')
      }
    })
  })
}

// 1. "Bütün modellər" açılan siyahısına görə filtrləmə
productModelSelect.addEventListener('change', (e) => {
  const selectedBrand = e.target.value

  if (!selectedBrand) {
    newCarsList.innerHTML = ''
    return
  }

  const filteredCars = Cars.filter((car) => car.marka === selectedBrand)
  renderCarsToUI(filteredCars, `Seçilən marka: ${selectedBrand}`)
})

// 2. Ümumi axtarış funksiyası (daxiletmə sahəsi və düymə vasitəsilə)
function filterAndDisplayCars() {
  const searchText = searchInput.value.toLowerCase().trim()

  if (searchText === '') {
    newCarsList.innerHTML = ''
    return
  }

  carForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const marka = document.getElementById('form-marka').value.trim()
    const model = document.getElementById('form-model').value.trim()
    const qiymet = Number(document.getElementById('form-qiymet').value)
    const telefon = document.getElementById('form-telefon').value.trim()

    if (qiymet <= 0 || isNaN(qiymet)) {
      alert('Diqqət: Qiymət 0-dan böyük olmalıdır və mənfi ola bilməz!')
      return
    }

    const phoneRegex = /^\d{3}\d{3}\d{2}\d{2}$/
    if (!phoneRegex.test(telefon)) {
      alert('Diqqət: Telefon nömrəsi bu formatda olmalıdır: 050-123-45-67')
      return
    }

    const yeniMasin = {
      id: Date.now(),
      marka: marka,
      model: model,
      qiymet: qiymet,
      telefon: telefon,
      //   seher: 'Bakı',
      //   il: 2026,
      //   reng: 'Qara',
      //   yanacaq: 'benzin',
      //   yurus: '0 km',
      //   sekil: 'default.jpg',
      //
    }

    alert('Elan uğurla əlavə olundu!')

    carForm.reset()
    productModelSelect.appendChild(addCarModal)
  })

  // Marka, model və ya digər sahələrdə uyğunluqları axtarırıq
  const selectedBrand1 = Cars.filter((car) => {
    return (
      car.marka.toLowerCase().includes(searchText) ||
      car.model.toLowerCase().includes(searchText) ||
      car.seher.toLowerCase().includes(searchText)
    )
  })

  renderCarsToUI(selectedBrand1, `Axtarış sözü: "${searchInput.value}"`)
}

// Axtarış hadisələrini bir dəfə əlaqələndiririk

searchInput.addEventListener('input', filterAndDisplayCars)
findButton.addEventListener('click', filterAndDisplayCars)

yeniElanBtn.addEventListener('click', () => {
  if (addCarModal.style.display === 'none' || addCarModal.style.display === '') {
    addCarModal.style.display = 'block'
  } else {
    addCarModal.style.display = 'none'
  }
})

addNews.addEventListener('click', (e) => {
  e.preventDefault() // Səhifənin yenilənməsinin qarşısını alır

  const inputElement = document.getElementById('form-marka')
  const modelInput = document.getElementById('form-model')
  const telefonInput = document.getElementById('form-telefon')
  const qiymetInput = document.getElementById('form-qiymet')

  if (!inputElement) return

  const yeniMarkaAdi = inputElement.value.trim()
  const yeniModelAdi = modelInput ? modelInput.value.trim() : 'Model'
  const telefon = telefonInput ? telefonInput.value.trim() : ''
  const qiymet = qiymetInput ? qiymetInput.value.trim() : ''

  // 1. Əgər marka yazılmayıbsa, bu alert çıxır və proses dayanır
  if (yeniMarkaAdi === '') {
    alert('Markani yazin')
    return
  }
  if (yeniModelAdi === '') {
    alert('Modeli yazin')
    return
  }
  if (telefon === '' || telefon.length < 10) {
    alert('Telefonu duz qeyd edin!')
    return
  }
  if (qiymet === '' || qiymet < 0) {
    alert('Qiymeti duz qeyd edin')
    return
  }
  // 2. Marka seçimlər siyahısına (productModelSelect) əlavə olunur
  const existingOptions = Array.from(productModelSelect.options).map((opt) => opt.value)
  if (!existingOptions.includes(yeniMarkaAdi)) {
    const newOption = document.createElement('option')
    newOption.value = yeniMarkaAdi
    newOption.textContent = yeniMarkaAdi
    productModelSelect.appendChild(newOption)
  }

  // 3. Yeni maşın massivə əlavə olunur
  const yeniMasin = {
    id: Date.now(),
    marka: yeniMarkaAdi,
    model: yeniModelAdi,
    telefon: `${telefon}`,
    qiymet: `${qiymet}`,
    seher: 'Bakı',
    il: 2026,
    reng: 'Qara',
    yanacaq: 'benzin',
    yurus: '0 km',
    sekil: 'default.jpg',
  }
  Cars.push(yeniMasin)

  // 4. Xarakteristika massivinə əlavə olunur
  carXarakteristika.push({
    id: yeniMasin.id,
    basliq: `${yeniMasin.marka} ${yeniMasin.model}`,
    sekilTag: `<img src="./img/${yeniMasin.sekil}" alt="${yeniMasin.marka} ${yeniMasin.model}" />`,
    detallar: `Telefon: ${telefon}, Qiymet: ${telefon} ,Şəhər: ${yeniMasin.seher}, İl: ${yeniMasin.il}, Rəng: ${yeniMasin.reng}, Yanacaq: ${yeniMasin.yanacaq}, Yürüş: ${yeniMasin.yurus}`,
  })

  // 5. Forma təmizlənir, modal bağlanır və yeni elan ekrana gəlir
  carForm.reset()
  addCarModal.style.display = 'none'
  renderCarsToUI([yeniMasin], `Yeni əlavə olunan elan:`)

  // 6. YALNIZ HƏR ŞEY UĞURLA BİTƏNDƏ SONDADA BU ALERT ÇIXIR
  alert('Elan ugurla elave olundu')
})
