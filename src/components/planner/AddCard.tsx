import { useGetTeams } from "@/hooks/planner/useGetTeams";
import { usePostCard } from "@/hooks/planner/usePostCard";
import { PlannnerTaskList } from "@/types/Planner/PlannerTaskList";
import { PlannnerTeam } from "@/types/Planner/PlannerTeam";
import { useEffect, useRef, useState } from "react";
import { toast } from "../ui/use-toast";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";

type AddCardProps = {
  status: string;
  board_id: string;
  teams: PlannnerTeam[];
  setOnEditedPlan: React.Dispatch<React.SetStateAction<boolean>>;
  onEditedPlan: boolean;
  setOpenForm: React.Dispatch<React.SetStateAction<string>>;
};

const AddCardForm = ({
  status,
  board_id,
  teams,
  setOnEditedPlan,
  onEditedPlan,
  setOpenForm,
}: AddCardProps) => {
  const [selectedPriority, setSelectedPriority] = useState<
    "LOW" | "MEDIUM" | "HIGH"
  >("LOW");
  const formRef = useRef<HTMLFormElement>(null);
  const postCard = usePostCard();
  const [teamList, setTeamList] = useState<PlannnerTeam[]>(teams);
  const [selectedMembers, setSelectedMembers] = useState<PlannnerTeam[]>([]);
  const [onAddTask, setOnAddTask] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const searchMember = useGetTeams();
  const [task, setTask] = useState<string>("");
  const [taskList, setTaskList] = useState<PlannnerTaskList[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("status", status);
    formData.append("priority", selectedPriority);
    selectedMembers.forEach((member, index) => {
      formData.append(`members[${index}][team_id]`, member.team_id);
    });
    taskList.forEach((task, index) => {
      formData.append(`tasklist[${index}][task]`, task.task);
    });

    postCard({
      onSuccess: () => {
        toast({
          title: "Card Created",
          description: "Your card has been created successfully.",
          duration: 1000,
        });
        setOnEditedPlan(!onEditedPlan);
        setOpenForm("");
      },
      onError: () => {},
      board_id: board_id,
      data: formData,
    });
  };

  const handleSelectedMembers = ({ team_id }: { team_id: string }) => {
    const selectedTeam = teamList.find((team) => team.team_id === team_id);

    setSelectedMembers((prevState) => [
      ...prevState,
      selectedTeam as PlannnerTeam,
    ]);

    setTeamList((prevState) =>
      prevState.filter((team) => team.team_id !== team_id)
    );
  };

  const handleDeleteMember = ({ team_id }: { team_id: string }) => {
    const member = selectedMembers.find((member) => member.team_id === team_id);

    setTeamList((prev) => [...prev, member as PlannnerTeam]);

    setSelectedMembers((prevState) =>
      prevState.filter((member) => member.team_id !== team_id)
    );
  };

  const handleAddTask = () => {
    const newTask: PlannnerTaskList = {
      task: task,
    };

    setTaskList([...taskList, newTask]);
  };

  const handleDeleteTask = ({ task }: { task: string }) => {
    const filteredTasks = taskList.filter((t) => t.task !== task);
    setTaskList(filteredTasks);
  };

  useEffect(() => {
    if (search !== "") {
      searchMember({
        onSuccess: (data: PlannnerTeam[]) => {
          setTeamList(data);
        },
        onError: () => {},
        board_id: board_id,
        query: search,
      });
    } else {
      setTeamList(teams);
    }
  }, [search]);

  return (
    <>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="p-5 border mt-5 rounded-lg flex flex-col gap-3"
      >
        <div>
          <Label className="font-cabinet font-semibold ">Title</Label>
          <Textarea name="title" placeholder="Title" />
        </div>

        <div>
          <Label className="font-cabinet font-semibold ">Description</Label>
          <Textarea name="description" placeholder="Description" />
        </div>

        <div>
          <Label className="font-cabinet font-semibold">Priority</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="flex gap-2 w-full justify-start"
                  >
                    <div
                      className={`${
                        selectedPriority === "LOW" && "bg-green-500"
                      }
                              ${
                                selectedPriority === "MEDIUM" && "bg-yellow-500"
                              }
                              ${selectedPriority === "HIGH" && "bg-red-500"}
                              w-5 h-5 rounded-full`}
                    ></div>
                    <p>{selectedPriority}</p>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={() => setSelectedPriority("LOW")}>
                    <div className="flex items-center gap-2">
                      <div className="bg-green-500 w-10 h-5"></div>
                      <p>Low</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => setSelectedPriority("MEDIUM")}
                  >
                    <div className="flex items-center gap-2">
                      <div className="bg-yellow-500 w-10 h-5"></div>
                      <p>Medium</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => setSelectedPriority("HIGH")}
                  >
                    <div className="flex items-center gap-2">
                      <div className="bg-red-500 w-10 h-5"></div>
                      <p>High</p>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </DropdownMenuTrigger>
            <DropdownMenuContent></DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div>
          <Label className="font-cabinet font-medium">Assignment to:</Label>
          <div className="flex flex-wrap gap-3 my-3">
            {selectedMembers.length > 0 &&
              selectedMembers.map((member) => (
                <div
                  className="flex gap-2 p-2 bg-gray-100 items-center rounded-md"
                  key={member.user.user_id}
                >
                  <Avatar className="w-5 h-5">
                    <AvatarImage src={member.user.profile} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="text-sm">{member.user.username}</p>
                  <button
                    onClick={() =>
                      handleDeleteMember({ team_id: member.team_id })
                    }
                    type="button"
                    className="icon-[iconamoon--sign-plus-thin] rotate-45"
                  />
                </div>
              ))}
          </div>
          <div className="flex flex-col gap-3">
            <Input
              placeholder="Search Member"
              onChange={(e) => setSearch(e.target.value)}
            />
            {teamList.length === 0 && (
              <p className="text-xs text-center text-muted-foreground">
                No members found
              </p>
            )}
            {teamList.slice(0, 3).map((team) => (
              <div
                onClick={() => handleSelectedMembers({ team_id: team.team_id })}
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
            <p className="text-xs text-center text-muted-foreground">
              Search for get more
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {taskList.map((task: PlannnerTaskList, index: number) => (
            <div className="flex items-center justify-between gap-2">
              <div key={index} className="flex items-center gap-2">
                <input type="checkbox" />
                <p className={`${task.is_done && "line-through"}`}>
                  {task.task}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleDeleteTask({ task: task.task })}
              >
                <span className="icon-[iconamoon--sign-plus-thin] w-5 h-5 rotate-45"></span>
              </button>
            </div>
          ))}
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

        <div>
          <Button className="bg-orange-500 w-full hover:bg-orange-400">
            <span className="icon-[iconamoon--sign-plus-thin] w-5 h-5" />
            Add Card
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddCardForm;
