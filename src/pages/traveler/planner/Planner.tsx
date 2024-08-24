import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useGetBoards } from "@/hooks/planner/useGetBoards";
import MainLayout from "@/layouts/MainLayout";
import { SEOModel } from "@/models/SEO";
import { Board } from "@/types/Planner/PlannerBoard";
import { PlannnerTeam } from "@/types/Planner/PlannerTeam";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SEO: SEOModel = {
  title: "Planner",
  description:
    "Explore a variety of captivating articles that uncover hidden destinations and unique experiences for travelers. Find inspiration for your next journey on Hidden Gems.",
  siteName: "Hidden Gems",
  siteUrl: "https://hiddengems.com/articles",
  keywords: [
    "hidden gems",
    "travel articles",
    "hidden destinations",
    "travel tips",
    "travel experiences",
  ],
  type: "website",
};

const Planner = () => {
  const { token } = useAuth();
  const [boards, setBoards] = useState<Board[]>([]);
  const getBoard = useGetBoards();

  useEffect(() => {
    getBoard(
      (data: Board[]) => {
        setBoards(data);
        console.log(data);
      },
      () => {
        console.log("error");
      },
      token as string
    );
  }, []);

  return (
    <>
      <MainLayout SEO={SEO}>
        <section className="w-full max-w-7xl mx-auto mt-28 p-5">
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <h1 className="font-cabinet font-semibold text-5xl">
                Your Plans
              </h1>
              <Link to={"/traveler/write"}>
                <Button className="bg-orange-500 rounded-full hover:bg-orange-400">
                  Create Plan
                </Button>
              </Link>
            </div>
            <div className="flex justify-end items-center">
              <Input
                // onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search Plan"
                className="w-[20rem]"
              />
            </div>
            <div className="flex gap-5 mt-5">
              {boards.map((board: Board) => (
                <Link
                  to={`/traveler/planner/${board.board_id}`}
                  key={board.board_id}
                >
                  <BoardCard board={board} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </MainLayout>
    </>
  );
};

const BoardCard = ({ board }: { board: Board }) => {
  const team: PlannnerTeam[] =
    board.team.length > 3 ? board.team.splice(0, 3) : board.team;

  return (
    <div
      className={`flex flex-col gap-5 w-[20rem] h-[12rem] justify-between rounded-lg p-5 bg-cover bg-center bg-no-repeat`}
      style={{
        backgroundImage: board.cover ? `url(${board.cover})` : undefined,
      }}
    >
      <h1 className="font-cabinet font-semibold text-2xl text-white">
        {board.title.substring(0, 20)}...
      </h1>
      <div className="flex justify-between items-center">
        <p className="text-semibold text-white">Team:</p>
        <div className="flex relative">
          {team.map((team: PlannnerTeam, index: number) => (
            <Avatar
              className={`relative`}
              style={{ left: `-${index * 10}px` }}
              key={team.user.user_id}
            >
              <AvatarImage src={team.user.profile} />
            </Avatar>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Planner;
