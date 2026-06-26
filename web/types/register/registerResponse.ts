export interface RegisterResponse {
  register: {
    access_token: string;
    refresh_token: string;
    user: {
      id: number;
      email: string;
      first_name: string;
      last_name: string;
      bio?: string;
      avatarUrl?: string;
    };
  };
}
