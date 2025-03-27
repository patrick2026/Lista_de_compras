// ========== EVENTO DE CARREGAMENTO ========== //
// Carrega a lista do localStorage quando a página é carregada
document.addEventListener("DOMContentLoaded", loadList);

// ========== FUNÇÃO PRINCIPAL PARA ADICIONAR ITENS ========== //
function addItem() {
  const input = document.getElementById("itemInput");
  const itemText = input.value.trim(); // Remove espaços no início e final

  // Validação 1: Verifica se o campo está vazio após remoção de espaços
  if (!itemText) {
    alert("Por favor, digite um item válido!");
    return;
  }

  // Validação 2: Impede a adição de itens contendo números
  if (/\d/.test(itemText)) {
    alert("Não são permitidos números nos itens!");
    return;
  }

  // Validação 3: Verifica itens duplicados (case sensitive)
  const existingItems = getItemsFromStorage();
  if (existingItems.includes(itemText)) {
    alert("Este item já está na lista!");
    return;
  }

  // Adiciona o item validado na lista visual
  const listItem = createListItem(itemText);
  document.getElementById("shoppingList").appendChild(listItem);

  // Salva no localStorage
  saveToLocalStorage(itemText);

  // Limpa o input após adição
  input.value = "";
}

// ========== FUNÇÃO PARA CRIAR ELEMENTOS DA LISTA ========== //
function createListItem(text) {
  const li = document.createElement("li");
  li.innerHTML = `
    ${text}
    <button class="delete-btn" onclick="deleteItem(this)">🗑️ Excluir</button>
  `;
  return li;
}

// ========== FUNÇÃO PARA EXCLUIR ITEM INDIVIDUAL ========== //
function deleteItem(button) {
  const li = button.parentElement;
  const itemText = li.firstChild.textContent.trim();

  // Remove visualmente do DOM
  li.remove();

  // Remove do armazenamento local
  removeFromLocalStorage(itemText);
}

// ========== FUNÇÃO PARA LIMPAR TODA A LISTA ========== //
function clearAll() {
  // Confirmação de segurança antes de apagar
  if (confirm("Tem certeza que deseja limpar toda a lista?")) {
    // Limpa visualização
    document.getElementById("shoppingList").innerHTML = "";

    // Limpa armazenamento local
    localStorage.removeItem("shoppingList");
  }
}

// ========== FUNÇÕES DE GERENCIAMENTO DO LOCALSTORAGE ========== //

// Salva novo item no localStorage
function saveToLocalStorage(item) {
  const items = getItemsFromStorage();
  items.push(item);
  localStorage.setItem("shoppingList", JSON.stringify(items));
}

// Remove item específico do localStorage
function removeFromLocalStorage(itemToRemove) {
  const items = getItemsFromStorage().filter((item) => item !== itemToRemove);
  localStorage.setItem("shoppingList", JSON.stringify(items));
}

// Carrega lista do localStorage
function loadList() {
  const items = getItemsFromStorage();
  const list = document.getElementById("shoppingList");

  // Recria todos os itens armazenados
  items.forEach((item) => {
    list.appendChild(createListItem(item));
  });
}

// Obtém lista atual do localStorage
function getItemsFromStorage() {
  return JSON.parse(localStorage.getItem("shoppingList") || "[]");
}
