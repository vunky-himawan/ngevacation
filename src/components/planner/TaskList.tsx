import { PlannnerTaskList } from "@/types/Planner/PlannerTaskList";

const TaskList = ({
  taskList,
  isEdit,
}: {
  taskList: PlannnerTaskList[];
  isEdit: boolean;
}) => {
  return (
    <>
      <div className="flex flex-col gap-2 max-h-[10rem] overflow-scroll">
        {taskList.map((task: PlannnerTaskList) => (
          <div key={task.task_list_id} className="flex items-center gap-2">
            {isEdit && <input type="checkbox" defaultChecked={task.is_done} />}
            <p className={`${task.is_done && "line-through"}`}>{task.task}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default TaskList;
