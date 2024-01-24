import TaskShowingPage from "@/components/TaskShowingPage";

function ImportantTask() {
  return (
    <div className="main-wrapper">
      <TaskShowingPage
        definated="Important"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="34"
            viewBox="0 -960 960 960"
            width="34"
          >
            <path
              d="m354-247 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-80l65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Zm247-350Z"
              fill="hsl(54, 78%, 58%)"
            />
          </svg>
        }
      />
    </div>
  );
}

export default ImportantTask;
