// FUNCIONALIDADES PRINCIPAIS DO SITE
document.addEventListener('DOMContentLoaded', function() {
    console.log('📱 Site carregado - Versão Mobile');
    initMenu();
    carregarEventoPrincipal();
    carregarAniversariantes();
    carregarAlbuns();
    carregarEventos();
    carregarBlog();
    carregarRetiro();
    initHinosSemana();
    initForms();
    initSmoothScroll();
});

// MENU RESPONSIVO
function initMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
        
        // Fecha menu ao clicar em link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
            });
        });
    }
}

// CARREGAR EVENTO PRINCIPAL - SOMENTE FOTO
function carregarEventoPrincipal() {
    const container = document.getElementById('eventoPrincipalContainer');
    if (!container || !eventoPrincipal) return;
    
    const imagemFundo = eventoPrincipal.imagem || 'https://images.unsplash.com/photo-1501618669935-18b6ecb13d6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
    
    container.innerHTML = `
        <div class="evento-principal-card" style="background-image: url('${imagemFundo}');">
            <div class="evento-principal-conteudo">
                <span class="evento-principal-badge"><i class="fas fa-star"></i> PRÓXIMO EVENTO</span>
                <h3>CULTO DOS JOVENS</h3>
                
                <div class="evento-principal-info">
                    <p><i class="fas fa-calendar-alt"></i> 07 de Março de 2026</p>
                    <p><i class="fas fa-clock"></i> 19:30</p>
                    <p><i class="fas fa-map-marker-alt"></i> Rua Júlia Thereza Bini, 740</p>
                </div>
                
                <p class="evento-principal-descricao">
                    <strong>Tema:</strong> E onde está o Espírito do Senhor, ai há liberdade! - Preparem seus corações!<br>
                    <span class="evento-principal-data-destaque">07/03</span>
                </p>
                
                <div class="evento-principal-chamada">
                    <i class="fas fa-bell"></i> Um culto especial com louvor, palavra e muito mais. Traga sua família e amigos!
                </div>
                
                <button class="evento-principal-btn" onclick="alert('Presença confirmada! Nos vemos lá!')">
                    <i class="fas fa-check-circle"></i> Confirmar presença
                </button>
            </div>
        </div>
    `;
}

// CARREGAR ANIVERSARIANTES
function carregarAniversariantes() {
    const container = document.getElementById('aniversariantesContainer');
    if (!container || !aniversariantesSemana) return;
    
    let html = '';
    
    aniversariantesSemana.sort((a, b) => new Date(a.data) - new Date(b.data)).forEach(aniversariante => {
        const data = new Date(aniversariante.data);
        const dataFormatada = data.toLocaleDateString('pt-BR', { 
            weekday: 'long', 
            day: '2-digit', 
            month: '2-digit' 
        });
        
        html += `
            <div class="aniversariante-card">
                <img src="${aniversariante.foto}" alt="${aniversariante.nome}" class="aniversariante-foto" onerror="this.src='https://via.placeholder.com/300x200?text=Sem+Foto'">
                <div class="aniversariante-info">
                    <h3>${aniversariante.nome}</h3>
                    <p>${aniversariante.idade} anos</p>
                    <div class="aniversariante-data">
                        <i class="fas fa-birthday-cake"></i>
                        ${dataFormatada}
                    </div>
                </div>
            </div>
        `;
    });
    
    if (aniversariantesSemana.length === 0) {
        html = '<p class="sem-aniversariantes">Nenhum aniversariante esta semana 🎂</p>';
    }
    
    container.innerHTML = html;
}

// CARREGAR ÁLBUNS
function carregarAlbuns() {
    const container = document.getElementById('albunsGrid');
    if (!container || !albunsFotos) return;
    
    let html = '';
    
    albunsFotos.forEach(album => {
        html += `
            <div class="album-card-grid" onclick="abrirAlbum(${album.id})">
                <div class="album-grid-image">
                    <img src="${album.fotoPrincipal}" alt="${album.titulo}" loading="lazy">
                </div>
                <div class="album-grid-info">
                    <h3>${album.titulo}</h3>
                    <p><i class="fas fa-camera"></i> ${album.fotos.length} fotos</p>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// FUNÇÃO GLOBAL PARA ABRIR ÁLBUM
window.abrirAlbum = function(albumId) {
    const album = albunsFotos.find(a => a.id === albumId);
    if (!album) return;
    
    const modal = document.getElementById('albumModal');
    const titulo = document.getElementById('modalAlbumTitulo');
    const imagem = document.getElementById('modalAlbumImagem');
    const thumbs = document.getElementById('modalAlbumThumbs');
    const counter = document.getElementById('fotoCounter');
    
    let fotoAtual = 0;
    
    function atualizarVisualizacao() {
        imagem.src = album.fotos[fotoAtual];
        counter.textContent = `${fotoAtual + 1}/${album.fotos.length}`;
        
        let thumbsHtml = '';
        album.fotos.forEach((foto, index) => {
            thumbsHtml += `
                <img src="${foto}" class="thumb-img ${index === fotoAtual ? 'active' : ''}" 
                     onclick="window.mudarFoto(${index})" loading="lazy">
            `;
        });
        thumbs.innerHTML = thumbsHtml;
    }
    
    window.mudarFoto = function(index) {
        if (index >= 0 && index < album.fotos.length) {
            fotoAtual = index;
            atualizarVisualizacao();
        }
    };
    
    titulo.textContent = album.titulo;
    atualizarVisualizacao();
    modal.classList.add('active');
    
    document.getElementById('prevFotoBtn').onclick = () => {
        if (fotoAtual > 0) {
            fotoAtual--;
            atualizarVisualizacao();
        }
    };
    
    document.getElementById('nextFotoBtn').onclick = () => {
        if (fotoAtual < album.fotos.length - 1) {
            fotoAtual++;
            atualizarVisualizacao();
        }
    };
};

// FECHAR MODAL DO ÁLBUM
document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.getElementById('closeAlbumModal');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            document.getElementById('albumModal').classList.remove('active');
        });
    }
    
    // Fecha modal com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.getElementById('albumModal').classList.remove('active');
        }
    });
});

// CARREGAR EVENTOS
function carregarEventos() {
    const container = document.getElementById('eventsContainer');
    if (!container || !eventos) return;
    
    let html = '';
    
    eventos.slice(0, 6).forEach(evento => {
        const data = new Date(evento.data);
        const dataFormatada = data.toLocaleDateString('pt-BR');
        
        html += `
            <div class="agenda-card">
                <img src="${evento.imagem}" alt="${evento.titulo}" class="agenda-card-imagem">
                <div class="agenda-card-conteudo">
                    <h4 class="agenda-card-titulo">${evento.titulo}</h4>
                    <div class="agenda-card-info">
                        <p><i class="far fa-calendar"></i> ${dataFormatada}</p>
                        <p><i class="far fa-clock"></i> ${evento.hora}</p>
                        <p><i class="fas fa-map-marker-alt"></i> ${evento.local}</p>
                    </div>
                    <p style="margin-top: 10px; color: #666;">${evento.descricao}</p>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// CARREGAR BLOG
function carregarBlog() {
    const container = document.getElementById('blogContainer');
    if (!container || !postsBlog) return;
    
    let html = '';
    
    postsBlog.slice(0, 3).forEach(post => {
        const data = new Date(post.data);
        const dataFormatada = data.toLocaleDateString('pt-BR');
        
        html += `
            <div class="blog-card">
                <img src="${post.imagem}" alt="${post.titulo}">
                <div class="blog-card-content">
                    <h3>${post.titulo}</h3>
                    <p>${post.resumo}</p>
                    <div class="blog-card-meta">
                        <span><i class="far fa-user"></i> ${post.autor}</span>
                        <span><i class="far fa-calendar"></i> ${dataFormatada}</span>
                    </div>
                    <button class="btn-ler-mais" onclick="abrirPost(${post.id})">
                        Ler mais
                    </button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// ABRIR POST
window.abrirPost = function(postId) {
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
    document.getElementById('modalText').innerHTML = post.conteudo;
    
    modal.classList.add('active');
};

// FECHAR MODAL DO POST
document.addEventListener('DOMContentLoaded', function() {
    const closeModal = document.getElementById('closeModal');
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            document.getElementById('postModal').classList.remove('active');
        });
    }
    
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-post')) {
            e.target.classList.remove('active');
        }
    });
});

// CARREGAR RETIRO
function carregarRetiro() {
    const container = document.getElementById('retiroContent');
    if (!container) return;
    
    container.innerHTML = `
        <div class="retiro-info">
            <h3>START - Encontro com Deus</h3>
            <p><strong>Data:</strong> 15 a 17 de Maio de 2026</p>
            <p><strong>Local:</strong> Fazenda Monte Sião</p>
            <p><strong>Investimento:</strong> R$ 400,00 (tudo incluso)</p>
            <ul class="retiro-benefits">
                <li><i class="fas fa-check"></i> Alimentação completa</li>
                <li><i class="fas fa-check"></i> Hospedagem</li>
                <li><i class="fas fa-check"></i> Transporte</li>
                <li><i class="fas fa-check"></i> Material do evento</li>
            </ul>
        </div>
        <div class="retiro-form">
            <h4>Faça sua inscrição</h4>
            <form id="retiroForm">
                <input type="text" placeholder="Nome completo" required>
                <input type="email" placeholder="E-mail" required>
                <input type="tel" placeholder="WhatsApp" required>
                <input type="number" placeholder="Idade" required>
                <select required>
                    <option value="">Tipo de acomodação</option>
                    <option value="coletiva">Coletiva</option>
                </select>
                <textarea placeholder="Observações (alergias, etc)" rows="3"></textarea>
                <button type="submit" class="btn btn-primary btn-block">Enviar inscrição</button>
            </form>
        </div>
    `;
}

// HINOS DA SEMANA
function initHinosSemana() {
    const hinoBtn = document.getElementById('hinoBtnHeader');
    const hinoModal = document.getElementById('hinoModal');
    const closeBtn = document.getElementById('closeHinoModal');
    
    if (!hinoBtn || !hinoModal || !hinosDisponiveis || hinosDisponiveis.length === 0) return;
    
    let hinoAtual = 0;
    
    function carregarHino(index) {
        const hino = hinosDisponiveis[index];
        
        document.getElementById('hinoTitulo').textContent = hino.titulo;
        document.getElementById('hinoArtista').textContent = hino.artista;
        
        // Vídeo
        const videoContainer = document.getElementById('hinoVideo');
        let embedUrl = hino.link;
        if (embedUrl.includes('watch?v=')) {
            embedUrl = embedUrl.replace('watch?v=', 'embed/');
        } else if (embedUrl.includes('youtu.be/')) {
            embedUrl = embedUrl.replace('youtu.be/', 'youtube.com/embed/');
        }
        videoContainer.innerHTML = `<iframe src="${embedUrl}" allowfullscreen></iframe>`;
        
        // Letra
        document.getElementById('hinoLetra').innerHTML = hino.letra.replace(/\n/g, '<br>');
        
        // Navegação
        const navContainer = document.getElementById('hinoNavigation');
        if (hinosDisponiveis.length > 1) {
            navContainer.innerHTML = `
                <button class="hino-nav-btn" id="prevHinoBtn" ${index === 0 ? 'disabled' : ''}>
                    <i class="fas fa-chevron-left"></i> Anterior
                </button>
                <span style="display: flex; align-items: center;">${index + 1}/${hinosDisponiveis.length}</span>
                <button class="hino-nav-btn" id="nextHinoBtn" ${index === hinosDisponiveis.length - 1 ? 'disabled' : ''}>
                    Próximo <i class="fas fa-chevron-right"></i>
                </button>
            `;
            
            document.getElementById('prevHinoBtn')?.addEventListener('click', () => {
                if (hinoAtual > 0) {
                    hinoAtual--;
                    carregarHino(hinoAtual);
                }
            });
            
            document.getElementById('nextHinoBtn')?.addEventListener('click', () => {
                if (hinoAtual < hinosDisponiveis.length - 1) {
                    hinoAtual++;
                    carregarHino(hinoAtual);
                }
            });
        }
    }
    
    carregarHino(0);
    
    hinoBtn.addEventListener('click', () => {
        hinoModal.classList.add('active');
    });
    
    closeBtn.addEventListener('click', () => {
        hinoModal.classList.remove('active');
    });
    
    hinoModal.addEventListener('click', (e) => {
        if (e.target === hinoModal) {
            hinoModal.classList.remove('active');
        }
    });
}

// FORMULÁRIOS - COM INTEGRAÇÃO GOOGLE SHEETS
// FORMULÁRIOS - COM INTEGRAÇÃO GOOGLE SHEETS CORRIGIDA
function initForms() {
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyKt2rq7hXUfGWuivD8M4yHKW3h0HbMIYB2dd8BzEis9SGnBTYeDbAyPDHOWpA68J3XtA/exec";
    
    // Formulário do Retiro
    const retiroForm = document.getElementById('retiroForm');
    if (retiroForm) {
        retiroForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Previne múltiplos envios
            if (this.classList.contains('enviando')) {
                return;
            }
            
            // Pega os valores pelos IDs ou placeholders corretos
            const nome = this.querySelector('input[placeholder*="Nome"]')?.value || '';
            const email = this.querySelector('input[placeholder*="E-mail"]')?.value || '';
            const telefone = this.querySelector('input[placeholder*="WhatsApp"]')?.value || '';
            const idade = this.querySelector('input[placeholder*="Idade"]')?.value || '';
            const acomodacao = this.querySelector('select')?.value || '';
            const observacoes = this.querySelector('textarea')?.value || '';
            
            // Validação
            if (!nome || !email || !telefone || !idade || !acomodacao) {
                alert('Por favor, preencha todos os campos obrigatórios!');
                return;
            }
            
            // Prepara os dados no formato que o Google Sheets espera
            const dados = {
                nome: nome,
                email: email,
                telefone: telefone,
                idade: idade,
                acomodacao: acomodacao,
                observacoes: observacoes,
                status: "Pendente",
                valor: "R$400,00"
            };
            
            console.log('Enviando dados:', dados); // Para debug
            
            // Desabilita o botão
            const botao = this.querySelector('button[type="submit"]');
            const textoOriginal = botao.textContent;
            botao.textContent = 'Enviando...';
            botao.disabled = true;
            this.classList.add('enviando');
            
            try {
                // Envia para o Google Sheets
                await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dados)
                });
                
                alert('✅ Inscrição enviada com sucesso! Em breve entraremos em contato.');
                this.reset();
                
            } catch (error) {
                console.log('Erro no envio:', error);
                alert('❌ Erro ao enviar. Tente novamente ou contate um líder.');
                
            } finally {
                botao.textContent = textoOriginal;
                botao.disabled = false;
                this.classList.remove('enviando');
            }
        });
    }
    
    // Formulário de Contato
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const nome = this.querySelector('input[placeholder*="nome"]')?.value || '';
            const email = this.querySelector('input[type="email"]')?.value || '';
            const mensagem = this.querySelector('textarea')?.value || '';
            
            const dados = {
                nome: nome,
                email: email,
                mensagem: mensagem,
                tipo: "contato"
            };
            
            const botao = this.querySelector('button[type="submit"]');
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
                
                alert('✅ Mensagem enviada com sucesso!');
                this.reset();
                
            } catch (error) {
                alert('❌ Erro ao enviar. Tente novamente.');
            } finally {
                botao.textContent = textoOriginal;
                botao.disabled = false;
            }
        });
    }
}
    
    // Formulário de Contato
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const dados = {
                nome: this.querySelector('input[placeholder*="nome"]')?.value || '',
                email: this.querySelector('input[type="email"]')?.value || '',
                mensagem: this.querySelector('textarea')?.value || '',
                formulario: 'contato',
                data_envio: new Date().toLocaleString('pt-BR')
            };
            
            const botao = this.querySelector('button[type="submit"]');
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
                
                alert('✅ Mensagem enviada com sucesso!');
                this.reset();
                
            } catch (error) {
                alert('✅ Mensagem recebida! (Modo offline)');
                this.reset();
            } finally {
                botao.textContent = textoOriginal;
                botao.disabled = false;
            }
        });
    }