import { getDataPhotographers } from './utils.js'
import { PhotographerInfo, MediaFactory } from './media.js'
import { Lightbox } from './lightbox.js'
import { contactPhotographer } from './modale.js'

const sectionInfo = document.querySelector('.photographer__description')

/** *******************************************rotation de la fleche du bouton de tri au click */
const arrow = document.querySelector('.arrow')
const blocDown = document.querySelectorAll('.bloc__down')
arrow.addEventListener('click', () => {
  arrow.classList.toggle('rotate')
  blocDown.forEach((element) => {
    element.classList.toggle('active')
  })
})

const sectionThumbnail = document.querySelector('.container__thumbnail')
const main = document.querySelector('.main')

const mediaToRender = []

async function getMedia () {
  const data = await getDataPhotographers('../index.json')
  const position = window.location.href.indexOf('?')
  const idphoto = parseInt(window.location.href.substr(position + 1))
  const media = data.media
  const photographers = []
  let totalLikes = 0
  media.forEach(element => {
    if (element.photographerId === idphoto) {
      totalLikes += element.likes
    }
  })

  //* ***************************************************génération dynamique de la partie description du photographe */

  data.photographers.forEach((element) => {
    photographers.push(element)
  })
  let nameOfPhotographerId // nom du photographe sélectionné
  photographers.forEach((element) => {
    if (element.id === idphoto) {
      nameOfPhotographerId = element.name
      element.likesCount = totalLikes
      console.log(element)
      const photographerInfos = new PhotographerInfo(element)
      const photographe = photographerInfos.render()
      sectionInfo.innerHTML = photographe
    }
  })

  console.log(nameOfPhotographerId)
  //* *************************modale de contact */
  contactPhotographer(nameOfPhotographerId)

  // *****************************************************génération des médias à retourner
  media.forEach((element) => {
    if (element.photographerId === idphoto) {
      mediaToRender.push(element)
    }
  })
  /** *****************************************************création des vignettes grace a la factory */
  mediaToRender.forEach((element) => {
    const media = MediaFactory.createMedia(element)
    sectionThumbnail.innerHTML += media
  })
  // ******************************************************incrémenttion de totalLikes
  const hearts = document.querySelectorAll('#heart')
  hearts.forEach(heart => {
    heart.addEventListener('click', () => console.log(totalLikes = totalLikes + 1))
  })
  // /****************************************************************partie lightbox */
  const tabLight = document.querySelectorAll('.thumbnail>.img__thumbnail')
  const light = new Lightbox(tabLight, main)
  light.start()
}

getMedia()
