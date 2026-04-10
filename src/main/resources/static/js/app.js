const form = document.getElementById("formConvidado");
const lista = document.getElementById("lista");
const statusEl = document.getElementById("status");

// ========================================
// MODAL DE BOAS-VINDAS
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const welcomeEl = document.getElementById('welcomeModal');
    if (welcomeEl && typeof bootstrap !== 'undefined') {
        const welcomeModal = new bootstrap.Modal(welcomeEl);
        welcomeModal.show();
    }
});


async function carregarConvidados() {
    if (!lista) {
        return;
    }

    const resp = await fetch("/api/convidados");
    const dados = await resp.json();

    lista.innerHTML = "";
    dados.forEach(c => {
        const li = document.createElement("li");
        li.textContent = `${c.nome} - Presença: ${c.presencaConfirmada}`;
        lista.appendChild(li);
    });
}

function mostrarNotificacao(mensagem, tipo = "sucesso") {
    const toast = document.createElement("div");
    toast.className = `toast-custom ${tipo === "sucesso" ? "" : "error"}`;
    toast.textContent = mensagem;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = "slideOut 0.5s ease-in-out";
        setTimeout(() => toast.remove(), 500);
    }, 3500);
}


if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const presencaSelecionada = document.querySelector('input[name="presencaConfirmada"]:checked');

        if (!presencaSelecionada) {
            alert("Por favor, selecione se você comparecerá!");
            return;
        }

        const convidado = {
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            telefone: document.getElementById("telefone").value,
            presencaConfirmada: presencaSelecionada.value, 
            sexo: document.getElementById("sexo").value
        };

        try {
            const resp = await fetch("/api/convidados", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(convidado)
            });

            if (resp.ok) {
                if (presencaSelecionada.value === 'S') {
                    mostrarNotificacao("Presença confirmada com sucesso! Nos vemos lá!");
                } else {
                    mostrarNotificacao("Resposta registrada. Sentiremos sua falta!");
                }
                
                form.reset();

                const modal = bootstrap.Modal.getInstance(document.getElementById("exampleModal"));
                if (modal) {
                    modal.hide();
                }

                await carregarConvidados();
            } else {
                const erro = await resp.json();
                if (erro.message) {
                    mostrarNotificacao(erro.message, "erro");
                } else {
                    mostrarNotificacao("Erro ao processar solicitação. Tente novamente.", "erro");
                }
            }
        } catch (error) {
            mostrarNotificacao("Erro de conexão. Verifique sua internet.", "erro");
        }
    });

    carregarConvidados();
}


const targetDate = new Date("September 5, 2026 20:00:00").getTime();

const countdown = setInterval(() => {
    const now = new Date().getTime();
    const diff = targetDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (daysEl) daysEl.innerText = days;
    if (hoursEl) hoursEl.innerText = hours;
    if (minutesEl) minutesEl.innerText = minutes;
    if (secondsEl) secondsEl.innerText = seconds;

    if (diff < 0) {
        clearInterval(countdown);
        const countdownEl = document.getElementById("countdown");
        if (countdownEl) {
            countdownEl.innerHTML = "<p class='text-center fs-4'>O grande dia chegou!</p>";
        }
    }
}, 1000);
