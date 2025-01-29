// Definir o nome do usuário na interface
b_usuario.innerHTML = sessionStorage.NOME_USUARIO;

// Função para alternar a exibição das seções
function exibirSecao(secao) {
    // Oculta todas as seções
    document.querySelectorAll(".secao").forEach((elemento) => {
        elemento.classList.add("display-none");
    });

    // Exibe a seção selecionada
    document.getElementById(secao).classList.remove("display-none");

    // Carrega os dados dinamicamente, se necessário
    if (secao === "ranking") {
        carregarRanking();
    } else if (secao === "resultadoQuiz") {
        carregarResultadoQuiz();
    } else if (secao === "graficoAlturas") {
        carregarGraficoAlturas();
    }
}

// Função para carregar os dados do ranking
function carregarRanking() {
    fetch("http://localhost:3333/usuarios/rankingAlturas")
        .then((response) => response.json())
        .then((dados) => {
            const tabela = document.getElementById("tabelaRanking").getElementsByTagName("tbody")[0];
            tabela.innerHTML = ""; // Limpa a tabela

            dados.forEach((item, index) => {
                const linha = tabela.insertRow();
                const posicao = linha.insertCell(0);
                const nome = linha.insertCell(1);
                const altura = linha.insertCell(2);

                posicao.innerHTML = index + 1;
                nome.innerHTML = item.nome;
                altura.innerHTML = item.altura_hobbits;
            });
        })
        .catch((erro) => {
            console.error("Erro ao carregar o ranking:", erro);
        });
}

function carregarResultadoQuiz() {
    const usuarioId = sessionStorage.ID_USUARIO; // Obtém o ID do usuário logado

    fetch("http://localhost:3333/usuarios/resultadoQuiz", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ usuarioId })
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Erro ao buscar resultado do quiz.");
            }
        })
        .then((dados) => {
            const { totalPerguntas, acertos, erros, porcentagem } = dados;

            // Texto formatado com a porcentagem de acertos
            const texto = `
            Você respondeu ${totalPerguntas} perguntas.<br>
            Acertos: ${acertos} (${totalPerguntas > 0 ? porcentagem : 0}%)<br>
            Erros: ${erros} (${totalPerguntas > 0 ? ((erros / totalPerguntas) * 100).toFixed(2) : 0}%)
        `;
        

            document.getElementById("resultadoQuizTexto").innerHTML = texto;
        })
        .catch((erro) => {
            console.error(erro);
            document.getElementById("resultadoQuizTexto").innerHTML = "Erro ao carregar o resultado do quiz.";
        });
}


// Função para salvar as respostas do quiz (caso seja necessário implementar envio no frontend)
function enviarRespostasQuiz(respostas) {
    const usuarioId = sessionStorage.ID_USUARIO; // Obtenha o ID do usuário logado

    fetch("http://localhost:3333/usuarios/salvarRespostas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ usuarioId, respostas })
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Respostas enviadas com sucesso:", data);
        })
        .catch((erro) => {
            console.error("Erro ao enviar respostas:", erro);
        });
}



// Função para carregar o gráfico de alturas
function carregarGraficoAlturas() {
    fetch("http://localhost:3333/usuarios/rankingAlturas")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erro ao carregar os dados para o gráfico.");
            }
            return response.json();
        })
        .then((dados) => {
            const ctx = document.getElementById("graficoAlturasCanvas").getContext("2d");
            const nomes = dados.map((item) => item.nome);
            const alturas = dados.map((item) => item.altura_hobbits);

            new Chart(ctx, {
                type: "line", // Alterado para gráfico de linha
                data: {
                    labels: nomes,
                    datasets: [
                        {
                            label: "Altura (Hobbits)",
                            data: alturas,
                            fill: true,
                            borderColor: "rgba(75, 192, 192, 1)",
                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                            tension: 0.3,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        })
        .catch((erro) => {
            console.error("Erro ao carregar o gráfico de alturas:", erro);
        });
}
