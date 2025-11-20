 
        const form = document.getElementById("quizForm");
        const perguntasSection = document.getElementById("perguntasSection");
        const perguntasContainer = document.getElementById("perguntasContainer");
        const tabuadaSelect = document.getElementById("tabuadaSelect");
        const modoDif = document.getElementById("modoDif");

        let perguntas = [];

        //Gerar perguntas
        tabuadaSelect.addEventListener("change", gerarPerguntas);
        modoDif.addEventListener("change", gerarPerguntas);

        function gerarPerguntas() {
            const base = Number(tabuadaSelect.value);
            if (!base) return;

            
            
            for (let i = 1; i <= 5; i++) {
                let b = Math.floor(Math.random() * max) + 1;
                let correta = base * b;

                perguntas.push({
                    enunciado: `${base} × ${b} =`,
                    correta
                });
            }

            mostrarPerguntas();
        }
        //Opções de resposta
        function mostrarPerguntas() {
            perguntasSection.classList.remove("d-none");
            perguntasContainer.innerHTML = "";

            perguntas.forEach((p, index) => {
                perguntasContainer.innerHTML += `
                    <div class="mb-3 p-3 border rounded">
                        <label class="form-label"><strong>${index + 1}. ${p.enunciado}</strong></label>

                        <div>
                            <input type="radio" name="q${index}" value="${p.correta}" class="form-check-input" required>
                            <label class="form-check-label">${p.correta}</label>
                        </div>

                        <div>
                            <input type="radio" name="q${index}" value="${p.correta + 1}" class="form-check-input">
                            <label class="form-check-label">${p.correta + 1}</label>
                        </div>

                        <div>
                            <input type="radio" name="q${index}" value="${p.correta - 1}" class="form-check-input">
                            <label class="form-check-label">${p.correta - 1}</label>
                        </div>
                    </div>
                `;
            });
        }


        //Resultado
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            let pontos = 0;
            let resultadoHTML = `
                <div class="card p-4 shadow">
                <h3 class="mb-3">Resultado</h3>
            `;

            perguntas.forEach((p, index) => {
                let resposta = document.querySelector(`input[name="q${index}"]:checked`).value;

                if (Number(resposta) === p.correta) {
                    pontos++;
                    resultadoHTML += `
                        <p class="correct">${index + 1}. ${p.enunciado} ${resposta} ✔</p>
                    `;
                } else {
                    resultadoHTML += `
                        <p class="wrong">${index + 1}. ${p.enunciado} Você marcou ${resposta} — Correto: ${p.correta} ✘</p>
                    `;
                }
            });

            resultadoHTML += `<h4 class="mt-3">Pontuação final: ${pontos} / ${perguntas.length}</h4>`;
            resultadoHTML += `</div>`;

            document.getElementById("resultado").innerHTML = resultadoHTML;

            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        });
