const fs = require('fs/promises');
const path = require('path')
const caminho = path.resolve(__dirname, '../dadosbancarios.json');

const lerBanco = async (caminhoRelativo) => {
    const caminho = caminhoRelativo;
    const arquivo = await fs.readFile(caminho);
    const banco = JSON.parse(arquivo.toString());
    return banco;
}

const gerarNumeroParaContas = async () => {
    const banco = await lerBanco(caminho)
    const numeroContas = banco.contas;
    let ultimaConta = numeroContas.length;

    if (ultimaConta === 0) {
        return 1;
    }
    ultimaConta = numeroContas[numeroContas.length - 1].numero;
    console.log(ultimaConta, "numero da ultima conta");
    return ultimaConta + 1;
}

const salvarBanco = async (caminhoRelativo, arquivo) => {
    await fs.writeFile(caminhoRelativo, arquivo);
}

const salvarAquirvo = async (banco) => {
    const bancoTexto = JSON.stringify(banco);
    await salvarBanco(caminho, bancoTexto);
}


module.exports = {
    lerBanco,
    gerarNumeroParaContas,
    salvarBanco,
    salvarAquirvo
}