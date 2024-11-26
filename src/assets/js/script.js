// Seleciona os elementos da página
const nomeHeroiInput = document.getElementById('nomeHeroi');
const xpHeroiInput = document.getElementById('xpHeroi');
const resultado = document.getElementById('resultado');
const somClick = new Audio('src/assets/sounds/click.mp3'); // Carrega o som
const videoContainer = document.getElementById('videoContainer');
const voltarBtn = document.getElementById('voltarBtn'); // Botão para voltar ao vídeo

let player; // Variável para armazenar o player do YouTube
let videoTime = 0; // Variável para armazenar o tempo atual do vídeo

// Função que é chamada quando a API do YouTube está pronta
function onYouTubeIframeAPIReady() {
    player = new YT.Player('videoPlayer', {
        events: {
            'onStateChange': onPlayerStateChange // Detecta mudanças de estado no player
        }
    });
}

// Função chamada quando o estado do player muda
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        videoTime = player.getCurrentTime(); // Salva o tempo atual do vídeo quando ele estiver tocando
    }
}

// Classificação de nível com base no XP e troca de imagem de fundo
const classificarNivel = (xp) => {
    let nivel;
    if (xp < 1000) {
        nivel = 'Ferro';
        document.body.style.backgroundImage = "url('src/assets/images/nivel1.jpg')";
    } else if (xp <= 2000) {
        nivel = 'Bronze';
        document.body.style.backgroundImage = "url('src/assets/images/nivel2.jpg')";
    } else if (xp <= 5000) {
        nivel = 'Prata';
        document.body.style.backgroundImage = "url('src/assets/images/nivel3.jpg')";
    } else if (xp <= 7000) {
        nivel = 'Ouro';
        document.body.style.backgroundImage = "url('src/assets/images/nivel4.jpg')";
    } else if (xp <= 8000) {
        nivel = 'Platina';
        document.body.style.backgroundImage = "url('src/assets/images/nivel5.jpg')";
    } else if (xp <= 9000) {
        nivel = 'Ascendente';
        document.body.style.backgroundImage = "url('src/assets/images/nivel6.jpg')";
    } else if (xp <= 10000) {
        nivel = 'Imortal';
        document.body.style.backgroundImage = "url('src/assets/images/nivel7.jpg')";
    } else {
        nivel = 'Radiante';
        document.body.style.backgroundImage = "url('src/assets/images/nivel8.jpg')";
    }
    return nivel;
};

// Função para classificar o herói, exibir o resultado e ocultar o vídeo
const classificarHeroi = () => {
    const nome = nomeHeroiInput.value;
    const xp = Number(xpHeroiInput.value);

    // Reproduz o som e oculta o vídeo
    somClick.play();
    videoContainer.classList.add('hidden');

    // Salva o tempo atual do vídeo
    if (player) {
        videoTime = player.getCurrentTime();
    }

    // Exibe o resultado e troca a imagem de fundo
    resultado.textContent = `O Herói de nome ${nome} está no nível de ${classificarNivel(xp)}`;

    // Exibe o botão de voltar ao vídeo
    voltarBtn.classList.remove('hidden');

    // Esconde o botão de classificar
    document.getElementById('classificarBtn').classList.add('hidden');
};

// Função para voltar ao vídeo
const voltarParaVideo = () => {
    // Exibe o vídeo e esconde o quadro de resultado
    videoContainer.classList.remove('hidden');
    document.querySelector('.form-container').classList.remove('hidden');
    resultado.textContent = ''; // Limpa o resultado
    
    // Oculta o botão de voltar e mostra novamente o botão de classificar
    voltarBtn.classList.add('hidden');
    document.getElementById('classificarBtn').classList.remove('hidden');

    // Restaura o fundo de vídeo
    document.body.classList.add('video-page');

    // Restaura o tempo do vídeo para o ponto anterior
    if (player) {
        player.seekTo(videoTime, true); // Retorna ao tempo salvo
        player.playVideo(); // Recomeça a reprodução
    }
};

// Adiciona a classe de fundo preto ao body quando a página é carregada
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('video-page');
});

// Adiciona o evento de clique ao botão de classificar
document.getElementById('classificarBtn').addEventListener('click', classificarHeroi);

// Adiciona o evento de clique ao botão de voltar ao vídeo
voltarBtn.addEventListener('click', voltarParaVideo);
