import type { Task, Project } from "@prisma/client";

type TaskProps = {
  title: { title: Task["title"] };
  dueDate: { dueDate: Task["dueDate"] };
  priority: { priority: Task["priority"] };
  name: { name: Project["name"] };
};

export default function TaskView({title, dueDate, priority, name}: TaskProps) {
  console.log(typeof dueDate.dueDate)
  return (
    <>
      <div className="flex flex-row">
        <svg
          className="h-8 w-8 text-white"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {" "}
          <path stroke="none" d="M0 0h24v24H0z" />{" "}
          <circle cx="12" cy="12" r="9" />
        </svg>

        <div className="flex flex-col">
          <p>{title.title}</p>
          <p>{dueDate.dueDate.toString()}</p>
        </div>
        <span>{name.name}</span>
        
      </div>
    </>
  );
}
