const getTodos = ({ todos }) => {
  return `
    ${todos.map(({ text, completed, editing}) => {
    return `
        <li>
          ${!editing ? `
            <input 
              ${completed ? 'checked' : ''} 
              type="checkbox"
            />
            <span ${completed ? 'class="completed"' : ''}>${text}</span>
            <button class="update-button">수정</button>
            <button class="delete-button">삭제</button>
          `: ''}
          ${editing ? `
            <input value="${text}" />
            <button class="cancel-button">취소</button>
            <button class="confirm-button">확인</button>
          `: ''}
        </li>
      `;
  })}
  `
}

export default (targetElement, { todos }) => {
  const newNode = targetElement.cloneNode(false);
  newNode.innerHTML = getTodos({ todos });
  return newNode;
};
