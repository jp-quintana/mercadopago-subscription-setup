import { axios } from '@/lib';
import { User } from '@/store';
import { useMutation, useQuery } from '@tanstack/react-query';

interface LoginUserDto {
  email: string;
  password: string;
}
interface RegisterUserDto extends LoginUserDto {
  confirmPassword: string;
}

interface SubscribeUserDto {
  userId: string;
  email: string;
}

interface UserResponse {
  user: User;
}

export class ApiClient {
  private readonly userEndPoint = 'user';
  private readonly mpEndPoint = 'mercadopago';

  login() {
    return useMutation({
      mutationFn: (loginUserDto: LoginUserDto) =>
        axios.post<UserResponse>(this.userEndPoint + '/login', loginUserDto),
      onError: (error: Error) => console.log(error),
    });
  }

  register() {
    return useMutation({
      mutationFn: (registerUserDto: RegisterUserDto) =>
        axios.post<UserResponse>(
          this.userEndPoint + '/register',
          registerUserDto
        ),
      onError: (error: Error) => console.log(error),
    });
  }

  subscribe() {
    return useMutation({
      mutationFn: async (subscribeUserDto: SubscribeUserDto) => {
        const response = await axios.post<string>(
          this.mpEndPoint + '/subscribe',
          {
            email: process.env.EXPO_PUBLIC_MP_TEST_USER,
            userId: subscribeUserDto.userId,
          }
        );
        return response.data;
      },
      onError: (error: Error) => console.error('Error subscribing:', error),
    });
  }

  getUser(userId: string) {
    return useQuery({
      queryKey: ['getUser', userId],
      queryFn: async () => {
        const response = await axios.get<UserResponse>(
          this.userEndPoint + `/${userId}`
        );
        return response.data.user;
      },
    });
  }
}

export const apiClient = new ApiClient();
