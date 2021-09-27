
export function contactPhotographer (nameOfPhotographerId) {
  const contact = document.querySelector('.contact')
  const main = document.querySelector('.main')
  const body = document.querySelector('body')
  const form = document.createElement('form')
  form.classList.add('formulaire')
  contact.addEventListener('click', () => {
    const modale = `    
    <h1>Contactez-moi<br />${nameOfPhotographerId}</h1>
    <img src="../img/croixModale.svg" alt="fermer la modale de contact" />    
    <label for="firstname">Prénom</label>
    <input type="text" name="firstname" id="firstname" required/>
    <span class = "firstnameSpan"></span>
    <label for="name">Nom</label>
    <input type="text" name="name" id="name" required/>
    <span class = "nameSpan"></span>     
    <label for="email">Email</label>
    <input type="email" name="email" id="email" required/>
    <span class = "emailSpan"></span>     
    <label for="message">Votre message</label>
    <textarea name="message" id="message" required></textarea>
    <span class = "messageSpan"></span>     
    <input id="submit" type="submit" value="Envoyer" />    
    `
    form.innerHTML = modale
    body.appendChild(form)

    // TEST DE LA LONGUEUR ET DE LA VALIDITÉE DU CHAMP NOM ET PRENOM
    function testFirstAndLast (input) {
      return /^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(input)
    }
    const first = document.getElementById('firstname')

    // FONCTION DE TEST DU PRENOM
    function testFirstName () {
      if (testFirstAndLast(first.value.trim())) {
        document.querySelector('.firstnameSpan').innerHTML = ''
        return true
      } else {
        document.querySelector('.firstnameSpan').innerHTML = 'veuillez entrez un prénom de 2 lettres minimum et sans caractères spéciaux'
        return false
      }
    }

    // FONCTION DE TEST DU NOM
    const last = document.getElementById('name')

    function testLastName () {
      if (testFirstAndLast(last.value.trim())) {
        document.querySelector('.nameSpan').innerHTML = ''
        return true
      } else {
        document.querySelector('.nameSpan').innerHTML = 'veuillez entrez un nom de 2 lettres minimum et sans caractères spéciaux'
        return false
      }
    }

    // TEST DE LA VALIDITE DE L EMAIL
    function testMail (input) {
      return /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.value)
    }

    // FONCTION DE TEST DU MAIL
    const mail = document.getElementById('email')

    function email () {
      if (testMail(mail)) {
        document.querySelector('.emailSpan').innerHTML = ''
        return true
      } else {
        document.querySelector('.emailSpan').innerHTML = 'veuillez entrez un email valide '
        return false
      }
    }

    const textarea = document.getElementById('message')

    function textArea () {
      if (testFirstAndLast(textarea.value.trim())) {
        document.querySelector('.messageSpan').innerHTML = ''
        return true
      } else {
        document.querySelector('.messageSpan').innerHTML = 'veuillez entrez un message valide '

        return false
      }
    }

    // fermeture de la modale au click sur la croix
    const closeModal = document.querySelector('.formulaire>img')
    closeModal.addEventListener('click', () => {
      body.removeChild(form)
    })

    const submit = document.getElementById('submit')
    submit.addEventListener('click', (e) => {
      e.preventDefault()
      if (testFirstName() && testLastName() && email() && textArea()) {
        console.log('prénom ' + first.value + ', nom ' + last.value + ', email ' + mail.value + ' , message ' + textarea.value)
        // création de la modale de validation
        const validMsg = `
      
      <p>Votre message a bien été envoyé à <br>${nameOfPhotographerId}</p>
      <img src="../img/croixModale.svg" alt="fermer la modale de validation d'envoi du message" />
      <input id="close__msg" type="submit" value="Fermer" />
      `
        form.innerHTML = validMsg
        const closeMsg = document.getElementById('close__msg')
        const closeMsgCrux = document.querySelector('.formulaire>img')
        console.log(closeMsg)
        closeMsg.addEventListener('click', () => {
          body.removeChild(form)
          e.preventDefault()
        })
        closeMsgCrux.addEventListener('click', () => {
          body.removeChild(form)
        })
      }
    })
  })
}
