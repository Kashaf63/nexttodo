"use client";

import {
  createContext,
  useContext,
  useState,
  useReducer,
  useRef,
  useEffect,
} from "react";
import { motion } from "framer-motion";
import { DateTimePicker } from "@progress/kendo-react-dateinputs";
import toast from "react-hot-toast";

const intialState = {
  date: new Date(),
  input: "",
  textarea: "",
  color: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DATE":
      return { ...state, date: action.payload };
    case "SET_INPUT":
      return { ...state, input: action.payload };
    case "SET_TEXTAREA":
      return { ...state, textarea: action.payload };
    case "SET_COLOR":
      return { ...state, color: action.payload };
    default:
      throw new Error("Action unkonwn");
  }
};

const FormContext = createContext();

function Form({
  children,
  action,
  className,
  id,
  type = "create",
  revalidate,
  formShowingFn,
}) {
  const [{ textarea, input, date, color }, dispatch] = useReducer(
    reducer,
    intialState
  );
  const formRef = useRef(null);

  const validInput = input.split(" ").join("");

  const bindFn = textarea
    ? action.bind(null, textarea, id, date, color)
    : action.bind(null, validInput, id);

  const ubindFn = revalidate
    ? action.bind(null, id, textarea, revalidate.revalidate, revalidate.path)
    : action.bind(null, validInput, id);

  const handleOutsideClick = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      formShowingFn(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = type === "update" ? ubindFn : bindFn;

    try {
      await action();
    } catch (error) {
      console.log(error);
      if (error)
        toast.error("Some error occured", {
          duration: 2000,
          position: "top-center",

          style: { background: "hsl(212, 29%, 18%)", color: "white" },

          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });
    } finally {
      toast.success("The work is successfully done", {
        duration: 2000,
        position: "top-center",

        style: { background: "hsl(212, 29%, 18%)", color: "white" },

        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
    }

    formShowingFn(false);
  };

  return (
    <FormContext.Provider value={{ date, dispatch }}>
      <form
        ref={formRef}
        className={className}
        // action={type === "update" ? ubindFn : bindFn}
        onSubmit={handleSubmit}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}

function Input({ type = "text", placeholder = "Add", defaultValue }) {
  const { dispatch } = useContext(FormContext);
  return (
    <input
      type={type}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="w-full px-4 py-2 rounded-lg bg-inherit border border-gray-600 text-gray-300 focus:outline-none"
      onChange={(e) => {
        dispatch({
          type: "SET_INPUT",
          payload: e.target.value,
        });
      }}
    />
  );
}

function Textarea({ row = 6, type = "text", defaultValue }) {
  const { dispatch } = useContext(FormContext);

  return (
    <textarea
      type={type}
      placeholder="+ Add Task"
      defaultValue={defaultValue}
      required
      className="w-full px-4 py-2 rounded-lg bg-inherit border border-gray-600 text-gray-300 focus:outline-none"
      rows={row}
      onChange={(e) => {
        dispatch({ type: "SET_TEXTAREA", payload: e.target.value });
      }}
    />
  );
}

function ColorPicker() {
  const { dispatch } = useContext(FormContext);

  return (
    <div className="flex gap-2">
      <button
        className="aspect-video rounded-lg h-[2rem] bg-sky-500"
        onClick={() => {
          dispatch({ type: "SET_COLOR", payload: "bg-sky-500/20" });
        }}
        type="button"
      />
      <button
        className="aspect-video rounded-lg h-[2rem] bg-yellow-500"
        onClick={() => {
          dispatch({ type: "SET_COLOR", payload: "bg-yellow-500/20" });
        }}
        type="button"
      />
      <button
        className="aspect-video rounded-lg h-[2rem] bg-red-500"
        onClick={() => {
          dispatch({ type: "SET_COLOR", payload: "bg-red-500/20" });
        }}
        type="button"
      />
      <button
        className="aspect-video rounded-lg h-[2rem] bg-green-400"
        onClick={() => {
          dispatch({ type: "SET_COLOR", payload: "bg-green-400/20" });
        }}
        type="button"
      />
    </div>
  );
}

function DatePicker() {
  const { dispatch } = useContext(FormContext);

  return (
    <DateTimePicker
      className="date"
      defaultValue={new Date()}
      onChange={(e) =>
        dispatch({ type: "SET_DATE", payload: e.target.value.toString() })
      }
    />
  );
}

function SubmitBtn({ children, size, bgc }) {
  if (size === "small") {
    return (
      <button
        type="submit"
        className={`bg-blue-500 text-sm text-white px-2 py-1 rounded-lg ${bgc}`}
      >
        {children}
      </button>
    );
  }
  if (size === "normal") {
    return (
      <button
        type="submit"
        className={`bg-blue-500 text-white px-4 py-1 rounded-lg ${bgc}`}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      type="submit"
      className="bg-blue-500 text-white px-5 py-2 rounded-lg w-full"
    >
      {children}
    </button>
  );
}

Form.Input = Input;
Form.Textarea = Textarea;
Form.ColorPicker = ColorPicker;
Form.DatePicker = DatePicker;
Form.SubmitBtn = SubmitBtn;

export default Form;
