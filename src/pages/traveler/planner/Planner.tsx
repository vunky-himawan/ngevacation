import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useDeleteBoard } from "@/hooks/planner/useDeleteBoard";
import { useGetBoards } from "@/hooks/planner/useGetBoards";
import { usePostBoard } from "@/hooks/planner/usePostBoard";
import { useUpdateBoard } from "@/hooks/planner/useUpdateBoard";
import MainLayout from "@/layouts/MainLayout";
import { SEOModel } from "@/models/SEO";
import { Board } from "@/types/Planner/PlannerBoard";
import { PlannnerTeam } from "@/types/Planner/PlannerTeam";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useEffect, useRef, useState } from "react";
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
  const postBoard = usePostBoard();
  const formRef = useRef<HTMLFormElement>(null);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getBoard(
      (data: Board[]) => {
        setBoards(data);
        setIsLoading(false);
      },
      () => {
        console.log("error");
      },
      token as string
    );
  }, [trigger]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    postBoard({
      onSuccess: () => {
        toast({
          title: "Board Created",
          description: "Your board has been created successfully.",
          duration: 1000,
        });
        setTrigger(true);
      },
      onError: () => {},
      data: formData,
    });

    setTrigger(false);
  };

  return (
    <>
      <MainLayout SEO={SEO}>
        <Dialog>
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
              <>
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between items-center">
                    <h1 className="font-cabinet font-semibold text-5xl">
                      Your Plans
                    </h1>

                    <DialogTrigger>
                      <Button className="bg-orange-500 rounded-full hover:bg-orange-400">
                        Create Plan
                      </Button>
                    </DialogTrigger>
                  </div>
                  <div className="gap-5 mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {boards.map((board: Board) => (
                      <div key={board.title} className="relative">
                        <BoardCard board={board} />

                        <ActionDropdown setTrigger={setTrigger} board={board} />
                      </div>
                    ))}
                  </div>
                </div>

                <DialogContent>
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="rounded-lg flex flex-col gap-3 text-xl"
                  >
                    <DialogHeader>
                      <DialogTitle className="font-cabinet font-semibold">
                        Create Plan
                      </DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold text-sm">Title</p>
                        <Input placeholder="Title" name="title" />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button className="bg-orange-500 hover:bg-orange-400">
                        Save
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </>
            )}
          </section>
        </Dialog>
      </MainLayout>
    </>
  );
};

const BoardCard = ({ board }: { board: Board }) => {
  const team: PlannnerTeam[] =
    board.team.length > 3 ? board.team.splice(0, 3) : board.team;

  return (
    <Link
      to={`/traveler/planner/${board.board_id}`}
      className={`flex flex-col gap-5 min-w-[20rem] h-[15rem] justify-between rounded-lg p-5 bg-cover bg-center bg-no-repeat`}
      style={{
        background: board.cover !== "" ? `url(${board.cover})` : `#f97316`,
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
              key={team.team_id}
            >
              <AvatarImage src={team.user.profile} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>
    </Link>
  );
};

const EditForm = ({
  data,
  setTrigger,
}: {
  data: Board;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const updateBoard = useUpdateBoard();
  const formRef = useRef<HTMLFormElement>(null);
  const [title, setTitle] = useState<string>(data.title);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(e.currentTarget);

    const formData = new FormData();
    formData.append("title", title);

    updateBoard({
      onSuccess: () => {
        toast({
          title: "Board Updated",
          description: "Your board has been updated successfully.",
          duration: 1000,
        });
        setTrigger(true);
      },
      onError: () => {},
      data: formData,
      board_id: data.board_id,
    });

    setTrigger(false);
  };

  return (
    <>
      <form ref={formRef} id="edit-form" onSubmit={handleSubmit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-cabinet font-semibold text-xl">
              Edit Plan
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-sm">Title</p>
              <Input
                placeholder="Title"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                defaultValue={data.title}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              form="edit-form"
              className="bg-orange-500 hover:bg-orange-400"
              type="submit"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </>
  );
};

const ActionDropdown = ({
  board,
  setTrigger,
}: {
  board: Board;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const deleteBoard = useDeleteBoard();

  const handleDelete = () => {
    deleteBoard({
      onSuccess: () => {
        toast({
          title: "Board Deleted",
          description: "Your board has been deleted successfully.",
          duration: 1000,
        });
        setTrigger(true);
      },
      onError: () => {},
      boardId: board.board_id,
    });
    setTrigger(false);
  };

  return (
    <>
      {/* Hamburger Button */}
      <Dialog>
        <DropdownMenu>
          <div className="flex gap-2 items-center cursor-pointer absolute top-6 right-6 hover:bg-transparent z-50">
            <DropdownMenuTrigger asChild>
              <span className="icon-[iconamoon--menu-kebab-vertical-bold] w-6 h-6"></span>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <p className="w-full p-1 text-left">Edit</p>
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem>
              <button
                type="button"
                onClick={handleDelete}
                className="w-full text-red-500 p-1 text-left"
              >
                Delete
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>

          {/* Modal */}
        </DropdownMenu>
        <EditForm setTrigger={setTrigger} data={board} />
      </Dialog>
    </>
  );
};

export default Planner;
