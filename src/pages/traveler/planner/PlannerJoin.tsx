import { toast } from "@/components/ui/use-toast";
import { toast as sooner } from "sonner";
import { useJoinBoard } from "@/hooks/planner/useJoinBoard";
import { Navigate, useParams } from "react-router-dom";
export const PlannerJoin = () => {
  const { boardId, hash } = useParams<{ boardId: string; hash: string }>();
  const joinBoard = useJoinBoard();

  joinBoard({
    onSuccess: () => {
      toast({
        title: "Successfully Joined",
        description: "You have successfully joined the board.",
        duration: 1000,
      });
    },
    onError: (error) => {
      sooner(error);
    },
    boardId: boardId as string,
    hash: hash as string,
  });

  return <Navigate to={`/traveler/plans`} />;
};
