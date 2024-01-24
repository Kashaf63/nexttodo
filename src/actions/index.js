"use server";

import { revalidatePath } from "next/cache";
import { db } from "../../db";
import { redirect } from "next/navigation";

export async function listAddingAction(input, userId) {
  try {
    console.log(input, userId);
    const list = await db.list.create({
      data: {
        name: input,
        userId,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log("Something went wrong");
    }
  } finally {
    revalidatePath("/");
    console.log("Folder created successfully");
  }
}

export async function listfileAddingAction(input, listId) {
  console.log(input, listId);
  try {
    const listFile = await db.listFile.create({
      data: {
        name: input,
        listId: listId,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    } else {
      return {
        message: "Something went wrong",
      };
    }
  } finally {
    revalidatePath("/");
    return {
      message: "Folder created successfully",
    };
  }
}

export async function editListAction(text, id) {
  console.log({ id, text });

  try {
    const update = await db.list.update({
      where: {
        id,
      },
      data: {
        name: text,
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Folder updated successfully");
    revalidatePath("/");
  }
}

export async function listfileDeletingAction(id) {
  console.log(id);

  try {
    const remove = await db.listFile.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Folder deleted successfully");
    revalidatePath("/");
    redirect("/");
  }
}

export async function listfileEditAction(text, id) {
  console.log(text);
  console.log(id);
  try {
    const edit = await db.listFile.update({
      where: {
        id,
      },
      data: {
        name: text,
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Folder edited successfully");
    revalidatePath("/");
    redirect(`/list/${text}`);
  }
}

export async function todoAddingAction(input, listfileId, date, color) {
  const dateString = new Date(date);
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const formattedDate = dateString.toLocaleString("en-US", options);
  const formatedDate = formattedDate.replace(/,/g, "");

  try {
    const todo = await db.todo.create({
      data: {
        content: input,
        listfileId: listfileId,
        targetedTime: formatedDate,
        color: color,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log("Something went wrong");
    }
  } finally {
    revalidatePath("/");
    revalidatePath("/api/todos");
    revalidatePath("/Overdue");
    revalidatePath("/Today");
    console.log("Folder created successfully");
  }
}

export const handleOnTodoDelete = async (id, revalidate = false) => {
  try {
    const remove = await db.todo.delete({
      where: {
        id,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log("Something went wrong");
    }
  } finally {
    console.log("Folder delete successfully");
    revalidatePath("/");
    revalidatePath("/Overdue");
    revalidatePath("/Today");
    if (revalidate) redirect("/");
  }
};

export const todoEditAction = async (id, content, revalidate, path) => {
  try {
    const edit = await db.todo.update({
      where: {
        id,
      },
      data: {
        content,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log("Something went wrong");
    }
  } finally {
    console.log("Folder created successfully");
    revalidatePath(path === "/Inbox" ? "/" : `/list/${path}`);
    revalidatePath("/Overdue");
    revalidatePath("/Today");
    if (revalidate) redirect("/");
  }
};

export const deleteListAction = async (id) => {
  console.log(id);
  try {
    const remove = await db.list.delete({
      where: {
        id,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log("Something went wrong");
    }
  } finally {
    revalidatePath("/");
    redirect("/");
  }
};

export const changetodoStatus = async (id, status, path) => {
  console.log(path);
  try {
    const update = await db.todo.update({
      where: {
        id,
      },
      data: {
        completed: status,
      },
    });
    const edit = await db.todo.findMany({});
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Folder updated successfully");
    revalidatePath(path === "/Inbox" ? "/" : path);
  }
};
