import React, { useState, FC, ChangeEvent, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { SingleTask } from "../compoents/SingleTask";
import { NewTaskComponent } from "../compoents/NewTaskComponent";
import { ITask } from "../Interface";

export const TodoList: FC = () => {
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [todoListForSearch, setTodoListForSearch] = useState<ITask[]>([]);
  const [newTaskComponentHere, setTaskComponentHere] = useState<boolean>(false);
  const [searchOnChange, setSearchOnChange] = useState<string>("");
  const [isNewButton, setIsNewButton] = useState<boolean>(true);
  const history = useHistory();

  useEffect(() => {
    if (!isNewButton) {
      setTodoListForSearch(todoList);
    } else if (isNewButton) {
      setTodoList(todoListForSearch);
    }
  }, [isNewButton]);

  const handleLogoutButton = (): void => {
    history.push("/");
  };
  const addTask = (): void => {
    setTaskComponentHere(true);
  };

  const searchTask = (): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName == searchOnChange;
      })
    );
  };

  const delTask = (taskNameToDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName != taskNameToDelete;
      })
    );
  };

  const editTask = (taskNameToEdit: string, editedName: string): void => {
    const newTask = { taskName: editedName };
    const newTodoList = todoList.filter((task) => {
      return task.taskName != taskNameToEdit;
    });
    setTodoList([...newTodoList, newTask]);
  };

  const saveTaskName = (saveName: string): void => {
    const newTask = { taskName: saveName };
    setTodoList([...todoList, newTask]);
    setTaskComponentHere(false);
  };

  const handleSearchOnchange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    if (value.length === 0) {
      setIsNewButton(true);
    } else setIsNewButton(false);
    setSearchOnChange(value);
  };

  return (
    <TodoListContainer>
      <LogoutIcon onClick={handleLogoutButton}>Logout</LogoutIcon>
      <TodoListBody>
        <Title>My Todo List</Title>
        <TopBar>
          <SearchBar
            onChange={handleSearchOnchange}
            placeholder="Search..."
            style={{
              backgroundImage:
                "url(https://img.icons8.com/ios-filled/50/000000/search--v1.png)",
            }}
          />
          {isNewButton && (
            <NewButton onClick={addTask} disabled={newTaskComponentHere}>
              New
            </NewButton>
          )}
          {!isNewButton && searchOnChange.length >= 0 && (
            <NewButton onClick={searchTask}>Search</NewButton>
          )}
        </TopBar>
        {newTaskComponentHere && (
          <NewTaskComponent saveTaskName={saveTaskName} />
        )}
        {todoList.map((task: ITask, key: number) => {
          return (
            <SingleTask
              key={key}
              item={task}
              delTask={delTask}
              editTask={editTask}
            />
          );
        })}
      </TodoListBody>
    </TodoListContainer>
  );
};

export const TodoListContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 10fr 1fr;
  grid-template-rows: 1fr 10fr 1fr;
  justify-items: center;
  height: 800px;
`;

export const LogoutIcon = styled.button`
  width: 80px;
  height: 40px;
  text-align: center;
  grid-area: 1/3/2/4;
`;
export const TodoListBody = styled.section`
  grid-area: 2/2/3/3;
  display: flex;
  flex-direction: column;
`;
export const Title = styled.h1`
  color: #e8e3e3;
  font-size: 60px;
`;

export const TopBar = styled.section`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const SearchBar = styled.input`
  height: 35px;
  background-position: 0px 0px;
  background-repeat: no-repeat;
  border-radius: 5px;
  padding: 4px 0 4px 45px;
  font-size: 18px;
  margin-right: 25px;
`;

export const NewButton = styled.button`
  color: #e8e3e3;
  background-color: #0b3dffd9;
  width: 20%;
  height: 48px;
  border-radius: 5px;
  &:disabled {
    background: #848080;
  }
`;
