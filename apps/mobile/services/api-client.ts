import { axios } from '@/lib';
import { User } from '@/store';
import { useMutation } from '@tanstack/react-query';

interface UserDto {
  username: string;
  password: string;
  confirmPassword: string;
}

interface RegisterResponse {
  user: User;
}
export class ApiClient {
  private readonly userEndPoint = 'user';

  register() {
    return useMutation({
      mutationFn: (userDto: UserDto) =>
        axios.post<RegisterResponse>(this.userEndPoint + '/register', userDto),
      onError: (error: Error) => console.log(error),
    });
  }

  login() {}
}

export const apiClient = new ApiClient();
