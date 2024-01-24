"use client";

import { useTodoContext } from "@/context/todo-context";
import Form from "../Forms/form";
import { listAddingAction } from "@/actions";

function ListTaskAddingFormContainer({ userId }) {
  const { showTaskForm, setShowTaskForm } = useTodoContext();
  return (
    <>
      {showTaskForm ? (
        <Form
          action={listAddingAction}
          id={userId}
          className="flex gap-2 my-5"
          formShowingFn={setShowTaskForm}
        >
          <Form.Input />
          <Form.SubmitBtn size={"normal"}>Add</Form.SubmitBtn>
        </Form>
      ) : null}
    </>
  );
}

export default ListTaskAddingFormContainer;
