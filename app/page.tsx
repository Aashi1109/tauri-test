"use client";

import clsx from "clsx";
import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState<
    Array<{ isDone: boolean; text: string; id: number }>
  >([]);
  const [todoInputValue, setTodoInputValue] = useState("");

  const handleButtonClick = () => {
    if (todoInputValue) {
      const isTodoPresent = todos.find((todo) => todo.text === todoInputValue);
      if (!isTodoPresent) {
        setTodos((prevData) => [
          { isDone: false, text: todoInputValue, id: Date.now() },
          ...prevData,
        ]);
      }
    }
  };

  const handleCheckboxChange = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  return (
    <div className="flex justify-center items-center my-5">
      <div className="max-w-[500px] flex items-center flex-col gap-3">
        <h2 className="text-white text-2xl">To Do Tauri App</h2>
        <input
          type="text"
          className="h-10 rounded-lg focus:border-blue-400 focus:outline-none p-2 text-black"
          onChange={(e) => setTodoInputValue(e.target.value)}
          value={todoInputValue}
        />
        <button
          className="h-10 rounded-lg bg-blue-600 text-white self-stretch hover:bg-blue-500"
          onClick={handleButtonClick}
        >
          Add Todo
        </button>

        {/* List to dos */}
        <div className="h-[1px] bg-white w-full rounded-lg"></div>
        <div className="self-start flex flex-col gap-2  items-start">
          {!todos.length ? (
            <p>No todo found</p>
          ) : (
            todos.map((todoData, index) => {
              return (
                <div
                  key={todoData.id}
                  className="p-2 bg-white text-black rounded-lg flex gap-2 items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={todoData.isDone}
                    id={todoData.id.toString()}
                    className="border-white size-4"
                    name={todoData.text}
                    onChange={() => handleCheckboxChange(todoData.id)}
                  />
                  <span className={clsx({ "line-through": todoData.isDone })}>
                    {todoData.text}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
