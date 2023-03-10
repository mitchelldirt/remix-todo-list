import { Link, Form, LiveReload } from "@remix-run/react";

import type { Project } from "@prisma/client";
import { format } from "date-fns-tz";

// create a type with action data and outlet context
type ActionData = {
  formError?: string;
};

// TODO: Why are these optional?
type OutletContext = {
  projects?: Project[];
  projectId?: string;
  noneId?: string;
};

export default function NewTaskModal({
  actionData,
  context,
}: {
  actionData: ActionData | null;
  context: OutletContext;
}) {
  return (
    <>
      <input
        type="checkbox"
        id="createToDoModal"
        className="modal-toggle"
        checked
        readOnly
      />
      <div className="modal">
        <div className="modal-box relative">
          <Link to={`/project/${context.projectId}`}>
            <label
              htmlFor="createProjectModal"
              className="btn-sm btn-circle btn absolute right-2 top-2"
            >
              ✕
            </label>
          </Link>
          <h3 className="w-full text-center text-lg font-bold">Create Task</h3>
          <Form method="post">
            <input
              type="hidden"
              name="projectId"
              value={context.projectId}
            />
            {actionData ? (
              <span className="mt-4 flex justify-center">
                <p
                  className="form-validation-error text-center text-red-500"
                  role="alert"
                >
                  {actionData.formError}
                </p>
              </span>
            ) : null}

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">
                  Name
                  <span className="ml-2 text-lg text-red-400">*</span>
                </span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input-bordered input w-full max-w-xs"
                name="name"
                required
                minLength={3}
                maxLength={27}
              />
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">
                  Project
                  <span className="ml-2 text-lg text-red-400">*</span>
                </span>
              </label>
              <select
                defaultValue={context.projectId || "none"}
                name="project"
                className="select-bordered select"
              >
                <option value={context.noneId}>NONE</option>
                {context.projects
                  ?.filter((project) => project.id !== context.noneId)
                  .map((project) => {
                    return (
                      <option value={project.id} key={project.id}>
                        {project.name}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                className="textarea-bordered textarea h-24"
                placeholder="Type here"
                name="description"
              ></textarea>
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Due date</span>
              </label>
              <input
                type="date"
                placeholder=""
                className="input-bordered input w-full max-w-xs"
                defaultValue={format(new Date(), "yyyy-MM-dd HH:mm z").slice(0, 10)}
                name="dueDate"
              />
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Due time</span>
              </label>
              <input
                type="time"
                placeholder=""
                className="input-bordered input w-full max-w-xs"
                name="dueTime"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Priority</span>
              </label>
              <fieldset className="form-control w-full max-w-xs rounded-lg border-2 border-gray-400 border-opacity-20">
                <div className="form-control ">
                  <label className="label cursor-pointer">
                    <span className="label-text">none</span>
                    <input
                      type="radio"
                      name="priority"
                      value={4}
                      className="radio checked:bg-gray-400"
                      defaultChecked
                    />
                  </label>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">low</span>
                    <input
                      type="radio"
                      name="priority"
                      value={3}
                      className="radio checked:bg-blue-400"
                    />
                  </label>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">medium</span>
                    <input
                      type="radio"
                      name="priority"
                      value={2}
                      className="radio checked:bg-orange-400"
                    />
                  </label>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">high</span>
                    <input
                      type="radio"
                      name="priority"
                      value={1}
                      className="radio checked:bg-red-400"
                    />
                  </label>
                </div>
              </fieldset>
            </div>

            <button
              type="submit"
              className="btn mt-4 w-full text-white hover:bg-green-400"
            >
              Create
            </button>
            <LiveReload />
          </Form>
        </div>
      </div>
    </>
  );
}
