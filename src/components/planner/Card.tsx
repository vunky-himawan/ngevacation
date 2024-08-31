import { PlannnerCard } from "@/types/Planner/PlannerCard";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type CardProps = {
  isDragging: boolean;
  kanbanCard: PlannnerCard;
  handleDragging: (dragging: boolean) => void;
};

const Card = ({ kanbanCard, handleDragging }: CardProps) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const boardId = e.currentTarget.getAttribute("data-board-id");
    e.dataTransfer.setData("board-id", `${boardId}`);
    e.dataTransfer.setData("text", `${kanbanCard.card_id}`);
    handleDragging(true);
  };

  const handleDragEnd = () => handleDragging(false);

  return (
    <>
      <motion.div
        layout
        layoutId={kanbanCard.card_id}
        draggable
        onDragStartCapture={handleDragStart}
        onDragEnd={handleDragEnd}
        data-board-id={kanbanCard.board_id}
        className={`cursor-grab rounded-xl p-5 active:cursor-grabbing mt-2 bg-neutral-100 !opcacity-100`}
      >
        <p
          className={`font-medium ${
            kanbanCard.priority === "LOW" && "text-green-500"
          } ${kanbanCard.priority === "MEDIUM" && "text-yellow-500"} ${
            kanbanCard.priority === "HIGH" && "text-red-500"
          }`}
        >
          {kanbanCard.priority}
        </p>
        <h1 className="text-lg font-semibold">{kanbanCard.title}</h1>
        <p className="text-sm mt-5">{kanbanCard.description}</p>
        <div className="flex justify-between items-center mt-5">
          <p>Member: </p>
          <div className="flex relative">
            {kanbanCard.member.map((member, index) => (
              <Avatar className="relative" style={{ left: `-${index * 10}px` }}>
                <AvatarImage src={member.team.user.profile} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Card;
