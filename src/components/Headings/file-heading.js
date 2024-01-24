"use client";

import { listfileEditAction } from "@/actions";
import { useTodoContext } from "@/context/todo-context";
import { useState } from "react";
import Form from "../Forms/form";

function FileHeading({ text, className, listFileId }) {
  const { openFileEditForm, setOpenFileEditForm } = useTodoContext();

  console.log(openFileEditForm)

  return openFileEditForm ? (
    <Form
      formShowingFn={setOpenFileEditForm}
      type="update"
      action={listfileEditAction}
      id={listFileId}
      className={"flex gap-3"}
    >
      <Form.Input defaultValue={text} />
      <Form.SubmitBtn size={"small"} bgc={"bg-green-400"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="30"
          viewBox="0 -960 960 960"
          width="30"
        >
          <path
            d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"
            fill="white"
          />
        </svg>
      </Form.SubmitBtn>
    </Form>
  ) : (
    <h1 className={className}>{text}</h1>
  );
}

export default FileHeading;
