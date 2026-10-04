// localStorage-dan sevimli ID-lərin siyahısını (və ya boş bir massiv) əldə edin
export function getFavorites() {
  const favorites = localStorage.getItem('turbo_favorites')
  return favorites ? JSON.parse(favorites) : []
}

// Yoxla: avtomobil seçilmişlər arasındadır?
export function isFavorite(carId) {
  const favorites = getFavorites()
  return favorites.includes(carId)
}

// Vəziyyəti dəyişdir (əlavə et / sil)
export function toggleFavorite(carId) {
  let favorites = getFavorites()

  if (favorites.includes(carId)) {
    // Sevimlilərdən çıxar

    favorites = favorites.filter((id) => id !== carId)
  } else {
    // Sevimlilərə əlavə et

    favorites.push(carId)
  }

  // localStorage-a geri yadda saxla
  localStorage.setItem('turbo_favorites', JSON.stringify(favorites))
  return favorites.includes(carId) // Hazırda sevimlilərdədirsə, true qaytarır
}
