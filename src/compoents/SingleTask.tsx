import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";
import { ITask } from "../Interface";
import { NewTaskComponent } from "../compoents/NewTaskComponent";

interface Props {
  item: ITask;
  delTask(taskNameToDelete: string): void;
  editTask(taskNameToEdit: string, editedName: string): void;
}

export const SingleTask = ({ item, delTask, editTask }: Props) => {
  const [isEditAbleState, setisEditAble] = useState<boolean>(false);

  const handleDel = (): void => {
    delTask(item.taskName);
  };

  const handleEdit = (): void => {
    // editTask(item.taskName, editedName)
    setisEditAble(true);
  };

  const saveTaskName = (saveName: string): void => {
    setisEditAble(false);
    editTask(item.taskName, saveName);
  };

  if (!isEditAbleState) {
    return (
      <TodoItem>
        <Text>{item.taskName} </Text>
        <Icon
          id="Edit"
          onClick={handleEdit}
          style={{
            backgroundImage:
              "url(https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-pencil-interface-kiranshastry-lineal-kiranshastry-1.png)",
          }}
        />
        <Icon
          id="Del"
          style={{
            backgroundImage:
              "url(https://img.icons8.com/ios/50/000000/delete--v1.png)",
          }}
          onClick={handleDel}
        />
      </TodoItem>
    );
  }

  return <NewTaskComponent saveTaskName={saveTaskName} />;
};

export const TodoItem = styled.section`
  display: flex;
  color: black;
  width: 100%;
  height: 50px;
  background-color: #e8e3e3;
  margin-bottom: 20px;
  padding-bottom: 8px;
  border-radius: 5px;
`;
export const Text = styled.h2`
  width: 100%;
  padding-left: 15px;
`;

export const Icon = styled.button`
  margin-top: 5px;
  width: 60px;
  height: 50px;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #e8e3e3;
`;
