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
        tipo: 'Desenvolvimento Web',
        foto: 'jobs/linkbio.webp',
        descricao: 'Projeto de um website Agregador de Links no estilo LinkTree, que permite a utilização de um único link em páginas de redes sociais, direcionando o usuário para diversos perfis e páginas.',
        link: 'https://fhricardo.github.io/agregador-de-links-front-end-1i-2026/'
    },
    {
        id: 2,
        title: 'Lista de Tarefas com localStorage',
        tipo: 'Desenvolvimento Web',
        foto: 'jobs/todolist.webp',
        descricao: 'O projeto tem como objetivo criar uma lista de tarefas (to-do list) que pode ser alimentada dinamicamente e fica armazenada locamente utilizando o recurso localStorage do JavaScript',
        link: 'https://fhricardo.github.io/to-do-list-front-end-1i-2026/'
    },
    {
        id: 3,
        title: 'Catálogo de Produtos',
        tipo: 'Desenvolvimwento Web',
        foto: 'jobs/catalogo.webp',
        descricao: 'O projeto tem como objetivo criar um catálogo de produtos dinâmico utilizando HTML, CSS e JavaScript puro. Os produtos são carregados a partir de um arquivo JSON e exibidos em uma interface responsiva que permite busca, filtragem, ordenação, paginação e visualização detalhada dos itens.',
        link: 'https://fhricardo.github.io/catalogo-de-produtos-front-end-1i-2026/'
    },
    {
        id: 4,
        title: 'Nike Air Jordan - Página de Detalhes',
        tipo: 'Desenvolvimwento Web',
        foto: 'jobs/nike.webp',
        descricao: 'Projeto prático de desenvolvimento web front-end focado na construção de uma página de exibição e detalhes do tênis Nike Air Jordan, com foco em semântica HTML, estilização moderna, responsividade e experiência do usuário (UX/UI).',
        link: 'https://fhricardo.github.io/nike-air-jordan-detalhes/'
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
// Menu
const btnMenu = document.getElementById('btnMenu')
const nav = document.querySelector('nav')

function toggleMenu(forceClose = false) {
    const isHidden = window.getComputedStyle(nav).display === 'none'

    if (forceClose) {
        nav.style.display = 'none'
        btnMenu?.setAttribute('aria-expanded', 'false')
        return
    }

    const nextState = isHidden ? 'flex' : 'none'
    nav.style.display = nextState
    btnMenu?.setAttribute('aria-expanded', String(isHidden))
}

// Alternar ao clicar no botão
btnMenu?.addEventListener('click', (e) => {
    e.stopPropagation()
    toggleMenu()
})

// Fechar com a tecla Escape
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        toggleMenu(true)
    }
})

// Fechar ao clicar fora (apenas em telas menores)
document.addEventListener('click', (e) => {
    if (window.innerWidth < 1025) {
        if (nav && !nav.contains(e.target) && !btnMenu?.contains(e.target)) {
            toggleMenu(true)
        }
    }
})

// Tratar redimensionamento dinâmico
window.addEventListener('resize', () => {
    if (window.innerWidth >= 1025) {
        // Remove o inline style para deixar o CSS Desktop mandar
        nav.style.removeProperty('display')
        btnMenu?.setAttribute('aria-expanded', 'false')
    } else {
        // Garante que comece fechado se voltar para mobile
        nav.style.display = 'none'
    }
})