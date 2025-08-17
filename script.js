let vendas = [];

function formatarMoeda(campo) {
  let valor = campo.value.replace(/\D/g, "");
  if (valor === "") {
    campo.value = "";
    atualizarTotal();
    return;
  }
  valor = (valor / 100).toFixed(2) + "";
  valor = valor.replace(".", ",");
  valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  campo.value = "R$ " + valor;
  atualizarTotal();
}

function atualizarTotal() {
  let total = 0;
  for (let i = 1; i <= 3; i++) {
    const valorCampo = document.getElementById(`serv${i}-valor`).value;
    if (valorCampo.startsWith("R$")) {
      const numero = parseFloat(
        valorCampo.replace(/[R$\s\.]/g, "").replace(",", ".")
      );
      if (!isNaN(numero)) total += numero;
    }
  }
  document.getElementById("total").innerText = total.toFixed(2).replace(".", ",");
}

function finalizar() {
  const pet = document.getElementById("pet").value.trim();
  const tutor = document.getElementById("tutor").value.trim();
  const celular = document.getElementById("celular").value.trim();
  const obs = document.getElementById("obs").value.trim();

  if (!pet || !tutor || !celular) {
    alert("Preencha nome do pet, tutor e celular.");
    return;
  }

  let total = 0;
  let servicos = [];
  for (let i = 1; i <= 3; i++) {
    const nome = document.getElementById(`serv${i}-nome`).value.trim();
    const valorCampo = document.getElementById(`serv${i}-valor`).value;
    if (nome && valorCampo.startsWith("R$")) {
      const numero = parseFloat(
        valorCampo.replace(/[R$\s\.]/g, "").replace(",", ".")
      );
      if (!isNaN(numero)) {
        total += numero;
        servicos.push(`${nome} - ${valorCampo}`);
      }
    }
  }

  if (servicos.length === 0) {
    alert("Preencha pelo menos um serviço com valor.");
    return;
  }

  vendas.push({ pet, tutor, total });
  atualizarRelatorio();

  const mensagem =
`Recibo - Cris Pelos e Patas 🐾
Pet: ${pet}
Tutor: ${tutor}
Celular: ${celular}
Serviços:
${servicos.join("\n")}
Total: R$ ${total.toFixed(2).replace(".", ",")}
${obs ? "\nObs: " + obs : ""}
Obrigado pela preferência! ❤️`;

  const enviar = confirm("Deseja enviar o recibo pelo WhatsApp?");
  if (enviar) {
    const numeroWhats = celular.replace(/\D/g, "");
    const link = `https://wa.me/55${numeroWhats}?text=${encodeURIComponent(mensagem)}`;
    window.open(link, "_blank");
  }

  limparCampos();
}

function atualizarRelatorio() {
  const relatorio = document.getElementById("relatorio");
  relatorio.innerHTML = "";
  let totalDia = 0;

  vendas.forEach(v => {
    const li = document.createElement("li");
    li.textContent = `${v.pet} (${v.tutor}) - R$ ${v.total.toFixed(2).replace(".", ",")}`;
    relatorio.appendChild(li);
    totalDia += v.total;
  });

  document.getElementById("total-dia").innerText = totalDia.toFixed(2).replace(".", ",");
}

function limparCampos() {
  document.getElementById("pet").value = "";
  document.getElementById("tutor").value = "";
  document.getElementById("celular").value = "";
  document.getElementById("obs").value = "";

  for (let i = 1; i <= 3; i++) {
    document.getElementById(`serv${i}-nome`).value = "";
    document.getElementById(`serv${i}-valor`).value = "";
  }

  atualizarTotal();
}
``