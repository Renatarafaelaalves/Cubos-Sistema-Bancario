const path = require('path')
const caminho = path.resolve(__dirname, '../dadosbancarios.json');
const { lerBanco, gerarNumeroParaContas, salvarAquirvo, validaDadosDoUsuario } = require('./utils');


const listaDeContas = async (req, res) => {
    const banco = await lerBanco(caminho);
    const contas = banco.contas;
    return res.status(200).json(contas);
}

const abrirConta = async (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    validaDadosDoUsuario(nome, cpf, data_nascimento, telefone, email, senha);

    try {
        const contas = (await lerBanco(caminho)).contas;

        for (let conta of contas) {

            if (email === conta.usuario.email || cpf === conta.usuario.cpf) {

                return res.status(400).json({ mensagem: 'Já existe uma conta com o cpf ou e-mail informado!' });
            }
        }

        let conta = {};
        conta.numero = await gerarNumeroParaContas();
        conta.saldo = 0;
        conta.usuario = {
            nome,
            cpf,
            data_nascimento,
            telefone, email,
            senha
        };

        contas.push(conta);
        const banco = await lerBanco(caminho);
        banco.contas = contas;
        await salvarAquirvo(banco);
        return res.status(204).json();

    } catch (error) {
        return res.status(400).json({ mensagem: 'Erro interno do servidor' });
    }
}

const excluirConta = async (req, res) => {
    const { numeroConta } = req.params;
    const banco = (await lerBanco(caminho));
    const contas = banco.contas;
    const contaParaExcluir = contas.find(conta => conta.numero == numeroConta);

    if (!contaParaExcluir) {
        return res.status(404).json({ mensagem: 'Conta não encontrada' });
    }

    if (contaParaExcluir.saldo !== 0) {
        return res.status(400).json({ mensagem: 'A conta só pode ser removida se o saldo for zero!' });
    }

    try {
        const contasAntigas = contas.filter(conta => conta.numero != numeroConta);
        banco.contas = contasAntigas;
        await salvarAquirvo(banco);

    } catch (error) {
        return res.status(400).json({ mensagem: 'Erro interno do servidor' });
    }

    return res.status(204).json();
}

const depositar = async (req, res) => {
    const { numero_conta, valor } = req.body;

    if (!numero_conta || numero_conta === " ") {
        return res.status(400).json({ mensagem: 'O numero da conta é obrigatorio!' })
    }
    if (!valor || valor === " ") {
        return res.status(400).json({ mensagem: 'O valor é obrigatorio!' });
    }
    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'O valor tem que ser maior que zero' });
    }

    try {
        const banco = await lerBanco(caminho);
        const contas = banco.contas;
        const depositos = banco.depositos;
        const contaExistente = contas.find(conta => conta.numero == numero_conta);

        if (!contaExistente) {
            return res.status(404).json({ mensagem: 'Conta não encontrada!' });
        }

        for (let [index, conta] of contas.entries()) {
            if (conta.numero == numero_conta) {
                contas[index].saldo += valor;
            }
        }

        banco.contas = contas;
        const deposito = {
            data: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
            numero_conta,
            valor
        }

        depositos.push(deposito)
        banco.depositos = depositos;
        await salvarAquirvo(banco);

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }

    return res.status(204).json()
}

const sacar = async (req, res) => {
    const { numero_conta, valor, senha } = req.body;

    if (!numero_conta || numero_conta === " ") {
        return res.status(400).json({ mensagem: 'O numero da conta é obrigatorio' });
    }

    if (!valor || valor === " ") {
        return res.status(400).json({ mensagem: 'O valor é obrigatorio!' });
    }

    if (valor <= 0) {
        return res.status(400).json({ mensagem: 'O valor tem que ser maior que zero' });
    }

    if (!senha || senha === " ") {
        return res.status(400).json({ mensagem: 'A senha é obrigatoria' });
    }

    try {

        const banco = await lerBanco(caminho);
        const contas = banco.contas;
        const saques = banco.saques;
        const contaExistente = contas.find(conta => conta.numero == numero_conta);

        if (!contaExistente) {
            return res.status(404).json({ mensagem: 'Conta não encontrada!' });
        }

        if (contaExistente.usuario.senha != senha) {
            return res.status(400).json({ mensagem: 'A senha informada é invalida' });
        }

        if (contaExistente.saldo < valor) {
            return res.status(400).json({ mensagem: 'Saldo insuficiente' });
        }

        for (let [index, conta] of contas.entries()) {
            if (conta.numero == numero_conta) {
                contas[index].saldo -= valor;
            }
        }

        banco.contas = contas;
        const saque = {
            data: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
            numero_conta,
            valor
        }

        saques.push(saque);
        banco.saques = saques;
        await salvarAquirvo(banco);

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }

    return res.status(204).json();
}

const atualizarDadosCadastrais = async (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const { numeroConta } = req.params;

    validaDadosDoUsuario(nome, cpf, data_nascimento, telefone, email, senha);

    const banco = await lerBanco(caminho);
    const contas = banco.contas;
    const contaExistente = contas.find(conta => conta.numero == numeroConta);

    if (!contaExistente) {
        return res.status(404).json({ mensagem: 'Conta não encontrada!' });
    }

    const cpfExistente = contas.find(conta => {
        if (contaExistente != conta && conta.usuario.cpf == cpf) {
            return conta;
        }
    });

    if (cpfExistente) {
        return res.status(400).json({ mensagem: 'CPF já esta em uso' })
    }

    const emailExistente = contas.find(conta => {
        if (contaExistente != conta && conta.usuario.email == email) {
            return conta;
        }
    });

    if (emailExistente) {
        return res.status(400).json({ mensagem: 'Email já esta em uso' })
    }

    try {
        const usuario = { nome, cpf, data_nascimento, telefone, email, senha };

        for (let [index, conta] of contas.entries()) {
            if (conta == contaExistente) {
                contas[index].usuario = usuario;
            }
        }

        banco.contas = contas;
        await salvarAquirvo(banco);

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }

    return res.status(204).json()
}

const transferencia = async (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    if (!numero_conta_origem || numero_conta_origem === " ") {
        return res.status(400).json({ mensagem: 'O numero da conta de origem é obrigatorio' });
    }
    if (!numero_conta_destino || numero_conta_destino === " ") {
        return res.status(400).json({ mensagem: 'O numero da conta de destino é obrigatorio' });

    } if (!valor || valor === " ") {
        return res.status(400).json({ mensagem: 'O valor da transferencia é obrigatorio' });

    } if (!senha || senha === " ") {
        return res.status(400).json({ mensagem: 'A senha é obrigatorio' });
    }

    try {

        const banco = await lerBanco(caminho);
        const contas = banco.contas;
        const transferencias = banco.transferencias;

        const contaOrigemExiste = contas.find(conta => conta.numero == numero_conta_origem,);
        if (!contaOrigemExiste) {
            return res.status(404).json({ mensagem: 'Conta de origem não encontrada' })
        }

        const contaDestinoExiste = contas.find(conta => conta.numero == numero_conta_destino,);
        if (!contaDestinoExiste) {
            return res.status(404).json({ mensagem: 'Conta de destino não encontrada' })
        }

        if (contaOrigemExiste.usuario.senha != senha) {
            return res.status(400).json({ mensagem: 'A senha informada é invalida' });
        }

        if (contaOrigemExiste.saldo < valor) {
            return res.status(400).json({ mensagem: 'saldo insuficiente!' });
        }

        const transferencia = {
            data: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
            numero_conta_origem,
            numero_conta_destino,
            valor
        };

        transferencias.push(transferencia);

        for (let [index, conta] of contas.entries()) {
            if (conta.numero == numero_conta_origem) {
                contas[index].saldo -= valor
            }
            if (conta.numero == numero_conta_destino) {
                contas[index].saldo += valor
            }
        }

        banco.contas = contas;
        banco.transferencias = transferencias
        await salvarAquirvo(banco);

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }

    return res.status(204).json();
}

const saldo = async (req, res) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta || numero_conta === " ") {
        return res.status(400).json({ mensagem: 'O numero da conta é obrigatorio' });
    }

    if (!senha || senha === " ") {
        return res.status(400).json({ mensagem: 'A senha é obrigatoria' });
    }

    try {
        const banco = await lerBanco(caminho);
        const contas = banco.contas;
        const contaExistente = contas.find(conta => conta.numero == numero_conta);

        if (!contaExistente) {
            return res.status(404).json({ mensagem: 'Conta não encontrada!' });
        }

        if (contaExistente.usuario.senha != senha) {
            return res.status(400).json({ mensagem: 'A senha informada é invalida' });
        }

        res.status(200).json({ mensagem: ` saldo da conta: ${contaExistente.saldo} ` });

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }


}


const extrato = async (req, res) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta || numero_conta === " ") {
        return res.status(400).json({ mensagem: 'O numero da conta é obrigatorio' });
    }

    if (!senha || senha === " ") {
        return res.status(400).json({ mensagem: 'A senha é obrigatoria' });
    }

    try {
        const banco = await lerBanco(caminho);
        const contas = banco.contas;
        const contaExistente = contas.find(conta => conta.numero == numero_conta);
        // console.log(contaExistente);

        if (!contaExistente) {
            return res.status(404).json({ mensagem: 'Conta bancária não encontada!' });
        }
        if (contaExistente.usuario.senha != senha) {
            return res.status(400).json({ mensagem: 'A senha informada é invalida' });
        }

        return res.status(200).json({ mensagem: `Extrato bancario: ${contaExistente.saques}` })

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }


}

module.exports = {
    listaDeContas,
    abrirConta,
    excluirConta,
    depositar,
    sacar,
    atualizarDadosCadastrais,
    transferencia,
    saldo,
    extrato
}


