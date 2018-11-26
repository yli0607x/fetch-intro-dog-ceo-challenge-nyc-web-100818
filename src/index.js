console.log('%c HI', 'color: firebrick')


document.addEventListener('DOMContentLoaded', () => {
  let allBreeds = []
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  const breedUrl = "https://dog.ceo/api/breeds/list/all"

  const dogImgContainer = document.getElementById('dog-image-container')
  const dogBreedUrl = document.getElementById('dog-breeds')
  const breedDropdown = document.getElementById('breed-dropdown')

  dogBreedUrl.addEventListener('click', (event) => {
    event.target.style.color = 'cyan'
  })

  breedDropdown.addEventListener('change', (event) =>{
    const selectedLetter = event.target.value
    const filteredBreeds = allBreeds.filter((breed) => {
      return breed.startsWith(selectedLetter)
    })
    dogBreedUrl.innerHTML = filteredBreeds.map((breed) => `<li>${breed}</li>`).join('')
  })

  fetch(imgUrl, { method : 'GET' })
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      console.log(response)
    })
    .then((dogImgData) => {
      console.log(dogImgData)
      // dogImgData.message.forEach(function(imgUrl) {
      //   dogImgContainer.innerHTML += `<img src=${imgUrl}>`
      // })
      const dogImgString = dogImgData.message.map((imgUrl) => `<img src="${imgUrl}">`)
      dogImgContainer.innerHTML = dogImgString.join('')
    })



  fetch(breedUrl, { method: 'GET'})
    .then((resp) => resp.json())
    .then((breedData) => {
      allBreeds = Object.keys(breedData.message)
      console.log(allBreeds)
      dogBreedUrl.innerHTML = allBreeds.map((breed) => `<li>${breed}</li>`).join('')
    })



})
