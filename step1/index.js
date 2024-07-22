import todoFormView from './view/todo-form.view.js';
import todosView from './view/todos.view.js';

import applyDiff from './applyDiff.js'
import registry from './registry.js'

registry.add('todo-form', todoFormView);
registry.add('todos', todosView);

const state = {
  todos: [],
};

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.getElementById('root');
    const newMain = registry.renderRoot(main, state)
    applyDiff(document.body, main, newMain)
  });
}

render();
