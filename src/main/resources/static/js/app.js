const form = document.getElementById("formConvidado");
const lista = document.getElementById("lista");
const statusEl = document.getElementById("status");

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

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const convidado = {
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            telefone: document.getElementById("telefone").value,
            presencaConfirmada: document.getElementById("presencaConfirmada").value,
            sexo: document.getElementById("sexo").value
        };

        const resp = await fetch("/api/convidados", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(convidado)
        });

        if (resp.ok) {
            if (statusEl) {
                statusEl.textContent = "Convidado salvo com sucesso!";
            }
            form.reset();
            await carregarConvidados();
        } else if (statusEl) {
            statusEl.textContent = "Erro ao salvar convidado.";
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

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    if (diff < 0) {
        clearInterval(countdown);
        document.getElementById("countdown").innerHTML = "🎉 Chegou o grande dia!";
    }
}, 1000);
