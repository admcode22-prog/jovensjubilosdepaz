// ARQUIVO DE DADOS - ATUALIZE AQUI PARA MODIFICAR O CONTEÚDO DO SITE

// Dados dos eventos (agenda)
const eventos = [
    {
        id: 1,
        titulo: "Ensaio - Jovens",
        data: "2026-02-08",
        hora: "18:00", // CORRIGIDO: era "60:00"
        local: "Rua Júlia Thereza Bini, 740",
        descricao: "Venha ensaiar conosco, ter um momento com Deus!",
        imagem: "https://images.unsplash.com/photo-1501618669935-18b6ecb13d6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        titulo: "Culto - Jovens",
        data: "2026-02-08",
        hora: "19:30",
        local: "Rua Júlia Thereza Bini, 740",
        descricao: "Venha cultuar conosco nesse dia especial. Traga sua Bíblia e um amigo!",
        imagem: "https://images.unsplash.com/photo-1534237710431-e2fc698436d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        titulo: "Escola Bíblica dominical",
        data: "2026-02-09",
        hora: "09:00",
        local: "Rua Júlia Thereza Bini, 740",
        descricao: "Venha aprender mais sobre a Bíblia conosco!",
        imagem: "https://images.unsplash.com/photo-1534237710431-e2fc698436d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        titulo: "Inicio Retiro 2026",
        data: "2026-05-16",
        hora: "08:00",
        local: "Fazenda Monte Sião",
        descricao: "Retiro anual dos jovens. Inscrições abertas!",
        imagem: "https://images.unsplash.com/photo-1549056572-75914d5d03fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        titulo: "Continuação Retiro 2026",
        data: "2026-05-17",
        hora: "08:00",
        local: "Fazenda Monte Sião",
        descricao: "Retiro anual dos jovens. Inscrições abertas!",
        imagem: "https://images.unsplash.com/photo-1549056572-75914d5d03fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        titulo: "Finalização Retiro 2026",
        data: "2026-05-18",
        hora: "08:00",
        local: "Fazenda Monte Sião",
        descricao: "Retiro anual dos jovens. Inscrições abertas!",
        imagem: "https://images.unsplash.com/photo-1549056572-75914d5d03fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
];

// Dados do blog (recados) - APENAS UMA VEZ!
const postsBlog = [
    {
        id: 1,
        titulo: "Bem-vindos ao Novo Ano 2026",
        data: "2026-02-04",
        autor: "Andressa Miotto",
        resumo: "Neste novo ano ministerial, convidamos todos os jovens a se engajarem nas atividades e crescerem juntos na fé.",
        imagem: "albuns/2026.jpeg",
        conteudo: `
            <p>Queridos jovens, é com muita alegria que iniciamos mais um ano de atividades em nosso grupo!</p>
            
            <h4>O que temos preparado para 2026:</h4>
            <ul>
                <li><strong>Encontros mensais:</strong> Todo primeiro sábado do mês às 19h30 no salão principal</li>
                <li><strong>Todo domingo escola dominical:</strong> às 09h</li>
                <li><strong>Retiro START:</strong> 15-17 de maio na Fazenda Monte Sião</li>
                <li><strong>Congresso "VIRÁ":</strong> 18 a 20 de Setembro</li>
            </ul>
            
            <p>Nosso tema para este ano é <strong>"Virá"</strong>. Queremos ser geração que espera ansiosos para a volta Dele</p>
            
            <p>Convidamos você a participar ativamente! Traga seus amigos, suas ideias e seu coração aberto para o que Deus quer fazer em nossa vida.</p>
            
            <p><strong>Primeiro culto:</strong> 7 de fevereiro, sábado, 19h30.<br>
            <strong>Traga:</strong> Sua Bíblia e um amigo!</p>
            
            <p>Que Deus abençoe ricamente nosso ano!</p>
            
            <p>Com carinho,<br>
            <strong>Andressa Miotto</strong><br>
            </p>
        `,
        conteudoExtra: `
            <div class="post-actions">
                <button class="btn-compartilhar" onclick="compartilharPost(1)">
                    <i class="fas fa-share-alt"></i> Compartilhar
                </button>
                <button class="btn-imprimir" onclick="window.print()">
                    <i class="fas fa-print"></i> Imprimir
                </button>
            </div>
        `
    },
    {
        id: 2,
        titulo: "Preparativos para o Retiro 2026",
        data: "2026-02-10",
        autor: "Líder Jheniffer",
        resumo: "Estamos nos preparando para o nosso retiro anual com o tema START. Confira todas as informações importantes.",
        imagem: "albuns/retiro.jpeg",
        conteudo: `
            <p>Olá, jovens! O tão esperado Retiro de 2026 está chegando!</p>
            
            <h4>📅 Datas: 15 a 17 de maio de 2026</h4>
            <h4>📍 Local: Fazenda Monte Sião</h4>
            <h4>🎯 Tema: "Start"</h4>
            
            <p>Este ano teremos atividades especiais:</p>
            
            <h5>Pregadores confirmados:</h5>
            <ul>
                <li><strong>Pastor Roberto Silva:</strong> "Fé em tempos de incerteza"</li>
                <li><strong>Missionária Ana Paula:</strong> "Deus tem um propósito para sua vida"</li>
                <li><strong>Pastor Jovem Lucas:</strong> "Relacionamentos saudáveis"</li>
            </ul>
            
            <h5>Atividades:</h5>
            <ul>
                <li>Trilhas</li>
                <li>Noite de louvor com fogueira</li>
                <li>Grupos de conversa e oração</li>
                <li>Gincanas e dinâmicas</li>
                <li>Tarde de esportes</li>
            </ul>
            
            <h5>Valores:</h5>
            <ul>
                <li><strong>Acomodação coletiva:</strong> R$ 400,00</li>
            </ul>
            
            <p><strong>Incluso:</strong> Todas as refeições, hospedagem, materiais e transporte (ida e volta).</p>
            
            <h5>Como se inscrever:</h5>
            <ol>
                <li>Preencha o formulário de inscrição no nosso site</li>
                <li>Faça o pagamento via PIX para garantir sua vaga</li>
                <li>Envie o comprovante para nosso WhatsApp</li>
                <li>Receba a confirmação por email</li>
            </ol>
            
            <p><strong>Vagas limitadas!</strong> São apenas 160 vagas disponíveis.</p>
            
            <p>Para mais informações: (31) 7557-6657 ou jovens@igreja.com</p>
            
            <p>Contamos com sua presença!</p>
            
            <p>Abraços,<br>
            <strong>Nathaly</strong><br>
            Secretaria do Retiro</p>
        `
    },
    {
        id: 3,
        titulo: "Campanha de Doações para o Natal 2026",
        data: "2026-10-12",
        autor: "Diácono Pedro",
        resumo: "Vamos ajudar famílias carentes neste Natal. Participe da nossa campanha de doações.",
        imagem: "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        conteudo: `
            <p>Queridos jovens, como todos os anos, organizaremos a campanha 'Natal Solidário'.</p>
            
            <h4>Como você pode ajudar:</h4>
            
            <h5>1. Doação de alimentos:</h5>
            <ul>
                <li>Arroz (5kg)</li>
                <li>Feijão (2kg)</li>
                <li>Açúcar (2kg)</li>
                <li>Óleo (1L)</li>
                <li>Leite em pó</li>
                <li>Biscoitos e massas</li>
            </ul>
            
            <h5>2. Doação de brinquedos:</h5>
            <ul>
                <li>Brinquedos novos ou em bom estado</li>
                <li>Para crianças de 0 a 12 anos</li>
                <li>Bolas, bonecas, carrinhos, jogos educativos</li>
            </ul>
            
            <h5>3. Voluntariado:</h5>
            <ul>
                <li>Embalagem das cestas: 15 de dezembro</li>
                <li>Distribuição: 20 de dezembro</li>
                <li>Atividades com crianças: durante a distribuição</li>
            </ul>
            
            <h4>Pontos de coleta:</h4>
            <ul>
                <li>Secretaria da igreja: Segunda a sexta, 14h-18h</li>
                <li>Salão dos jovens: Sábados, 18h-21h</li>
                <li>Podemos buscar em sua casa (combinar por WhatsApp)</li>
            </ul>
            
            <p><strong>Meta:</strong> 100 cestas básicas e 200 brinquedos!</p>
            
            <p>Para se voluntariar ou mais informações:<br>
            <strong>WhatsApp:</strong> (11) 99999-9999<br>
            <strong>Email:</strong> voluntarios@igreja.com</p>
            
            <p>"Quem é bondoso para com os pobres empresta ao Senhor, e ele o recompensará." - Provérbios 19:17</p>
            
            <p>Com gratidão,<br>
            <strong>Diácono Pedro</strong><br>
            Coordenador de Ações Sociais</p>
        `
    }
];

// Dados dos produtos (camisetas)
const produtos = [
    {
        id: 1,
        nome: "Camiseta Básica Jovens 2026",
        preco: 45.00,
        imagem: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        descricao: "Camiseta 100% algodão, estampa frontal com o logo dos Jovens Júbilos de Paz 2026.",
        cores: ["Branca", "Preta", "Azul"],
        tamanhos: ["P", "M", "G", "GG"],
        disponivel: true
    },
    {
        id: 2,
        nome: "Camiseta Premium Retiro 2026",
        preco: 65.00,
        imagem: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        descricao: "Edição especial do retiro 2026. Tecido de alta qualidade.",
        cores: ["Cinza", "Verde", "Vermelha"],
        tamanhos: ["P", "M", "G", "GG", "XG"],
        disponivel: true
    },
    {
        id: 3,
        nome: "Moletom Jovens Júbilos de Paz",
        preco: 89.90,
        imagem: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        descricao: "Moletom com capuz, perfeito para os dias mais frios. Logo bordado.",
        cores: ["Preto", "Cinza escuro", "Azul marinho"],
        tamanhos: ["M", "G", "GG", "XG"],
        disponivel: true
    }
];

// Dados dos álbuns de fotos - IDs CORRETOS E ÚNICOS
const albunsFotos = [
    {
        id: 1,
        titulo: "Encontros",
        data: "2025-01-01", // ADICIONADO: data
        descricao: "Momento de comunhão, risadas e boa comida!",
        fotoPrincipal: "albuns/encontros/2.jpeg",
        fotos: [
            "albuns/encontros/1.jpeg",
            "albuns/encontros/3.jpeg",
            "albuns/encontros/4.jpeg",
            "albuns/encontros/5.jpeg",
            "albuns/encontros/6.jpeg"
        ]
    },
    {
        id: 2,
        titulo: "Cantina",
        data: "2025-02-01", // ADICIONADO: data
        descricao: "Momento de criação de receitas, ajuda na obra e arrecadação",
        fotoPrincipal: "albuns/cantina/1.jpeg",
        fotos: [
            "albuns/cantina/2.jpeg",
            "albuns/cantina/3.jpeg"
        ]
    },
    {
        id: 3,
        titulo: "Retiro - 2025",
        data: "2025-09-01", // CORRIGIDO: formato correto
        descricao: "Diversão e aprendizado na chacara com a galera!",
        fotoPrincipal: "albuns/retiro-2025/1.jpeg",
        fotos: [
            "albuns/retiro-2025/2.jpeg",
            "albuns/retiro-2025/3.jpeg",
            "albuns/retiro-2025/4.jpeg",
            "albuns/retiro-2025/5.jpeg",
            "albuns/retiro-2025/6.jpeg",
            "albuns/retiro-2025/7.jpeg",
            "albuns/retiro-2025/8.jpeg",
            "albuns/retiro-2025/9.jpeg"
        ]
    },
    {
        id: 4,
        titulo: "Encontro de Aniversariantes",
        data: "2025-06-01", // ADICIONADO: data
        descricao: "Um dia lindo para comemorar com os aniversariantes do semestre!",
        fotoPrincipal: "albuns/aniversario/1.jpeg",
        fotos: [
            "albuns/aniversario/2.jpeg",
            "albuns/aniversario/3.jpeg",
            "albuns/aniversario/4.jpeg",
            "albuns/aniversario/5.jpeg",
            "albuns/aniversario/6.jpeg"
        ]
    },
    {
        id: 5,
        titulo: "Cultos Semanais",
        data: "2025-03-01", // ADICIONADO: data
        descricao: "Cultos onde estamos sempre reunidos!",
        fotoPrincipal: "albuns/cultos/1.jpeg",
        fotos: [
            "albuns/cultos/2.jpeg",
            "albuns/cultos/3.jpeg",
            "albuns/cultos/4.jpeg",
            "albuns/cultos/5.jpeg",
            "albuns/cultos/6.jpeg",
            "albuns/cultos/7.jpeg",
            "albuns/cultos/8.jpeg",
            "albuns/cultos/9.jpeg",
            "albuns/cultos/10.jpeg",
            "albuns/cultos/11.jpeg",
            "albuns/cultos/12.jpeg",
            "albuns/cultos/13.jpeg",
            "albuns/cultos/14.jpeg",
            "albuns/cultos/15.jpeg",
            "albuns/cultos/16.jpeg",
            "albuns/cultos/17.jpeg",
            "albuns/cultos/18.jpeg",
            "albuns/cultos/19.jpeg"
        ]
    },
    {
        id: 6,
        titulo: "Congresso - 2025",
        data: "2025-08-01", // ADICIONADO: data
        descricao: "Nosso congresso 2025, com muito agir do Espírito Santo!",
        fotoPrincipal: "albuns/congresso-2025/2.jpeg",
        fotos: [
            "albuns/congresso-2025/1.jpeg",
            "albuns/congresso-2025/3.jpeg",
            "albuns/congresso-2025/4.jpeg",
            "albuns/congresso-2025/5.jpeg"
        ]
    },
    {
        id: 7,
        titulo: "Escola Bíblica Dominical",
        data: "2025-04-01", // ADICIONADO: data
        descricao: "Nossos domingos cheios de aprendizagem e comunhão",
        fotoPrincipal: "albuns/ebd/1.jpeg",
        fotos: [
            "albuns/ebd/2.jpeg",
            "albuns/ebd/3.jpeg",
            "albuns/ebd/4.jpeg",
            "albuns/ebd/5.jpeg",
            "albuns/ebd/6.jpeg",
            "albuns/ebd/7.jpeg",
            "albuns/ebd/8.jpeg",
            "albuns/ebd/9.jpeg"
        ]
    },
    {
        id: 8, // ID ÚNICO - era duplicado
        titulo: "Ensaios aos sábados",
        data: "2025-05-01", // ADICIONADO: data
        descricao: "Nossos sabados de ensaio",
        fotoPrincipal: "albuns/ensaios/1.jpeg",
        fotos: [
            "albuns/ensaios/2.jpeg",
            "albuns/ensaios/3.jpeg",
            "albuns/ensaios/4.jpeg",
            "albuns/ensaios/5.jpeg",
            "albuns/ensaios/6.jpeg",
            "albuns/ensaios/7.jpeg",
            "albuns/ensaios/8.jpeg"
        ]
    },
    {
        id: 9, // ID ÚNICO - ajustado
        titulo: "Evangelismos",
        data: "2025-07-01", // ADICIONADO: data
        descricao: "Nos dias que saimos para evangelizar",
        fotoPrincipal: "albuns/evangelismo/1.jpeg",
        fotos: [
            "albuns/evangelismo/2.jpeg"
        ]
    },
    {
        id: 10, // ID ÚNICO - ajustado
        titulo: "Roles pós culto",
        data: "2025-10-01", // ADICIONADO: data
        descricao: "Nossos momentos de comunhão e comida pós culto!",
        fotoPrincipal: "albuns/pos culto/1.jpeg",
        fotos: [
            "albuns/pos culto/2.jpeg",
            "albuns/pos culto/3.jpeg",
            "albuns/pos culto/4.jpeg",
            "albuns/pos culto/5.jpeg"
        ]
    }
];

// Exportar dados para uso no script principal - CORRIGIDO
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { eventos, postsBlog, produtos, albunsFotos };
}