import React, {
  createContext,
  useReducer,
  useState,
  useContext,
  useMemo,
  useCallback,
} from "react";

const initialState = {
  tasks: [],
  filter: "all",
};

const TaskContext = createContext(initialState);
const TaskDispatchContext = createContext(null);

function taskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: Date.now(),
            name: action.payload.name,
            completed: false,
          },
        ],
      };
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload.filter,
      };
    default:
      return state;
  }
}

function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const taskContextValue = useMemo(() => state, [state]);

  return (
    <TaskContext.Provider value={taskContextValue}>
      <TaskDispatchContext.Provider value={dispatch}>
        {children}
      </TaskDispatchContext.Provider>
    </TaskContext.Provider>
  );
}

function Tarefa({ task }) {
  const dispatch = useContext(TaskDispatchContext);

  const handleToggle = useCallback(() => {
    dispatch({ type: "TOGGLE_TASK", payload: { id: task.id } });
  }, [dispatch, task.id]);

  return (
    <li className="task-item">
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          className="task-checkbox"
        />
        <span className={`task-name ${task.completed ? "completed" : ""}`}>
          {task.name}
        </span>
      </div>
      <span className="task-status-icon">{task.completed ? "✅" : "⏳"}</span>
    </li>
  );
}

function ListaDeTarefas() {
  const { tasks, filter } = useContext(TaskContext);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        if (filter === "completed") {
          return task.completed;
        }
        if (filter === "pending") {
          return !task.completed;
        }
        return true;
      })
      .sort((a, b) => a.completed - b.completed);
  }, [tasks, filter]);

  if (tasks.length === 0) {
    return (
      <p className="task-empty-message">Nenhuma tarefa adicionada ainda.</p>
    );
  }

  if (filteredTasks.length === 0 && filter !== "all") {
    return (
      <p className="task-empty-message">
        Nenhuma tarefa{" "}
        <span style={{ fontWeight: "bold" }}>
          {filter === "completed" ? "Concluída" : "Pendente"}
        </span>
        .
      </p>
    );
  }

  return (
    <ul className="task-list">
      {filteredTasks.map((task) => (
        <Tarefa key={task.id} task={task} />
      ))}
    </ul>
  );
}

function AdicionarTarefa() {
  const [taskName, setTaskName] = useState("");
  const dispatch = useContext(TaskDispatchContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = taskName.trim();

    if (name) {
      dispatch({ type: "ADD_TASK", payload: { name } });
      setTaskName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <input
        type="text"
        placeholder="Digite a nova tarefa..."
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        className="task-input"
        aria-label="Nova tarefa"
      />
      <button type="submit" disabled={!taskName.trim()} className="add-button">
        ➕ Adicionar
      </button>
    </form>
  );
}

function Filtragem() {
  const { filter } = useContext(TaskContext);
  const dispatch = useContext(TaskDispatchContext);

  const setFilter = useCallback(
    (newFilter) => {
      dispatch({ type: "SET_FILTER", payload: { filter: newFilter } });
    },
    [dispatch]
  );

  const getButtonClass = (currentFilter) =>
    `filter-button ${filter === currentFilter ? "active" : ""}`;

  return (
    <div className="filter-controls">
      <button
        onClick={() => setFilter("all")}
        className={getButtonClass("all")}
      >
        Todas
      </button>
      <button
        onClick={() => setFilter("pending")}
        className={getButtonClass("pending")}
      >
        Pendentes
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={getButtonClass("completed")}
      >
        Concluídas
      </button>
    </div>
  );
}

function App() {
  return (
    <TaskProvider>
      <style>
        {`
        /* Estilos Simplificados */
        .app-background {
          min-height: 100vh;
          background-color: #f0f0f0;
          padding: 20px;
          display: flex;
          justify-content: center;
          font-family: sans-serif;
        }

        .task-manager-card {
          width: 100%;
          max-width: 500px;
          background-color: white;
          padding: 20px;
          border: 1px solid #ccc;
        }

        .app-title {
          font-size: 1.5em;
          text-align: center;
          margin-bottom: 20px;
        }
        
        /* Formulário Adicionar Tarefa */
        .add-task-form {
          display: flex;
          gap: 5px;
          margin-bottom: 15px;
        }

        .task-input {
          flex-grow: 1;
          padding: 8px;
          border: 1px solid black;
        }

        .add-button {
          padding: 8px 12px;
          border: 1px solid black;
          background-color: #ddd;
          cursor: pointer;
        }
        
        .add-button:disabled {
          background-color: #eee;
          cursor: not-allowed;
        }

        /* Controles de Filtragem */
        .filter-controls {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 15px;
          margin-bottom: 15px;
          border-top: 1px dashed #ccc;
          padding-top: 10px;
        }

        .filter-button {
          padding: 5px 10px;
          border: 1px solid #000;
          background-color: #f0f0f0;
          cursor: pointer;
        }

        .filter-button.active {
          background-color: #bbb;
        }

        /* Lista de Tarefas */
        .task-list {
          list-style: none;
          padding: 0;
          margin-top: 10px;
        }

        .task-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px dotted #ccc;
        }

        .task-content {
          display: flex;
          align-items: center;
          flex-grow: 1;
        }

        .task-checkbox {
          width: 15px;
          height: 15px;
          cursor: pointer;
          margin-right: 10px;
        }

        .task-name {
          font-size: 1em;
          color: #000;
        }

        .task-name.completed {
          text-decoration: line-through;
          color: #888;
        }

        .task-status-icon {
          font-size: 1em;
          margin-left: 10px;
        }

        /* Mensagem de Lista Vazia */
        .task-empty-message {
            text-align: center;
            color: #555;
            margin-top: 20px;
            padding: 10px;
            border: 1px solid #ddd;
        }
        
        /* Rodapé */
        .app-footer {
          margin-top: 20px;
          text-align: center;
          color: #888;
          font-size: 0.8em;
          border-top: 1px dashed #ccc;
          padding-top: 10px;
        }
        `}
      </style>
      <div className="app-background">
        <div className="task-manager-card">
          <h1 className="app-title">Gerenciador de Tarefas</h1>

          <AdicionarTarefa />
          <Filtragem />
          <ListaDeTarefas />

          <footer className="app-footer">
            Criado por Angelo Marcondes de Oliveira Neto.
          </footer>
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;
