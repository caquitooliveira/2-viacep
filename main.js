// main.js (versão debug)
const cepInput = document.getElementById('cep');
const rua = document.getElementById('rua');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const estado = document.getElementById('estado');
const form = document.getElementById('form-endereco');

async function buscarCep(cep) {
  try {
    console.log('Fetch para ViaCEP:', cep);
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    console.log('Status da resposta:', res.status);
    if (!res.ok) throw new Error('Erro na requisição HTTP');

    const data = await res.json();
    console.log('Resposta ViaCEP:', data);

    if (data.erro) {
      // CEP não encontrado
      throw new Error('CEP não encontrado');
    }

    // Preenche com valores seguros (fallback para string vazia)
    rua.value = data.logradouro || '';
    bairro.value = data.bairro || '';
    cidade.value = data.localidade || '';
    estado.value = data.uf || '';
  } catch (err) {
    console.error(err);
    if (err.message === 'CEP não encontrado') {
      alert('CEP não encontrado!');
    } else {
      alert('Erro ao buscar o CEP. Confira o console (F12).');
    }
    // limpa campos caso haja erro
    rua.value = '';
    bairro.value = '';
    cidade.value = '';
    estado.value = '';
  }
}

cepInput.addEventListener('blur', function () {
  const raw = cepInput.value;
  // extrai somente os dígitos
  const cep = (raw.match(/\d/g) || []).join('');
  console.log('CEP digitado (raw):', `"${raw}"`, '→ dígitos:', cep);

  // se estiver vazio, não faz nada
  if (!cep) return;

  // valida 8 dígitos
  if (!/^\d{8}$/.test(cep)) {
    alert('CEP inválido: informe 8 dígitos (ex: 01001-000).');
    return;
  }

  // indica visualmente que está buscando
  rua.value = 'Buscando...';
  bairro.value = 'Buscando...';
  cidade.value = 'Buscando...';
  estado.value = 'Buscando...';

  buscarCep(cep);
});

// evita submit tradicional do formulário
form.addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Formulário pronto para envio (simulação).');
});
