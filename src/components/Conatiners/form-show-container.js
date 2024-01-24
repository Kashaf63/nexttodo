"use client";

import { useTodoContext } from "@/context/todo-context";
import Form from "../Forms/form";
import { todoAddingAction } from "@/actions";

function FormShowContainer({ listfileId }) {
  const {
    showTodoAddingForm,
    handleShowTodoAddingForm,
    setShowTodoAddingForm,
  } = useTodoContext();
  return (
    <div>
      {showTodoAddingForm ? (
        <div
          className="w-full bg-primary/40 absolute inset-0 z-10 flex items-center justify-center backdrop-blur-sm"
          onClick={handleShowTodoAddingForm}
        >
          <Form
            formShowingFn={setShowTodoAddingForm}
            action={todoAddingAction}
            id={listfileId}
            className="flex justify-center items-center gap-4 flex-col border-2 border-gray-700 rounded-lg p-5 shadow-2xl backdrop-blur-[20rem]"
          >
            <Form.Textarea />
            <Form.ColorPicker />
            <Form.DatePicker />
            <Form.SubmitBtn>Submit</Form.SubmitBtn>
          </Form>
        </div>
      ) : null}
    </div>
  );
}

export default FormShowContainer;
