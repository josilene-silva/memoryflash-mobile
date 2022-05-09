import { AxiosError } from 'axios';

interface IReturn {
  type: 'error' | 'attention';
  message: string;
}

export type ErrorType = AxiosError;

export function getError(error: ErrorType): IReturn {
  console.log(error);
  const { response } = error;

  if (!response)
    return {
      type: 'error',
      message: 'Falha na conexão com o servidor, tente novamente mais tarde',
    };

  const status = response.status as number;

  if (status === 500)
    return {
      type: 'error',
      message: 'Erro interno do sistema',
    };

  const message = response?.data.message as string;

  if (!message)
    return {
      type: 'error',
      message: 'Erro interno do sistema',
    };

  return {
    type: 'attention',
    message,
  };
}
