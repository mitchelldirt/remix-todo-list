import { createTailwindTextColor } from "~/helpers/colorClass";

import type { Project } from "@prisma/client";
import { Link } from "@remix-run/react";

type projectList = {
  projects: Project[];
  noneId: string;
};

export default function ProjectList({ projects, noneId }: projectList) {
  
  return (
    <>
      <div className="flex flex-col">
        {projects
          .filter((project) => project.id !== noneId)
          .map((project) => {
            const textColorClass = createTailwindTextColor(project.color);

            return (
              <Link
                className={`btn-wide btn justify-start rounded-none border-0 border-b-2 border-slate-400 first:rounded-t-md last:rounded-b-md hover:border-slate-200`}
                key={project.id}
                to={`/project/${project.id}`}
              >
                <button className={`${textColorClass}`}>{project.name}</button>
              </Link>
            );
          })}
      </div>
    </>
  );
}
