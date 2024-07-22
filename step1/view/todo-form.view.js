const getTodoForm = () => {
  return `
    <input placeholder="할 일을 입력해 주세요" />
    <button type="button">추가</button>
  `;
}

export default (targetElement) => {
  const newNode = targetElement.cloneNode(false);
  newNode.innerHTML = getTodoForm();
  return newNode
};
