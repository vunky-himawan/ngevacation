import { useDeleteCard } from "@/hooks/planner/useDeleteCard";
import { PlannnerCard } from "@/types/Planner/PlannerCard";
import { PlannnerTeam } from "@/types/Planner/PlannerTeam";
import { useState } from "react";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import AddCardForm from "./AddCard";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Card from "./Card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import EditForm from "./EditCard";
import TaskList from "./TaskList";

type ColumnProps = {
  isDragging: boolean;
  handleUpdateList: (
    card_id: string,
    board_id: string,
    status: "TODO" | "DOING" | "DONE"
  ) => void;
  board_id: string;
  cards: PlannnerCard[];
  status: "TODO" | "DOING" | "DONE";
  handleDragging: (dragging: boolean) => void;
  setOnEditedPlan: React.Dispatch<React.SetStateAction<boolean>>;
  onEditedPlan: boolean;
  onAddNewCard: boolean;
  setOnAddNewCard: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenForm: React.Dispatch<React.SetStateAction<string>>;
  openForm: string;
  teamList: PlannnerTeam[];
};

const Column = ({
  isDragging,
  handleUpdateList,
  cards,
  board_id,
  status,
  handleDragging,
  setOnEditedPlan,
  onEditedPlan,
  onAddNewCard,
  setOnAddNewCard,
  setOpenForm,
  openForm,
  teamList,
}: ColumnProps) => {
  const deleteCard = useDeleteCard();
  const filtered = cards.filter((card: PlannnerCard) => card.status === status);
  const [isEdit, setIsEdit] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    handleUpdateList(
      e.dataTransfer.getData("text"),
      e.dataTransfer.getData("board-id"),
      status
    );
    handleDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleEdit = () => setIsEdit(!isEdit);

  const handleDelete = ({
    board_id,
    card_id,
  }: {
    board_id: string;
    card_id: string;
  }) => {
    deleteCard({
      onSuccess: () => {
        toast({
          title: "Card Deleted",
          description: "Your card has been deleted successfully.",
          duration: 1000,
        });
        setOnEditedPlan(!onEditedPlan);
      },
      onError: () => {},
      board_id: board_id,
      card_id: card_id,
    });
  };

  return (
    <>
      <div className="flex-1 shrink-0">
        <div className="mb-3 flex items-center justify-between">
          <h3 className={`font-semibold text-orange-500`}>{status}</h3>

          <span className="rounded text-sm text-neutral-400">
            {filtered.length}
          </span>
        </div>

        <Button
          data-status={status}
          variant={"outline"}
          className="w-full"
          onClick={(e) => {
            setOpenForm(e.currentTarget.getAttribute("data-status")!);
            setOnAddNewCard(!onAddNewCard);
          }}
        >
          <span className="icon-[iconamoon--sign-plus-thin] w-5 h-5"></span>
          Add Card
        </Button>

        {onAddNewCard && status === openForm && (
          <AddCardForm
            teams={teamList}
            onEditedPlan={onEditedPlan}
            status={status}
            board_id={board_id}
            setOnEditedPlan={setOnEditedPlan}
            setOpenForm={setOpenForm}
          />
        )}

        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`h-full w-full transition-colors ${
            isDragging ? "bg-neutral-800/10" : "bg-neutral-800/0"
          }`}
        >
          {filtered.map((c: PlannnerCard) => {
            return (
              <Dialog
                key={c.card_id}
                onOpenChange={(e) => {
                  setIsEdit(!e);
                }}
              >
                <DialogTrigger asChild>
                  <div>
                    <Card
                      isDragging={isDragging}
                      handleDragging={handleDragging}
                      key={c.card_id}
                      kanbanCard={c}
                    />
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <div className="flex justify-between items-center py-5">
                      <DialogTitle className="font-cabinet font-semibold text-2xl">
                        Task List
                      </DialogTitle>
                      <Button
                        onClick={handleEdit}
                        variant={"ghost"}
                        className="flex gap-3"
                      >
                        {isEdit ? (
                          <p>Close</p>
                        ) : (
                          <>
                            <p>Edit</p>
                            <span className="icon-[iconamoon--edit-thin] w-5 h-5" />
                          </>
                        )}
                      </Button>
                    </div>
                  </DialogHeader>
                  {!isEdit && (
                    <>
                      <div className="flex flex-col gap-2">
                        <h2 className="font-semibold text-xl">{c.title}</h2>
                        <div className="flex flex-col gap-1">
                          <p className="font-semibold ">Priority</p>
                          <div className="flex items-center gap-2">
                            <div
                              className={`${
                                c.priority === "LOW" && "bg-green-500"
                              }
                                  ${c.priority === "MEDIUM" && "bg-yellow-500"}
                                  ${c.priority === "HIGH" && "bg-red-500"}
                                  w-5 h-5 rounded-full`}
                            ></div>
                            <p>{c.priority}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold">Description</p>
                        <p>{c.description}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Assigned to:</p>
                        <div className="flex flex-wrap gap-5 ">
                          {c.member.map((member) => (
                            <div className="bg-gray-100 flex gap-3 p-2 items-center rounded-md">
                              <Avatar className="w-5 h-5">
                                <AvatarImage src={member.team.user.profile} />
                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                              <p>{member.team.user.username}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold">Task List</p>
                        <TaskList isEdit={isEdit} taskList={c.tasklist} />
                      </div>
                    </>
                  )}
                  {isEdit ? (
                    <EditForm
                      teamList={teamList}
                      onEditedPlan={onEditedPlan}
                      detailPlan={c}
                      setOnEditedPlan={setOnEditedPlan}
                      setIsEdit={setIsEdit}
                    />
                  ) : (
                    <DialogFooter>
                      <Button
                        type="button"
                        variant={"ghost"}
                        onClick={() =>
                          handleDelete({
                            board_id: c.board_id,
                            card_id: c.card_id,
                          })
                        }
                        className="flex gap-3"
                      >
                        Delete
                        <span className="icon-[iconamoon--trash-duotone] w-5 h-5 relative z-50" />
                      </Button>
                    </DialogFooter>
                  )}
                </DialogContent>
              </Dialog>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Column;
