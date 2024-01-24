"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import Tasks from "../components/Tasks";
import {
  deleteListAction,
  listfileAddingAction,
  editListAction,
} from "@/actions";
import Form from "./Forms/form";
import { useTodoContext } from "@/context/todo-context";

function ListItems({ title, items, listId }) {
  console.log(title);
  const [showTasksSecondary, setShowTasksSecondary] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showSForm, setShowSForm] = useState(false);
  const [showFolderEditForm, setShowFolderEditForm] = useState(false);
  // const { handleEditFolderName, showFolderEditForm, setEachListFolder } =
  // useTodoContext();

  const handleEditFolderName = (id) => {
    setShowFolderEditForm((curr) => !curr);
    console.log(id);
  };

  // console.log({  });

  return (
    <div className="grid grid-cols-5 justify-items-start px-4">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        height="34"
        viewBox="0 -960 960 960"
        width="34"
        onClick={() => {
          console.log("clicked 1");
          if (showTasksSecondary) {
            setShowEdit(false);
          }
          setShowTasksSecondary(!showTasksSecondary);
        }}
        initial={{ rotate: "-90deg" }}
        animate={showTasksSecondary ? { rotate: "0deg" } : { rotate: "-90deg" }}
        transition={{ type: "tween", duration: 0.1 }}
      >
        <path
          d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"
          fill="rgb(229 231 235)"
        />
      </motion.svg>

      <div className="col-start-2 col-end-5 self-center text-wrap break-all">
        {/* here is where you have to add input */}
        {!showFolderEditForm ? (
          <p className="text-xl font-light text-gray-100 flex gap-1 items-center">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="27"
                viewBox="0 -960 960 960"
                width="27"
              >
                <path
                  d="M480-401.435 32.348-645.022 480-888.37l447.652 243.348L480-401.435Zm0 164.783L55.587-467.478l90.217-52.457L480-337.696l334.435-182.239 90.217 52.457L480-236.652Zm0 164.783L55.587-302.456l90.217-52.457 334.196 182 334.435-182 90.217 52.457L480-71.869Zm0-430.37 261.761-142.544L480-787.565 218.479-644.783 480-502.239Zm.239-142.783Z"
                  fill="rgb(229 231 235)"
                />
              </svg>
            </div>
            {title}
          </p>
        ) : (
          <Form
            action={editListAction}
            formShowingFn={setShowFolderEditForm}
            id={listId}
            type="update"
            className="flex w-full flex-col gap-2"
          >
            <Form.Input defaultValue={title} />
            <Form.SubmitBtn size={"small"}>Add</Form.SubmitBtn>
          </Form>
        )}
        {/*  */}
        {showTasksSecondary && (
          <>
            {showSForm && (
              <Form
                formShowingFn={setShowSForm}
                action={listfileAddingAction}
                id={listId}
                className="flex w-full flex-col gap-2 my-5"
              >
                <Form.Input />
                <Form.SubmitBtn size={"small"}>Add</Form.SubmitBtn>
              </Form>
            )}
            <motion.ul
              className="flex flex-col gap-3 mt-5 mb-3 overflow-hidden"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
            >
              {items.map((item) => (
                <Tasks item={item} key={item} />
              ))}
            </motion.ul>
          </>
        )}
      </div>
      <div className="col-start-5 col-end-6 justify-self-end relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
          className="col-start-5 col-end-6 justify-self-end cursor-pointer"
          onClick={() => {
            if (showTasksSecondary) {
              setShowEdit(!showEdit);
            } else {
              setShowTasksSecondary(!showTasksSecondary);
            }
            setShowSForm(false);
          }}
        >
          <path
            d="M232.688-396.413q-34.536 0-59.112-24.554Q149-445.52 149-480q0-34.674 24.553-59.13 24.554-24.457 59.034-24.457 34.578 0 59.202 24.457 24.624 24.456 24.624 59.01 0 34.555-24.594 59.131t-59.131 24.576Zm247.432 0q-34.555 0-59.131-24.554Q396.413-445.52 396.413-480q0-34.674 24.554-59.13Q445.52-563.587 480-563.587q34.674 0 59.13 24.457 24.457 24.456 24.457 59.01 0 34.555-24.457 59.131-24.456 24.576-59.01 24.576Zm247.361 0q-34.606 0-59.25-24.554Q643.587-445.52 643.587-480q0-34.674 24.644-59.13 24.644-24.457 59.25-24.457t59.063 24.457Q811-514.674 811-480.12q0 34.555-24.456 59.131-24.457 24.576-59.063 24.576Z"
            fill="rgb(229 231 235)"
          />
        </svg>

        {showEdit ? (
          <div className="absolute top-6 -left-14 text-gray-200 flex justify-center items-center gap-1 z-50">
            <button
              className="text-[.8] bg-blue-500  w-full p-1 rounded-lg flex justify-center items-center shadow-xl"
              onClick={() => {
                setShowSForm(!showSForm);
                setShowEdit(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path
                  d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"
                  fill="white"
                />
              </svg>
            </button>
            <button
              className="text-[.8rem] bg-red-500  w-full p-1 rounded-lg flex justify-center items-center  shadow-xl"
              onClick={() => deleteListAction(listId)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path
                  d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
                  fill="white"
                />
              </svg>
            </button>
            <button
              className="text-[.8rem] bg-yellow-500  w-full p-1 rounded-lg flex justify-center items-center  shadow-xl"
              // add input
              onClick={() => {
                handleEditFolderName(listId);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path
                  d="M212.309-140.001q-30.308 0-51.308-21t-21-51.308v-535.382q0-30.308 21-51.308t51.308-21h346.23L498.54-760H212.309q-4.616 0-8.463 3.846-3.846 3.847-3.846 8.463v535.382q0 4.616 3.846 8.463 3.847 3.846 8.463 3.846h535.382q4.616 0 8.463-3.846 3.846-3.847 3.846-8.463v-288.77l59.999-59.998v348.768q0 30.308-21 51.308t-51.308 21H212.309ZM480-480Zm-99.999 99.999v-137.306l362.385-362.384q9.307-9.308 20.461-13.577 11.153-4.269 22.692-4.269 11.768 0 22.614 4.269t19.769 13.192l50.23 50.077q8.693 9.307 13.346 20.538 4.654 11.23 4.654 22.768 0 11.539-3.961 22.385-3.962 10.845-13.269 20.153L515.384-380.001H380.001Zm456.768-406.307-50.23-51.384 50.23 51.384ZM440-440h49.846l249.309-249.309-24.923-24.923-26.692-25.692L440-492.384V-440Zm274.232-274.232-26.692-25.692 26.692 25.692 24.923 24.923-24.923-24.923Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ListItems;
