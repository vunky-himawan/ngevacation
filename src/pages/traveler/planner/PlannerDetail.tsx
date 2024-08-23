import { useAuth } from "@/context/authContext";
import { useGetBoard } from "@/hooks/planner/useGetBoard";
import MainLayout from "@/layouts/MainLayout";
import { SEOModel } from "@/models/SEO";
import { Board } from "@/types/Planner/PlannerBoard";
import { PlannnerCard } from "@/types/Planner/PlannerCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PlannerDetail = () => {
  const { token } = useAuth();
  const { planId } = useParams<{ planId: string }>();
  const [board, setBoard] = useState<Board>({} as Board);
  const getBoard = useGetBoard();

  useEffect(() => {
    getBoard(
      (data: Board) => {
        setBoard(data);
        console.log(data);
      },
      () => {
        console.log("error");
      },
      token as string,
      planId as string
    );
  }, []);

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

  return (
    <MainLayout SEO={SEO}>
      <section className="w-full max-w-7xl mx-auto mt-28 p-5">
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <h1 className="font-cabinet font-semibold text-5xl">
              {board.title}
            </h1>
          </div>
          <div className="w-full h-screen border grid grid-cols-3 mt-5 gap-5">
            {board && <Column status="TODO" cards={board.kanban_card || []} />}
            {board && <Column status="DOING" cards={board.kanban_card || []} />}
            {board && <Column status="DONE" cards={board.kanban_card || []} />}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

const Column = ({
  cards,
  status,
}: {
  cards: PlannnerCard[];
  status: string;
}) => {
  const filtered = cards.filter((card: PlannnerCard) => card.status === status);

  return (
    <>
      <div className="transition-all duration-500 ease-in-out">
        {filtered.length > 0 &&
          filtered.map((card: PlannnerCard) => <Card kanbanCard={card} />)}
      </div>
    </>
  );
};

const Card = ({ kanbanCard }: { kanbanCard: PlannnerCard }) => {
  return (
    <div
      draggable="true"
      className="w-full bg-orange-500 cursor-grab active:cursor-grabbing"
    >
      <h1 className="font-cabinet font-semibold text-2xl">
        {kanbanCard.title}
      </h1>
    </div>
  );
};

export default PlannerDetail;
