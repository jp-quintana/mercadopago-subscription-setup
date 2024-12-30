import { axios } from '@/lib';
import { User } from '@/store';
import { useMutation } from '@tanstack/react-query';

interface LoginUserDto {
  email: string;
  password: string;
}
interface RegisterUserDto extends LoginUserDto {
  confirmPassword: string;
}

interface SubscribeUserDto {
  id: string;
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
            userId: subscribeUserDto.id,
          }
        );
        console.log(response.data);
        return response.data;
      },
      onError: (error: Error) => console.error('Error subscribing:', error),
    });
  }
}

export const apiClient = new ApiClient();
