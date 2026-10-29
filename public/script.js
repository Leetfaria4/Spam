const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const texto = document.getElementById("email").value;
  const imagens = document.getElementById("imagens").files;
  const mensagem = document.getElementById("mensagem");
  const resultado = document.getElementById("resultado");

  const dados = new FormData();
  dados.append("email", texto);

  for (const imagem of imagens) {
    dados.append("imagens", imagem);
  }

  mensagem.textContent = "analisando e-mail...";
  resultado.hidden = true;

  try {
    const resposta = await fetch("/api/analisar", {
      method: "POST",
      body: dados
    });

    const dadosResposta = await resposta.json();

    if (!resposta.ok) {
      throw new Error(dadosResposta.erro || "erro ao analisar.");
    }

    document.getElementById("classificacao").textContent =
      "classificação: " + dadosResposta.classificacao;

    document.getElementById("risco").textContent =
      "risco: " + dadosResposta.risco;

    document.getElementById("explicacao").textContent =
      dadosResposta.resumo;

    resultado.hidden = false;
    mensagem.textContent = "";

  } catch (erro) {
    mensagem.textContent = "erro: " + erro.message;
  }
});