import { PlannnerTeam } from "@/types/Planner/PlannerTeam";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { PlannnerCard } from "@/types/Planner/PlannerCard";
import { useEffect, useRef, useState } from "react";
import { PlannnerTaskList } from "@/types/Planner/PlannerTaskList";
import { PlannnerMember } from "@/types/Planner/PlannerMember";
import { useUpdateCard } from "@/hooks/planner/useUpdateCard";
import { useGetTeams } from "@/hooks/planner/useGetTeams";
import { toast } from "../ui/use-toast";
import { Textarea } from "../ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Label } from "../ui/label";

const EditForm = ({
  teamList,
  detailPlan,
  setOnEditedPlan,
  setIsEdit,
  onEditedPlan,
}: {
  teamList: PlannnerTeam[];
  detailPlan: PlannnerCard;
  setOnEditedPlan: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  onEditedPlan: boolean;
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH">(
    detailPlan.priority
  );
  const [onAddTask, setOnAddTask] = useState<boolean>(false);
  const [task, setTask] = useState<string>("");
  const [taskList, setTaskList] = useState<PlannnerTaskList[]>(
    detailPlan.tasklist
  );
  const [selectedMembers, setSelectedMembers] = useState<PlannnerMember[]>(
    detailPlan.member
  );
  const [search, setSearch] = useState<string>("");
  const [teams, setTeams] = useState<PlannnerTeam[]>([]);
  const updateCard = useUpdateCard();
  const getTeams = useGetTeams();

  useEffect(() => {
    if (search !== "") {
      getTeams({
        onSuccess: (data: PlannnerTeam[]) => {
          const filteredTeams = data.filter((team) => {
            // Cek apakah team_id dari teams tidak ada di member dari detailPlan
            return !selectedMembers.some(
              (member) => member.team.team_id === team.team_id
            );
          });

          setTeams(filteredTeams);
        },
        onError: () => {},
        board_id: detailPlan.board_id,
        query: search,
      });
    } else {
      const filteredTeams = teams.filter((team) => {
        // Cek apakah team_id dari teams tidak ada di member dari detailPlan
        return !selectedMembers.some(
          (member) => member.team.team_id === team.team_id
        );
      });

      setTeams(filteredTeams);
    }
  }, [search]);

  const handleAddTask = () => {
    const newTask: PlannnerTaskList = {
      task: task,
    };

    setTaskList([...taskList, newTask]);
  };

  const handleTastkListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    const updatedTaskList = detailPlan.tasklist.map(
      (task: PlannnerTaskList) => {
        if (task.task_list_id === id) {
          return { ...task, is_done: checked };
        }

        return task;
      }
    );

    setTaskList(updatedTaskList);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    formData.append("priority", priority);
    taskList.forEach((task: PlannnerTaskList, index: number) => {
      if (task.task_list_id) {
        formData.append(`tasklist[${index}][task_list_id]`, task.task_list_id);
        formData.append(`tasklist[${index}][task]`, task.task);
        formData.append(`tasklist[${index}][is_done]`, `${task.is_done}`);
      } else {
        formData.append(`tasklist[${index}][task]`, task.task);
      }
    });
    selectedMembers.forEach((member, index) => {
      formData.append(`members[${index}][team_id]`, member.team.team_id);
    });

    updateCard({
      onSuccess: () => {
        toast({
          title: "Task List Updated",
          description: "Your task list has been updated successfully.",
          duration: 1000,
        });
        setOnEditedPlan(!onEditedPlan);
        setIsEdit(false);
      },
      onError: () => {},
      board_id: detailPlan.board_id,
      card_id: detailPlan.card_id,
      data: formData,
    });
  };

  const handleDeleteMember = ({ team_id }: { team_id: string }) => {
    setSelectedMembers((prevMembers) => {
      const updatedMembers = prevMembers.filter(
        (member) => member.team.team_id !== team_id
      );

      // Temukan anggota yang dihapus
      const deletedMember = prevMembers.find(
        (member) => member.team.team_id === team_id
      );

      // Masukkan anggota yang dihapus kembali ke dalam teams jika ditemukan
      if (deletedMember) {
        setTeams((prevTeams) => [...prevTeams, deletedMember.team]);
      }

      return updatedMembers;
    });
  };

  const handleAddMember = ({ team_id }: { team_id: string }) => {
    const newTeam = teamList.find((team) => team.team_id === team_id);
    const newMember = {
      team: newTeam as PlannnerTeam,
    };

    setSelectedMembers((prevState) => [
      ...prevState,
      newMember as PlannnerMember,
    ]);

    setTeams((prevState) =>
      prevState.filter((team) => team.team_id !== team_id)
    );
  };

  return (
    <>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-2"
      >
        <div className="flex flex-col gap-2">
          <Textarea name="title" defaultValue={detailPlan.title} />
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-sm">Priority</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"outline"} className="flex items-center gap-2">
                  <div
                    className={`${priority === "LOW" && "bg-green-500"}
                              ${priority === "MEDIUM" && "bg-yellow-500"}
                              ${priority === "HIGH" && "bg-red-500"}
                              w-5 h-5 rounded-full`}
                  ></div>
                  <p>{priority}</p>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => setPriority("LOW")}>
                  <div className="flex items-center gap-2">
                    <div className="bg-green-500 w-5 h-5 rounded-full"></div>
                    <p>Low</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setPriority("MEDIUM")}>
                  <div className="flex items-center gap-2">
                    <div className="bg-yellow-500 w-5 h-5 rounded-full"></div>
                    <p>Medium</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setPriority("HIGH")}>
                  <div className="flex items-center gap-2">
                    <div className="bg-red-500 w-5 h-5 rounded-full"></div>
                    <p>High</p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div>
          <p className="font-semibold text-sm">Description</p>
          <Textarea name="description" defaultValue={detailPlan.description} />
        </div>

        <div>
          <p className="font-semibold text-sm">Task List</p>
          <div className="flex flex-col gap-5 my-3 max-h-[7rem] overflow-scroll">
            {taskList.map((task: PlannnerTaskList, index: number) => (
              <div
                key={task.task_list_id ? task.task_list_id : index}
                className="flex items-center gap-2"
              >
                <input
                  id={task.task_list_id}
                  type="checkbox"
                  onChange={handleTastkListChange}
                  defaultChecked={task.is_done}
                />
                <Label
                  htmlFor={task.task_list_id}
                  className={`${task.is_done && "line-through"}`}
                >
                  {task.task}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {onAddTask && (
          <div className="flex gap-2">
            <Input
              placeholder="Task"
              onChange={(e) => setTask(e.target.value)}
            />
            <Button
              variant={"outline"}
              onClick={() => {
                handleAddTask();
                setOnAddTask(false);
              }}
            >
              Add
            </Button>
          </div>
        )}

        {!onAddTask && (
          <Button
            variant={"outline"}
            type="button"
            onClick={() => setOnAddTask(!onAddTask)}
          >
            <span className="icon-[iconamoon--sign-plus-light] w-5 h-5"></span>
            Add Task
          </Button>
        )}

        <div className="flex flex-col gap-5 my-3">
          <h1 className="font-semibold text-sm">Assigned to:</h1>
          <div className="flex flex-col gap-5 max-h-[7rem] overflow-scroll">
            {selectedMembers.map((member) => (
              <div
                key={member.team.team_id}
                className="flex justify-between items-center"
              >
                <div className="flex justify-start items-center gap-3">
                  <Avatar>
                    <AvatarImage src={member.team.user.profile} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <h1>{member.team.user.username}</h1>
                </div>
                <Button
                  variant={"ghost"}
                  className="hover:bg-transparent"
                  type="button"
                  onClick={() =>
                    handleDeleteMember({ team_id: member.team.team_id })
                  }
                >
                  <span className="icon-[iconamoon--sign-minus-circle-thin] text-red-500 w-5 h-5"></span>
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Input
            placeholder="Search Member"
            onChange={(e) => setSearch(e.target.value)}
          />
          {teams.slice(0, 1).map((team) => (
            <div
              onClick={() => handleAddMember({ team_id: team.team_id })}
              key={team.team_id}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
            >
              <Avatar>
                <AvatarImage src={team.user.profile} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p>{team.user.username}</p>
            </div>
          ))}
          {teams.length === 0 && (
            <p className="text-xs text-center text-muted-foreground">
              No members found
            </p>
          )}
          <p className="text-xs text-center text-muted-foreground">
            Search for get more
          </p>
        </div>

        <DialogFooter>
          <Button className="bg-orange-500 hover:bg-orange-400">Save</Button>
        </DialogFooter>
      </form>
    </>
  );
};

export default EditForm;
