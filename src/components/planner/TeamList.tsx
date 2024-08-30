import { useDeleteMember } from "@/hooks/planner/useDeleteMember";
import { useGetTeams } from "@/hooks/planner/useGetTeams";
import { PlannnerTeam } from "@/types/Planner/PlannerTeam";
import { useEffect, useState } from "react";
import { toast as sooner } from "sonner";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

type TeamListProps = {
  teams: PlannnerTeam[];
  board_id: string;
};

const TeamList = ({ teams, board_id }: TeamListProps) => {
  const priorityOrder = { OWNER: 3, ADMIN: 2, MEMBER: 1 };
  const [username, setUsername] = useState<string>("");
  const [listTeams, setListTeams] = useState<PlannnerTeam[]>(
    teams.sort((a, b) => priorityOrder[b.role] - priorityOrder[a.role])
  );
  const [trigger, setTrigger] = useState<boolean>(false);
  const getTeams = useGetTeams();
  const deleteMember = useDeleteMember();

  useEffect(() => {
    if (username !== "" || trigger) {
      getTeams({
        onSuccess: (data: PlannnerTeam[]) => {
          setListTeams(
            data.sort((a, b) => priorityOrder[b.role] - priorityOrder[a.role])
          );
          setTrigger(true);
        },
        onError: () => {},
        board_id: board_id,
        query: username,
      });
    } else {
      setListTeams(teams);
    }
  }, [username, trigger]);

  const handleDeleteMember = ({ memberId }: { memberId: string }) => {
    deleteMember({
      onSuccess: () => {
        sooner("Member Deleted");
        setTrigger(true);
      },
      onError: () => {
        sooner("Error");
      },
      board_id: board_id,
      memberId: memberId,
    });
    setTrigger(false);
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="font-cabinet font-semibold text-lg">Teams</h1>
          <Input
            placeholder="Search Member"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          {listTeams.length === 0 && <p>No members found</p>}
          {listTeams.map((team) => (
            <div className="flex justify-between items-center">
              <div
                key={team.user.user_id}
                className="flex justify-start items-center gap-3"
              >
                <Avatar>
                  <AvatarImage src={team.user.profile} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1>{team.user.username}</h1>
                <Badge
                  variant={"outline"}
                  className={`${
                    team.role === "OWNER" && "bg-orange-500 text-white"
                  }`}
                >
                  {team.role}
                </Badge>
              </div>
              <Button
                variant={"ghost"}
                className="hover:bg-transparent"
                type="button"
                onClick={() => handleDeleteMember({ memberId: team.team_id })}
              >
                <span className="icon-[iconamoon--sign-minus-circle-thin] text-red-500 w-5 h-5"></span>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TeamList;
