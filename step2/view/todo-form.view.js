const getTodoForm = () => {
  return `
    <input placeholder="할 일을 입력해 주세요" />
    <button type="button">추가</button>
  `;
}

export default (targetElement, { addItem }) => {
  const newNode = targetElement.cloneNode(true);
  newNode.innerHTML = getTodoForm();

  const input = newNode.querySelector('input');
  const button = newNode.querySelector('button');

  button.addEventListener('click', () => {
    addItem(input.value);
  });

  return newNode
};
