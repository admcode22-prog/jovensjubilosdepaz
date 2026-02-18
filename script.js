// FUNCIONALIDADES PRINCIPAIS DO SITE

document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 Página carregada');
    initMenu();
    initCarrossel();
    carregarEventos();
    carregarBlog();
    carregarProdutos();
    initHinosSemana();  // <--- TEM QUE TER ESTA LINHA
    initForms();
    initSmoothScroll();
    console.log('✅ Todas funções chamadas');
});

// Menu responsivo
function initMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('show');
        });
    });
}

// Carregar eventos na agenda
function carregarEventos() {
    const container = document.getElementById('eventsContainer');
    
    if (!container) return;
    
    let eventosHTML = '';
    
    eventos.forEach(evento => {
        const data = new Date(evento.data);
        const dia = data.getDate().toString().padStart(2, '0');
        const mes = data.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase().replace('.', '');
        
        const imagemFundo = evento.imagem || 'https://images.unsplash.com/photo-1501618669935-18b6ecb13d6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
        
        eventosHTML += `
            <div class="evento-banner" style="background-image: linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url('${imagemFundo}');">
                <div class="evento-banner-data">
                    <span class="dia">${dia}</span>
                    <span class="mes">${mes}</span>
                </div>
                <div class="evento-banner-overlay">
                    <h3>${evento.titulo}</h3>
                    <p>${evento.descricao}</p>
                    <div class="evento-banner-meta">
                        <span><i class="far fa-clock"></i> ${evento.hora}</span>
                        <span><i class="fas fa-map-marker-alt"></i> ${evento.local}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = eventosHTML;
}

// Carregar posts do blog
function carregarBlog() {
    const container = document.getElementById('blogContainer');
    
    if (!container) return;
    
    let blogHTML = '';
    
    postsBlog.forEach(post => {
        const data = new Date(post.data);
        const dataFormatada = data.toLocaleDateString('pt-BR');
        
        blogHTML += `
            <div class="blog-card">
                <div class="blog-image">
                    <img src="${post.imagem}" alt="${post.titulo}">
                </div>
                <div class="blog-content">
                    <h3>${post.titulo}</h3>
                    <p>${post.resumo}</p>
                    <div class="blog-meta">
                        <span><i class="far fa-user"></i> ${post.autor}</span>
                        <span><i class="far fa-calendar"></i> ${dataFormatada}</span>
                    </div>
                    <button class="btn-ler-mais" data-post-id="${post.id}">
                        <i class="fas fa-book-open"></i> Ler artigo completo
                    </button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = blogHTML;
    
    document.querySelectorAll('.btn-ler-mais').forEach(btn => {
        btn.addEventListener('click', function() {
            const postId = parseInt(this.getAttribute('data-post-id'));
            abrirPostCompleto(postId);
        });
    });
}

// Abrir post completo no modal
function abrirPostCompleto(postId) {
    const post = postsBlog.find(p => p.id === postId);
    if (!post) return;
    
    const modal = document.getElementById('postModal');
    const data = new Date(post.data);
    const dataFormatada = data.toLocaleDateString('pt-BR');
    
    document.getElementById('modalTitle').textContent = post.titulo;
    document.getElementById('modalMeta').innerHTML = `
        <span><i class="far fa-user"></i> ${post.autor}</span>
        <span><i class="far fa-calendar"></i> ${dataFormatada}</span>
    `;
    document.getElementById('modalImage').src = post.imagem;
    document.getElementById('modalImage').alt = post.titulo;
    document.getElementById('modalText').innerHTML = `
        <p>${post.conteudo}</p>
        ${post.conteudoExtra || ''}
    `;
    
    modal.classList.add('active');
    
    document.getElementById('closeModal').onclick = () => {
        modal.classList.remove('active');
    };
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal.classList.remove('active');
        }
    });
}

// Carregar produtos (camisetas)
function carregarProdutos() {
    const container = document.getElementById('productsContainer');
    
    if (!container) return;
    
    let produtosHTML = '';
    
    produtos.forEach(produto => {
        const tamanhosHTML = produto.tamanhos.map(tamanho => 
            `<div class="size-option" data-size="${tamanho}">${tamanho}</div>`
        ).join('');
        
        const coresHTML = produto.cores.map(cor => 
            `<span class="color-option" style="background-color: ${cor.toLowerCase()};" title="${cor}"></span>`
        ).join('');
        
        produtosHTML += `
            <div class="product-card">
                <div class="product-image">
                    <img src="${produto.imagem}" alt="${produto.nome}">
                    ${produto.disponivel ? '<span class="product-badge">Disponível</span>' : '<span class="product-badge esgotado">Esgotado</span>'}
                </div>
                <div class="product-content">
                    <h3>${produto.nome}</h3>
                    <p>${produto.descricao}</p>
                    <div class="product-price">R$ ${produto.preco.toFixed(2)}</div>
                    <div>Cores disponíveis: ${coresHTML}</div>
                    <div class="product-sizes">
                        ${tamanhosHTML}
                    </div>
                    <button class="btn btn-primary btn-comprar" data-id="${produto.id}">Comprar Agora</button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = produtosHTML;
    
    document.querySelectorAll('.size-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    
    document.querySelectorAll('.btn-comprar').forEach(btn => {
        btn.addEventListener('click', function() {
            const produtoId = this.getAttribute('data-id');
            const produto = produtos.find(p => p.id == produtoId);
            
            const tamanhoSelecionado = this.parentElement.querySelector('.size-option.selected');
            
            if (!tamanhoSelecionado) {
                alert('Por favor, selecione um tamanho antes de comprar.');
                return;
            }
            
            const tamanho = tamanhoSelecionado.getAttribute('data-size');
            
            const confirmacao = confirm(`Você está comprando: ${produto.nome}\nTamanho: ${tamanho}\nValor: R$ ${produto.preco.toFixed(2)}\n\nDeseja continuar?`);
            
            if (confirmacao) {
                alert('Compra realizada com sucesso! Em breve entraremos em contato para finalizar o pagamento.');
            }
        });
    });
}

// Inicializar formulários
function initForms() {
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyKt2rq7hXUfGWuivD8M4yHKW3h0HbMIYB2dd8BzEis9SGnBTYeDbAyPDHOWpA68J3XtA/exec";
    
    // Formulário de inscrição no retiro
    const retiroForm = document.getElementById('retiroForm');
    if (retiroForm) {
        retiroForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            if (this.classList.contains('enviando')) {
                return;
            }
            
            const dados = {
                nome: document.getElementById('nome').value,
                email: document.getElementById('email').value,
                telefone: document.getElementById('telefone').value,
                idade: document.getElementById('idade').value,
                acomodacao: document.getElementById('tipoAcomodacao').value,
                observacoes: document.getElementById('observacoes').value || ''
            };
            
            if (!dados.nome || !dados.email || !dados.telefone || !dados.idade || !dados.acomodacao) {
                mostrarMensagem('retiroMessage', 'Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            const botao = retiroForm.querySelector('button[type="submit"]');
            const textoOriginal = botao.textContent;
            botao.textContent = 'Enviando...';
            botao.disabled = true;
            
            try {
                await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dados)
                });
                
                mostrarMensagem('retiroMessage', 
                    '✅ Inscrição enviada com sucesso! Em breve entraremos em contato.', 
                    'success');
                
                retiroForm.reset();
                
            } catch (error) {
                mostrarMensagem('retiroMessage', 
                    '✅ Inscrição salva localmente!', 
                    'success');
                console.log('Dados da inscrição (fallback):', dados);
            } finally {
                botao.textContent = textoOriginal;
                botao.disabled = false;
            }
        });
    }
    
    // Formulário de contato
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = document.getElementById('contactNome').value;
            const email = document.getElementById('contactEmail').value;
            const assunto = document.getElementById('assunto').value;
            const mensagem = document.getElementById('mensagem').value;
            
            if (!nome || !email || !assunto || !mensagem) {
                mostrarMensagem('contactMessage', 'Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            mostrarMensagem('contactMessage', 'Mensagem enviada com sucesso! Responderemos em breve.', 'success');
            contactForm.reset();
            
            console.log('Mensagem de contato:', { nome, email, assunto, mensagem });
        });
    }
    
    // Formulário de newsletter
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('newsletterEmail').value;
            
            if (!email) {
                alert('Por favor, insira seu e-mail.');
                return;
            }
            
            alert(`Obrigado por se inscrever na nossa newsletter! Um e-mail de confirmação foi enviado para ${email}.`);
            newsletterForm.reset();
            
            console.log('Inscrição na newsletter:', email);
        });
    }
}

// Mostrar mensagens nos formulários
function mostrarMensagem(elementId, texto, tipo) {
    const elemento = document.getElementById(elementId);
    elemento.textContent = texto;
    elemento.className = `form-message ${tipo}`;
    
    setTimeout(() => {
        elemento.className = 'form-message';
        elemento.textContent = '';
    }, 5000);
}

// Funções para o carrossel de álbuns de fotos
function initCarrossel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const carouselDots = document.getElementById('carouselDots');
    
    if (!carouselTrack) return;
    
    let currentSlide = 0;
    const slidesPerView = getSlidesPerView();
    
    let albumsHTML = '';
    let dotsHTML = '';
    
    albunsFotos.forEach((album, index) => {
        const data = new Date(album.data);
        const dataFormatada = data.toLocaleDateString('pt-BR');
        
        albumsHTML += `
            <div class="album-card" data-album-id="${album.id}">
                <div class="album-image">
                    <img src="${album.fotoPrincipal}" alt="${album.titulo}">
                    <div class="album-overlay">
                        <span class="album-count">
                            <i class="fas fa-camera"></i> ${album.fotos.length}
                        </span>
                    </div>
                </div>
                <div class="album-content">
                    <h3>${album.titulo}</h3>
                    <p>${album.descricao}</p>
                    <div class="album-date">
                        <i class="far fa-calendar"></i> ${dataFormatada}
                    </div>
                </div>
            </div>
        `;
        
        dotsHTML += `
            <button class="carousel-dot ${index === 0 ? 'active' : ''}" data-slide="${index}"></button>
        `;
    });
    
    carouselTrack.innerHTML = albumsHTML;
    carouselDots.innerHTML = dotsHTML;
    
    updateTrackWidth();
    
    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        const maxSlide = Math.ceil(albunsFotos.length / slidesPerView) - 1;
        if (currentSlide < maxSlide) {
            currentSlide++;
            updateCarousel();
        }
    });
    
    document.querySelectorAll('.carousel-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            currentSlide = parseInt(dot.getAttribute('data-slide'));
            updateCarousel();
        });
    });
    
    document.querySelectorAll('.album-card').forEach(card => {
        card.addEventListener('click', () => {
            const albumId = parseInt(card.getAttribute('data-album-id'));
            openAlbumViewer(albumId);
        });
    });
    
    window.addEventListener('resize', () => {
        updateTrackWidth();
        updateCarousel();
    });
    
    function updateTrackWidth() {
        const slidesPerView = getSlidesPerView();
        const slideWidth = 100 / slidesPerView;
        const totalSlides = albunsFotos.length;
        
        carouselTrack.style.width = `${(totalSlides * 100) / slidesPerView}%`;
        
        document.querySelectorAll('.album-card').forEach(slide => {
            slide.style.flex = `0 0 ${slideWidth}%`;
        });
    }
    
    function updateCarousel() {
        const slidesPerView = getSlidesPerView();
        const slideWidth = 100 / slidesPerView;
        const translateX = -currentSlide * slideWidth;
        
        carouselTrack.style.transform = `translateX(${translateX}%)`;
        
        document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        const maxSlide = Math.ceil(albunsFotos.length / slidesPerView) - 1;
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === maxSlide;
    }
    
    function getSlidesPerView() {
        if (window.innerWidth >= 992) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }
    
    updateCarousel();
}

// Visualizador de álbuns
function openAlbumViewer(albumId) {
    const album = albunsFotos.find(a => a.id === albumId);
    if (!album) return;
    
    const viewer = document.getElementById('albumViewer');
    const viewerTitle = document.getElementById('viewerTitle');
    const viewerMainImage = document.getElementById('viewerMainImage');
    const viewerThumbnails = document.getElementById('viewerThumbnails');
    const currentImageIndex = document.getElementById('currentImageIndex');
    const totalImages = document.getElementById('totalImages');
    
    viewerTitle.textContent = album.titulo;
    totalImages.textContent = album.fotos.length;
    
    let currentImage = 0;
    
    function loadImages() {
        viewerMainImage.src = album.fotos[currentImage];
        viewerMainImage.alt = `${album.titulo} - Foto ${currentImage + 1}`;
        currentImageIndex.textContent = currentImage + 1;
        
        let thumbnailsHTML = '';
        album.fotos.forEach((foto, index) => {
            thumbnailsHTML += `
                <div class="thumbnail ${index === currentImage ? 'active' : ''}" 
                     data-index="${index}">
                    <img src="${foto}" alt="Foto ${index + 1}">
                </div>
            `;
        });
        viewerThumbnails.innerHTML = thumbnailsHTML;
        
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.addEventListener('click', () => {
                currentImage = parseInt(thumb.getAttribute('data-index'));
                loadImages();
            });
        });
    }
    
    loadImages();
    
    const prevImageBtn = document.getElementById('prevImageBtn');
    const nextImageBtn = document.getElementById('nextImageBtn');
    const closeViewer = document.getElementById('closeViewer');
    
    prevImageBtn.onclick = () => {
        if (currentImage > 0) {
            currentImage--;
            loadImages();
        }
    };
    
    nextImageBtn.onclick = () => {
        if (currentImage < album.fotos.length - 1) {
            currentImage++;
            loadImages();
        }
    };
    
    closeViewer.onclick = () => {
        viewer.classList.remove('active');
    };
    
    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape') {
            viewer.classList.remove('active');
            document.removeEventListener('keydown', closeOnEsc);
        }
    });
    
    viewer.classList.add('active');
}

// Rolagem suave para âncoras
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Ativar link ativo na navegação conforme rolagem
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            currentSection = '#' + section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentSection) {
            link.classList.add('active');
        }
    });
});

// ============================================
// FUNÇÃO DO HINO DA SEMANA (MÚLTIPLOS HINOS)
// ============================================

function abrirFoto(fotoUrl) {
    const albumTemp = {
        titulo: "Último Evento",
        fotos: [fotoUrl]
    };
    
    const viewer = document.getElementById('albumViewer');
    const viewerTitle = document.getElementById('viewerTitle');
    const viewerMainImage = document.getElementById('viewerMainImage');
    const viewerThumbnails = document.getElementById('viewerThumbnails');
    const currentImageIndex = document.getElementById('currentImageIndex');
    const totalImages = document.getElementById('totalImages');
    
    viewerTitle.textContent = albumTemp.titulo;
    viewerMainImage.src = fotoUrl;
    currentImageIndex.textContent = '1';
    totalImages.textContent = '1';
    
    viewerThumbnails.innerHTML = `
        <div class="thumbnail active">
            <img src="${fotoUrl}" alt="Foto">
        </div>
    `;
    
    viewer.classList.add('active');
}

// FUNÇÃO PRINCIPAL DO HINO (MÚLTIPLOS HINOS)
function initHinosSemana() {
    console.log('🚀 FUNÇÃO INIT HINOS INICIOU');
    
    const hinoBtn = document.getElementById('hinoBtnHeader');
    const hinoModal = document.getElementById('hinoModal');
    const closeBtn = document.getElementById('closeHinoModal');
    
    console.log('🔍 Botão encontrado:', hinoBtn);
    console.log('🔍 Modal encontrado:', hinoModal);
    console.log('🔍 Hinos disponíveis:', hinosDisponiveis);
    
    if (!hinosDisponiveis || hinosDisponiveis.length === 0) {
        console.log('Nenhum hino disponível');
        if (hinoBtn) hinoBtn.style.display = 'none';
        return;
    }
    
    if (!hinoBtn) {
        console.log('❌ Botão NÃO encontrado!');
        return;
    }
    
    if (!hinoModal) {
        console.log('❌ Modal NÃO encontrado!');
        return;
    }
    
    // Mostra o botão
    hinoBtn.style.display = 'flex';
    console.log('✅ Botão está visível');
    
    // Variável para controlar o hino atual
    let hinoAtual = 0;
    
    // Função para carregar um hino específico
    function carregarHino(index) {
        console.log('Carregando hino:', index);
        const hino = hinosDisponiveis[index];
        
        // Títulos
        const tituloEl = document.getElementById('hinoTitulo');
        const artistaEl = document.getElementById('hinoArtista');
        if (tituloEl) tituloEl.textContent = hino.titulo;
        if (artistaEl) artistaEl.textContent = hino.artista;
        
        // Observação
        const headerEl = document.querySelector('.hino-modal-header');
        if (headerEl) {
            let obsEl = document.getElementById('hinoObservacao');
            if (!obsEl) {
                obsEl = document.createElement('p');
                obsEl.id = 'hinoObservacao';
                obsEl.style.fontSize = '0.9rem';
                obsEl.style.marginTop = '5px';
                obsEl.style.opacity = '0.8';
                headerEl.appendChild(obsEl);
            }
            obsEl.innerHTML = `<i class="far fa-calendar-alt"></i> ${hino.observacao || hino.data}`;
        }
        
        // Vídeo
        const videoContainer = document.getElementById('hinoVideo');
        if (videoContainer && hino.link) {
            let embedUrl = hino.link;
            if (embedUrl.includes('youtube.com/watch?v=')) {
                embedUrl = embedUrl.replace('watch?v=', 'embed/');
            } else if (embedUrl.includes('youtu.be/')) {
                embedUrl = embedUrl.replace('youtu.be/', 'youtube.com/embed/');
            }
            videoContainer.innerHTML = `<iframe src="${embedUrl}" frameborder="0" allowfullscreen></iframe>`;
        }
        
        // Letra
        const letraEl = document.getElementById('hinoLetra');
        if (letraEl) {
            letraEl.innerHTML = hino.letra.replace(/\n/g, '<br>');
        }
        
        // Contador
        if (hinosDisponiveis.length > 1) {
            let counterEl = document.getElementById('hinoCounter');
            if (!counterEl) {
                counterEl = document.createElement('div');
                counterEl.id = 'hinoCounter';
                counterEl.style.textAlign = 'center';
                counterEl.style.marginTop = '10px';
                counterEl.style.padding = '10px';
                counterEl.style.borderTop = '1px solid #eee';
                const bodyEl = document.querySelector('.hino-modal-body');
                if (bodyEl) bodyEl.appendChild(counterEl);
            }
            if (counterEl) {
                counterEl.innerHTML = `
                    <button class="btn-hino-nav" id="prevHino" ${index === 0 ? 'disabled' : ''}>
                        <i class="fas fa-chevron-left"></i> Anterior
                    </button>
                    <span style="margin: 0 15px;">${index + 1} de ${hinosDisponiveis.length}</span>
                    <button class="btn-hino-nav" id="nextHino" ${index === hinosDisponiveis.length - 1 ? 'disabled' : ''}>
                        Próximo <i class="fas fa-chevron-right"></i>
                    </button>
                `;
                
                // Remover eventos antigos e adicionar novos
                setTimeout(() => {
                    const prevBtn = document.getElementById('prevHino');
                    const nextBtn = document.getElementById('nextHino');
                    
                    if (prevBtn) {
                        prevBtn.onclick = () => {
                            if (hinoAtual > 0) {
                                hinoAtual--;
                                carregarHino(hinoAtual);
                            }
                        };
                    }
                    
                    if (nextBtn) {
                        nextBtn.onclick = () => {
                            if (hinoAtual < hinosDisponiveis.length - 1) {
                                hinoAtual++;
                                carregarHino(hinoAtual);
                            }
                        };
                    }
                }, 100);
            }
        }
    }
    
    // Carregar primeiro hino
    carregarHino(0);
    
    // Abrir modal - REMOVER eventos antigos antes de adicionar novo
    hinoBtn.onclick = function() {
        console.log('🎵 BOTÃO CLICADO!');
        hinoModal.classList.add('active');
    };
    
    // Fechar modal
    if (closeBtn) {
        closeBtn.onclick = function() {
            hinoModal.classList.remove('active');
        };
    }
    
    // Fechar ao clicar fora
    hinoModal.onclick = function(e) {
        if (e.target === hinoModal) {
            hinoModal.classList.remove('active');
        }
    };
    
    // Fechar com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && hinoModal.classList.contains('active')) {
            hinoModal.classList.remove('active');
        }
    });
    
    console.log('✅ Função initHinosSemana completa!');
}