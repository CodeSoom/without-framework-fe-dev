const getTodos = ({ todos }) => {
  return `
    ${todos.map(({ text, completed, editing }, index) => {
    return `
        <li>
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

  const inputs = newNode.querySelectorAll('input[type="text"]')
  const checkboxes = newNode.querySelectorAll('input[type="checkbox"]');
  const deleteButtons = newNode.querySelectorAll('button.delete-button');
  const updateButtons = newNode.querySelectorAll('button.update-button');
  const cancelButtons = newNode.querySelectorAll('button.cancel-button');
  const confirmButtons = newNode.querySelectorAll('button.confirm-button');

  checkboxes.forEach((it) => {
    it.addEventListener('change', (e) => {
      checkItem(parseInt(e.target.dataset.index, 10));
    });
  });

  deleteButtons.forEach((it) => {
    it.addEventListener('click', (e) => {
      deleteItem(parseInt(e.target.dataset.index, 10));
    });
  });

  updateButtons.forEach((it) => {
    it.addEventListener('click', (e) => {
      toggleUpdateItem(parseInt(e.target.dataset.index, 10));
    });
  });

  cancelButtons.forEach((it) => {
    it.addEventListener('click', (e) => {
      toggleUpdateItem(parseInt(e.target.dataset.index, 10));
    });
  });

  confirmButtons.forEach((it) => {
    it.addEventListener('click', (e) => {
      const input = [...inputs]
        .find((it) => it.dataset.index === e.target.dataset.index);
      updateItem(parseInt(e.target.dataset.index, 10), input.value);
    });
  });

  return newNode;
};
