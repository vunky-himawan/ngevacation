import { useAuth } from "@/context/AuthContext";
import { useGetBoard } from "@/hooks/planner/useGetBoard";
import MainLayout from "@/layouts/MainLayout";
import { SEOModel } from "@/models/SEO";
import { Board } from "@/types/Planner/PlannerBoard";
import { PlannnerCard } from "@/types/Planner/PlannerCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUpdateCard } from "@/hooks/planner/useUpdateCard";
import { toast } from "@/components/ui/use-toast";
import { useGetInvitationLink } from "@/hooks/planner/useGetInvitationLink";
import { toast as sooner } from "sonner";
import { useLeaveTeam } from "@/hooks/planner/useLeaveTeam";
import TeamList from "@/components/planner/TeamList";
import Column from "@/components/planner/BoardColumn";
import { Skeleton } from "@/components/ui/skeleton";
import { Helmet } from "react-helmet-async";

const PlannerDetail = () => {
  const { token } = useAuth();
  const { planId } = useParams<{ planId: string }>();
  const [board, setBoard] = useState<Board>({} as Board);
  const getBoard = useGetBoard();
  const [isDragging, setIsDragging] = useState(false);
  const [listItems, setListItems] = useState<PlannnerCard[]>([]);
  const [onEditedPlan, setOnEditedPlan] = useState<boolean>(false);
  const [onAddNewCard, setOnAddNewCard] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [openForm, setOpenForm] = useState<string>("");
  const updateStatus = useUpdateCard();
  const getLink = useGetInvitationLink();
  const leaveTeam = useLeaveTeam();

  useEffect(() => {
    getBoard(
      (data: Board) => {
        setBoard(data);
        const priorityOrder = { LOW: 1, MEDIUM: 2, HIGH: 3 };
        const cards = data.kanban_card;
        cards.sort(
          (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
        );
        setListItems(cards);
        setIsLoading(false);
      },
      (message: string) => {
        console.log(message);
      },
      token as string,
      planId as string
    );
  }, [onEditedPlan]);

  const SEO: SEOModel = {
    title: board.title ? board.title : "Planner",
    description:
      "Explore a variety of captivating articles that uncover hidden destinations and unique experiences for travelers. Find inspiration for your next journey on Hidden Gems.",
    siteName: "Hidden Gems",
    siteUrl: "https://hiddengems.com/planner",
    keywords: [
      "hidden gems",
      "travel articles",
      "hidden destinations",
      "travel tips",
      "travel experiences",
    ],
    type: "website",
  };

  const handleDragging = (dragging: boolean) => setIsDragging(dragging);

  const handleUpdateList = (
    card_id: string,
    board_id: string,
    status: "TODO" | "DOING" | "DONE"
  ) => {
    const card = listItems.find((item) => item.card_id === card_id);

    if (card && card.status !== status) {
      const formData = new FormData();
      formData.append("status", status);

      updateStatus({
        onSuccess: () => {
          toast({
            title: "Status Updated",
            description: "Your status has been updated successfully.",
            duration: 1000,
          });
          setOnEditedPlan(!onEditedPlan);
        },
        onError: () => {},
        board_id: board_id,
        card_id: card_id,
        data: formData,
      });
    }
  };

  const handleGetLink = () => {
    getLink({
      onSuccess: (link: string) => {
        navigator.clipboard.writeText(link);
        sooner("Link Copied!");
      },
      onError: () => {},
      board_id: board.board_id,
    });
  };

  const handleLeave = () => {
    leaveTeam({
      onSuccess: () => {
        toast({
          title: "Successfully Left",
          description: "You have successfully left the team.",
          duration: 1000,
        });
      },
      onError: (message: string) => {
        sooner(message);
      },
      board_id: board.board_id,
    });
  };

  return (
    <MainLayout SEO={SEO}>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=0.4" />
      </Helmet>
      <section className="w-full max-w-7xl mx-auto mt-28 p-5">
        {isLoading && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <Skeleton className="h-[13rem] w-full" />
            <Skeleton className="h-[13rem] w-full" />
            <Skeleton className="h-[13rem] w-full" />
            <Skeleton className="h-[13rem] w-full" />
            <Skeleton className="h-[13rem] w-full" />
            <Skeleton className="h-[13rem] w-full" />
          </div>
        )}
        {!isLoading && (
          <div className="flex flex-col gap-5">
            <Button
              type="button"
              variant={"ghost"}
              onClick={handleLeave}
              className="text-red-500 flex gap-3 items-center justify-start hover:bg-transparent hover:text-red-500 px-0"
            >
              <p>Leave</p>
              <span className="icon-[iconamoon--exit-thin] w-6 h-6"></span>
            </Button>
            <div className="flex justify-between items-center">
              <h1 className="font-cabinet font-semibold text-5xl">
                {board.title}
              </h1>
              <div className="flex gap-5 items-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <p className="text-orange-500 cursor-pointer">List team</p>
                  </DialogTrigger>
                  <DialogContent>
                    <TeamList board_id={board.board_id} teams={board.team} />
                  </DialogContent>
                </Dialog>
                <Button
                  onClick={handleGetLink}
                  variant={"outline"}
                  className="text-orange-500 gap-2"
                >
                  <p>Copy Link to invite</p>
                  <span className="icon-[iconamoon--copy-thin] w-5 h-5"></span>
                </Button>
              </div>
            </div>
            <div className="flex h-full w-full gap-3">
              <Column
                teamList={board.team}
                onEditedPlan={onEditedPlan}
                board_id={board.board_id}
                setOpenForm={setOpenForm}
                openForm={openForm}
                onAddNewCard={onAddNewCard}
                setOnAddNewCard={setOnAddNewCard}
                handleUpdateList={handleUpdateList}
                setOnEditedPlan={setOnEditedPlan}
                isDragging={isDragging}
                handleDragging={handleDragging}
                status="TODO"
                cards={board.kanban_card || []}
              />
              <Column
                teamList={board.team}
                onEditedPlan={onEditedPlan}
                board_id={board.board_id}
                setOpenForm={setOpenForm}
                openForm={openForm}
                onAddNewCard={onAddNewCard}
                setOnAddNewCard={setOnAddNewCard}
                handleUpdateList={handleUpdateList}
                setOnEditedPlan={setOnEditedPlan}
                isDragging={isDragging}
                handleDragging={handleDragging}
                status="DOING"
                cards={board.kanban_card || []}
              />
              <Column
                teamList={board.team}
                onEditedPlan={onEditedPlan}
                board_id={board.board_id}
                setOpenForm={setOpenForm}
                openForm={openForm}
                onAddNewCard={onAddNewCard}
                setOnAddNewCard={setOnAddNewCard}
                handleUpdateList={handleUpdateList}
                setOnEditedPlan={setOnEditedPlan}
                isDragging={isDragging}
                handleDragging={handleDragging}
                status="DONE"
                cards={board.kanban_card || []}
              />
            </div>
          </div>
        )}
      </section>
    </MainLayout>
  );
};

export default PlannerDetail;
