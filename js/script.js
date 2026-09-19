const enviar = document.getElementById('enviar')

enviar.addEventListener('click', () => {

    const nome = document.getElementById('nome').value.trim()
    const email = document.getElementById('email').value.trim()
    const telefone = document.getElementById('telefone').value.trim()
    const msg = document.getElementById('msg').value.trim()
    if (nome != '' && email != '' && telefone != '' && msg != '') {
        const meuNumero = '5511947091137'

        const textMsg =
            `*Nova mensagem recebida pelo site*
*Nome:* ${nome}
*E-mail:* ${email}
*Telefone:* ${telefone}
*Mensagem:*
${msg}`

        const codText = encodeURIComponent(textMsg)
        const waweb = `https://web.whatsapp.com/send?phone=${meuNumero}&text=${codText}`
        window.open(waweb, '_blank')
    } else {
        window.alert('Por favor, preencha o formulário para enviar uma mensagem!')
    }
})
// Mostra Ano
const ano = document.getElementById('year')
let anoAtual = new Date().getFullYear()
ano.innerHTML = anoAtual

// Trabalhos
const trabalhos = [
    {
        id: 1,
        title: 'Agregador de Links - Link in Bio',
        tipo: 'Desenvolvimwento Web',
        foto: 'jobs/linkbio.webp',
        descricao: 'Agregador de links para bio do Instagram, totalmente personalizável',
        link: 'https://fhricardo.github.io/agregador-de-links-front-end-1i-2026/'
    },
    {
        id: 2,
        title: 'Lista de Tarefas com localStorage',
        tipo: 'Desenvolvimwento Web',
        foto: 'jobs/todolist.webp',
        descricao: 'O projeto tem como objetivo criar uma lista de tarefas (to-do list) que pode ser alimentada dinamicamente e fica armazenada locamente utilizando o recurso localStorage do JavaScript',
        link: 'https://fhricardo.github.io/to-do-list-front-end-1i-2026/'
    }
]
// Mostrar os cards
const cardsContainer = document.getElementById('cardsContainer')
function mostrarTrabalhos() {
    if (!cardsContainer) return

    cardsContainer.innerHTML = trabalhos.map(job => `
        <div class="card" data-id="${job.id}">
            <div class="jobFoto">
                <img src="${job.foto}" alt="${job.title}">
            </div>
            <div class="text">
                <h3>${job.title}</h3>
                <span class="tipo">${job.tipo}</span>
                <p>${job.descricao}</p>
                <button type="button" class="btnOpen" aria-label="Ver detalhes de ${job.title}">
                    <i class="fa-solid fa-square-arrow-up-right"></i>
                </button>
            </div>
        </div>
        `).join('')
}
mostrarTrabalhos()
// Controle do Modal
const modalOverlay = document.getElementById('modalOverlay')
const modalClose = document.getElementById('modalClose')
const modalImg = document.getElementById('modalImg')
const titleModal = document.getElementById('titleModal')
const modalTipo = document.getElementById('modalTipo')
const modalDesc = document.getElementById('modalDesc')
const modalLink = document.getElementById('modalLink')

function abrirModal(job) {
    modalImg.src = job.foto
    modalImg.alt = job.title
    titleModal.textContent = job.title
    modalTipo.textContent = job.tipo
    modalDesc.textContent = job.descricao

    if (job.link && job.link.trim() !== "") {
        modalLink.href = job.link
        modalLink.style.display = "flex"
    } else {
        modalLink.style.display = "none"
        modalLink.removeAttribute("href")
    }
    modalOverlay.classList.add('active')
    modalOverlay.setAttribute('aria-hidden', 'false')
    document.body.style.overflow = 'hidden'
}
function fecharModal() {
    modalOverlay.classList.remove('active')
    modalOverlay.setAttribute('aria-hidden', 'true')
    document.body.style.overflow = ''
}
cardsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.btnOpen')
    if (!btn) return

    const card = btn.closest('.card')
    const jobId = Number(card.dataset.id)
    const jobEncontrado = trabalhos.find(item => item.id === jobId)

    if (jobEncontrado) {
        abrirModal(jobEncontrado)
    }
})
modalClose.addEventListener('click', fecharModal)
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        fecharModal()
    }
})
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        fecharModal()
    }
})