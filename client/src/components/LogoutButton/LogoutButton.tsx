import { Button } from "../Button";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../api/auth";

interface Props {
  onLogout: () => void;
}

export const LogoutButton = ({ onLogout }: Props) => {
  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      onLogout();
    },
  });

  return (
    <Button onClick={() => mutation.mutate()} isLoading={mutation.isPending}>
      Выйти
    </Button>
  );
};