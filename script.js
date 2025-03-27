// Carrega a lista do localStorage quando a página é carregada
document.addEventListener("DOMContentLoaded", loadList);

// Função principal para adicionar itens
function addItem() {
  const input = document.getElementById("itemInput");
  const itemText = input.value.trim();

  if (itemText) {
    // Adiciona item na lista visual
    const listItem = createListItem(itemText);
    document.getElementById("shoppingList").appendChild(listItem);

    // Salva no localStorage
    saveToLocalStorage(itemText);

    // Limpa o input
    input.value = "";
  }
}

// Cria elemento de lista com botão de exclusão
function createListItem(text) {
  const li = document.createElement("li");
  li.innerHTML = `
        ${text}
        <button class="delete-btn" onclick="deleteItem(this)">🗑️ Excluir</button>
    `;
  return li;
}

// Exclui item individual
function deleteItem(button) {
  const li = button.parentElement;
  const itemText = li.firstChild.textContent.trim();

  // Remove do DOM
  li.remove();

  // Remove do localStorage
  removeFromLocalStorage(itemText);
}

// Limpa toda a lista
function clearAll() {
  if (confirm("Tem certeza que deseja limpar toda a lista?")) {
    // Limpa visualmente
    document.getElementById("shoppingList").innerHTML = "";

    // Limpa localStorage
    localStorage.removeItem("shoppingList");
  }
}

// ========== Funções de LocalStorage ========== //

// Salva novo item no localStorage
function saveToLocalStorage(item) {
  const items = getItemsFromStorage();
  items.push(item);
  localStorage.setItem("shoppingList", JSON.stringify(items));
}

// Remove item do localStorage
function removeFromLocalStorage(itemToRemove) {
  const items = getItemsFromStorage().filter((item) => item !== itemToRemove);
  localStorage.setItem("shoppingList", JSON.stringify(items));
}

// Carrega lista do localStorage
function loadList() {
  const items = getItemsFromStorage();
  const list = document.getElementById("shoppingList");

  items.forEach((item) => {
    list.appendChild(createListItem(item));
  });
}

// Obtém itens do localStorage
function getItemsFromStorage() {
  return JSON.parse(localStorage.getItem("shoppingList") || "[]");
}
