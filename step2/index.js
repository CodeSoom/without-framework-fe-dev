import todoFormView from './view/todo-form.view.js';
import todosView from './view/todos.view.js';

import applyDiff from './applyDiff.js'
import registry from './registry.js'

registry.add('todo-form', todoFormView);
registry.add('todos', todosView);

const state = {
  todos: [],
  addItem: (text) => {
    state.todos = [
      ...state.todos,
      { text, completed: false, editing: false }
    ];
    render();
  },
  checkItem: (index) => {
    state.todos = state.todos.map((todo, i) => {
      if (index === i) {
        return {
          ...todo,
          completed: !todo.completed
        }
      }
      return todo
    });
    render();
  },
  toggleUpdateItem: (index) => {
    state.todos = state.todos.map((todo, i) => {
      if (index === i) {
        return {
          ...todo,
          editing: !todo.editing
        }
      }
      return todo
    });
    render();
  },
  updateItem: (index, text) => {
    state.todos = state.todos.map((todo, i) => {
      if (index === i) {
        return {
          ...todo,
          editing: !todo.editing,
          text,
        }
      }
      return todo
    });
    render();
  },
  deleteItem: (index) => {
    state.todos = state.todos.filter((_, i) => index !== i);
    render();
  }
};

const render = () => {
  window.requestAnimationFrame(() => {
    const main = document.getElementById('root');
    const newMain = registry.renderRoot(main, state)
    applyDiff(document.body, main, newMain)
  });
}

render();
