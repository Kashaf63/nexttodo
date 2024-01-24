"use server";

import ListItems from "./list-items";
import MainDropBtn from "./Buttons/main-drop-btn";
import ListAddingBtn from "./Buttons/list-adding-btn";
import ListsContainer from "./Conatiners/lists-container";
import ListTaskAddingFormContainer from "./Conatiners/list-task-adding-form-container";
import DefaultNavigation from "./default-navigation";
import { db } from "../../db";

async function Navigation({ userId }) {
  const lists = await db.list.findMany();

  return (
    <div className="bg-primary overflow-y-scroll scroll-smooth py-4 px-4 navigation">
      <DefaultNavigation />

      <div>
        <div className="flex items-center justify-between gap-2 border-t border-b py-2 mb-5 border-gray-600 relative">
          <div className="flex gap-4 items-center">
            <MainDropBtn />
            <h2 className="text-3xl font-bold text-gray-100">List</h2>
          </div>
          <ListAddingBtn />
        </div>
        <ListTaskAddingFormContainer userId={userId}/>

        <ListsContainer>
          {
          lists.map(async (list) => {
            const items = await db.listFile.findMany({
              where: {
                listId: list.id,
              },
            });

            const itemsArr = items.map((item) => {
              return item.name;
            });

            if (list.name !== "default")
              return (
                <ListItems
                  key={list.id}
                  title={list.name}
                  items={itemsArr}
                  listId={list.id}
                />
              );
          })}
        </ListsContainer>
      </div>
    </div>
  );
}

export default Navigation;
