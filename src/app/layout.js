import Search from "@/components/header";
import "./globals.css";
import Navigation from "@/components/navigation";
import { db } from "../../db";
import TodoProvider from "@/context/todo-context";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const users = await db.user.findMany();
  const userid = users.map((user) => user.id).at(0);

  if (users.length === 0) {
    const x = await db.user.create({
      data: {
        name: "test",
        email: "test@test",
        password: "test",
      },
    });
  }

  const defaultListId = await db.list.findFirst({
    where: {
      name: "default",
    },
  });

  if (defaultListId === null) {
    const createDefaultListName = await db.list.create({
      data: {
        name: "default",
        userId: userid,
      },
    });
  }

  const listFileArr = await db.listFile.findMany();

  if (listFileArr.length === 0) {
    const create = await Promise.all([
      db.listFile.create({
        data: {
          name: "Inbox",
          listId: defaultListId.id,
        },
      }),
      db.listFile.create({
        data: {
          name: "Today",
          listId: defaultListId.id,
        },
      }),
      db.listFile.create({
        data: {
          name: "Important",
          listId: defaultListId.id,
        },
      }),
      db.listFile.create({
        data: {
          name: "Overdue",
          listId: defaultListId.id,
        },
      }),
      db.listFile.create({
        data: {
          name: "Someday",
          listId: defaultListId.id,
        },
      }),
    ]);
  }

  return (
    <html lang="en">
      <body className="custom-grid max-w-[100rem] mx-auto ">
      <Toaster/>
        <TodoProvider>
          <h1 className="text-5xl text-gray-300  text-center border-b border-gray-600 bg-primary pt-4">
            nexttodo
          </h1>
          <Navigation userId={userid} />
          <Search />
          <main className="row-start-2 row-end-3 col-start-2 col-end-7">
            {children}
          </main>
        </TodoProvider>
      </body>
    </html>
  );
}
