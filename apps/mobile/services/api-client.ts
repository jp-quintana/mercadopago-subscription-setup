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

  login() {
    return useMutation({
      mutationFn: (userDto: UserDto) =>
        axios.post<RegisterResponse>(this.userEndPoint, userDto),
      onError: (error: Error) => console.log(error),
    });
  }
}

export const apiClient = new ApiClient();
