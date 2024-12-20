const ipJson = [];
const btnGetIp = document.querySelector('#btnGetIp');
const inputIpAddress = document.querySelector('#inputIpAddress');
const ipTableBody = document.querySelector('#ipTableBody');

btnGetIp.addEventListener('click', addIp);

function addIp() {
  const ipAddress = inputIpAddress.value.trim();

  if (!ipAddress) {
    alert('Endereço IP inválido.');
    return;
  }

  if (ipJson.some((entry) => entry.ip === ipAddress)) {
    alert('O IP já está adicionado.');
    return;
  }

  const url = `https://ipinfo.io/${ipAddress}/json?token=ea38c5437881ca`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro ao obter informações do IP.');
      }
      return response.json();
    })
    .then((data) => {
      const newEntry = {
        ip: data.ip || '-',
        org: data.org || '-',
        country: data.country || '-',
        city: data.city || '-',
      };

      newEntry.org = newEntry.org.replace(/AS\d+\s*/, '');

      ipJson.unshift(newEntry);
      renderTable();
    })
    .catch((error) => {
      alert('Erro ao obter informações do IP.');
      console.error(error);
    });

  inputIpAddress.value = '';
}

function renderTable() {
  ipTableBody.innerHTML = ipJson
    .map(
      (entry, index) => `
      <tr>
        <td>${entry.ip}</td>
        <td>${entry.org}</td>
        <td>${entry.country}</td>
        <td>${entry.city}</td>
        <td><button class="clear-btn" onclick="removeIp(${index})">X</button></td>
      </tr>`
    )
    .join('');
}

function removeIp(index) {
  ipJson.splice(index, 1);
  renderTable();
}