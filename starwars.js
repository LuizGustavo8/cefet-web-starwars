// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.info/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução

const API_ENDPOINT = 'https://swapi.info/api'

// Exercício 1: importar o player de música
import { play } from './music.js'
// Exercício 2: importar conversor de romano
import { toRoman } from './roman.js'
// Exercício 3: importar restart da animação
import { restartAnimation } from './restart-animation.js'
// Opcional 5: importar friendlyFetch com cache
import { friendlyFetch } from './friendly-fetch.js'

// Exercício 1: tocar a música tema
play(
  {
    audioUrl: 'audio/tema-sw.mp3',
    coverImageUrl: 'imgs/logo.svg',
    title: 'Intro',
    artist: 'John Williams'
  },
  document.body
)

// Exercício 2: buscar filmes e preencher a lista
const ulEl = document.querySelector('#filmes ul')
const introEl = document.querySelector('pre.introducao')

async function carregarFilmes() {
  const filmes = await friendlyFetch(`${API_ENDPOINT}/films`)

  // Opcional 4: ordenar por episode_id
  filmes.sort((a, b) => a.episode_id - b.episode_id)

  filmes.forEach(filme => {
    const romano = toRoman(filme.episode_id).padEnd(5, ' ')
    const li = document.createElement('li')
    li.textContent = `Episode ${romano} - ${filme.title}`

    // Exercício 3: ao clicar, exibir a intro do filme
    li.addEventListener('click', () => {
      const texto = `Episode ${toRoman(filme.episode_id)}\n${filme.title.toUpperCase()}\n\n${filme.opening_crawl}`
      introEl.textContent = texto
      restartAnimation(introEl)
    })

    ulEl.appendChild(li)
  })
}

carregarFilmes()