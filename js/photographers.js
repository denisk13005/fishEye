import { getDataPhotographers } from './utils.js'

// console.log(photographers);
const data = await getDataPhotographers('../index.json')
let media = []
let photographers = []
data.media.forEach((element) => {
  media.push(element)
})
data.photographers.forEach((element) => {
  photographers.push(element)
})
console.log(photographers[0])
console.log(media)


//* ***************************************************génération dynamique de la partie description du photographe */

const sectionInfo = document.querySelector('.photographer__description')

function createAPhotographer({
  name,
  id,
  city,
  country,
  tagline,
  tags,
  portrait,
}) {
  return {
    name,
    id,
    city,
    country,
    tagline,
    tags,
    portrait,
    generateInfo,
  }
  function generateInfo() {
    sectionInfo.innerHTML = `
    <div class ='infoAndButton'>
      <div class="photographer__informations">
        <h1>${name}</h1>
        <h2>${city},${country}</h2>
        <h3>${tagline}</h3>
        <nav>
          <ul>
          ${tags.map((tag) => `<li>#${tag}`).join('')}
          </ul>
        </nav>
      </div> 
      <button>Contactez-moi</button> 
    </div>
    <div class="photo">
      <img src="../img/Sample Photos/${name}/${portrait}" alt="" />
    </div> 
  
    `
  }
}
let position = window.location.href.indexOf('?')
let idphoto = window.location.href.substr(position + 1)
photographers.forEach((element) => {
  if (element.id == idphoto) {
    console.log(element)
    const photo0 = createAPhotographer(element)
    photo0.generateInfo()

  }
})

// const sectionThumbnail = document.querySelector('.container__thumbnail')
// function generateGallery({}){

// }

// console.log(media);
