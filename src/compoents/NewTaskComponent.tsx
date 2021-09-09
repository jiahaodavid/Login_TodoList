import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";

interface Props {
  saveTaskName(taskNameToSave: string): void;
}

export const NewTaskComponent = ({ saveTaskName }: Props) => {
  const [itemNameOnChang, setitemNameOnChang] = useState("");

  const handleItemNameOnChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setitemNameOnChang(event.target.value);
  };
  const handleSaveIcon = (): void => {
    const itemNameLength = itemNameOnChang.length;
    if (itemNameLength > 25) alert("Can not be more than 25 characters.");
    else if (itemNameOnChang !== "") saveTaskName(itemNameOnChang);
    else if (itemNameOnChang == "") alert("Can not be empty.");
  };

  return (
    <TodoItem>
      <InputField
        onChange={handleItemNameOnChange}
        placeholder="Type your new todo task."
      />
      <SaveButton onClick={handleSaveIcon}>Save</SaveButton>
    </TodoItem>
  );
};

export const TodoItem = styled.section`
  display: flex;
  color: black;
  width: 100%;
  height: 58px;
  background-color: #e8e3e3;
  margin-bottom: 20px;
  border-radius: 5px;
`;
export const InputField = styled.input`
  width: 200px;
  border: none;
  background-color: #e8e3e3;
  height: 30px;
  font-size: 15px;
  margin: 14px 0 0 10px;
`;
export const SaveButton = styled.button`
  color: #e8e3e3;
  background-color: #000000d9;
  width: 20%;
  height: 40px;
  border-radius: 5px;
  margin: 8px 10px 0 150px;
`;
