import TaskShowingPage from "@/components/TaskShowingPage";

async function Task({ params }) {
  const { slug } = params;
  

  return (
    <div className="main-wrapper">
      <TaskShowingPage definated={slug}/>
    </div>
  );
}

export default Task;
