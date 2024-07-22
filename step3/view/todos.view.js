const getTodos = ({ todos }) => {
  return `
    ${todos.map(({ text, completed, editing }, index) => {
    return `
        <li data-index="${index}">
          ${!editing ? `
            <input
              ${completed ? 'checked' : ''}
              data-index="${index}"
              type="checkbox"
            />
            <span ${completed ? 'class="completed"' : ''}>${text}</span>
            <button class="update-button" data-index="${index}" >
              수정
            </button>
            <button class="delete-button" data-index="${index}" >
              삭제
            </button>
          `: ''}
          ${editing ? `
            <input value="${text}" data-index="${index}" type="text" />
            <button class="cancel-button" data-index="${index}" >
              취소
            </button>
            <button class="confirm-button" data-index="${index}" >
              확인
            </button>
          `: ''}
        </li>
      `;
  })}
  `
}

export default (
  targetElement,
  {
    todos,
    checkItem,
    toggleUpdateItem,
    deleteItem,
    updateItem
  }) => {
  const newNode = targetElement.cloneNode(false);
  newNode.innerHTML = getTodos({ todos });

  [...newNode.querySelectorAll('li')].forEach((it) => {
    const index = parseInt(it.dataset.index, 10);

    it.addEventListener('click', (e) => {
      if (e.target.matches('input[type="checkbox"]')) {
        checkItem(index);
      }

      if (e.target.matches('button.delete-button')) {
        deleteItem(index);
      }

      if (e.target.matches('button.update-button')) {
        toggleUpdateItem(index);
      }

      if (e.target.matches('button.cancel-button')) {
        toggleUpdateItem(index);
      }

      if (e.target.matches('button.confirm-button')) {
        const input = it.querySelector('input');
        updateItem(index, input.value);
      }
    });
  });

  return newNode;
};
