const login = async (username: string, password: string) => {
  return (
    <>
      {username}
      {password}
    </>
  );
};

export const AuthService = {
  login,
};
