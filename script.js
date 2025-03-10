document.addEventListener('DOMContentLoaded', function () {
  console.log("Script carregado corretamente!");

  document.getElementById('atestadoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nomePaciente = document.getElementById('nomePaciente').value;
    const cpf = document.getElementById('cpf').value;
    const dataAtendimento = new Date(document.getElementById('dataAtendimento').value)
      .toLocaleDateString('pt-BR');
    const diasAfastamento = document.getElementById('diasAfastamento').value;
    const cid = document.getElementById('cid').value;
    const observacoes = document.getElementById('observacoes').value;
    
    const conteudoAtestado = `
      <p>Atesto que o(a) paciente <strong>${nomePaciente}</strong>, portador(a) do CPF ${cpf}, 
      foi atendido(a) neste hospital na data de ${dataAtendimento}, necessitando de afastamento 
      por ${diasAfastamento} dia(s).</p>
      
      <p>CID: ${cid}</p>
      
      ${observacoes ? `<p><strong>Observações:</strong><br>${observacoes}</p>` : ''}
      
      <p>São Luís, ${new Date().toLocaleDateString('pt-BR')}</p>
    `;
    
    document.getElementById('atestadoContent').innerHTML = conteudoAtestado;
    document.getElementById('previewSection').style.display = 'block';
  });

  document.getElementById('cpf').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      e.target.value = value;
    }
  });

  window.downloadPDF = function() {
    const element = document.getElementById('atestadoPreview');
    const nomePaciente = document.getElementById('nomePaciente').value;
    const dataAtual = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-');
    const fileName = `atestado_${nomePaciente}_${dataAtual}.pdf`;

    const opt = {
      margin: 10,
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };
});
