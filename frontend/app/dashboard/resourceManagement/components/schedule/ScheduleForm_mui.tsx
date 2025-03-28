import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {useScheduleContext} from '@/app/custom_hook/useScheduleContext'
import {jwtDecode} from 'jwt-decode'
import * as z from 'zod';
import axios from 'axios'
// import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; // Importe a localização para português do Brasil
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

interface IScheduleItem {
  idScheduling: number;
  nip: string;
  schedulingStart: string;
  schedulingEnd: string;
  nameResponsible: string;
  theme: string;
  description: string;
  typeScheduling: ScheduleType;
  ramal: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

enum ScheduleType {
  auditorium = 'auditorium',
  meeting_room = 'meeting-room',
}

const dataTranslate = {
  auditorium: 'Auditório',
  'meeting-room': 'Sala de Reuniões'
}

interface IUserData {
  email: string,
  exp: number,
  firstName: string,
  iat: number,
  lastName: string,
  nip: string,
  patent: number,
  warName: string
}

const scheduleSchema = z.object({
  nip: z.string(),
  schedulingStart: z
        .string()
        .nonempty('Preencha a data e hora de início!'),
  schedulingEnd: z
      .string()
      .nonempty('Preencha a data e hora de fim!'),
  theme: z.string().min(5, 'Tema deve ter no mínimo 5 caracteres'),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  typeScheduling: z.nativeEnum(ScheduleType),
  ramal: z.string().length(4, 'Ramal deve ter 4 caracteres'),
});

const handlerUserLoggedData = (): IUserData | undefined => {
  const token = localStorage?.getItem('token') ?? ''
  if (token !== null) return jwtDecode(token)
}

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('pt-br');  // Defina a localização para português do Brasil

// função principal
const ScheduleForm: React.FC = () => {
  const [scheduleType, setScheduleType] = useState(ScheduleType.auditorium);
  const [userData, setUserData] = useState<IUserData | null >(null)
  const {updateScheduleData} = useScheduleContext()
  // MUI
  const [startDateTime, setStartDateTime] = useState<dayjs.Dayjs | null>(dayjs());
  const [endDateTime, setEndDateTime] = useState<dayjs.Dayjs | null>(dayjs().add(1, 'hour'));

  const handleStartChange = (newValue: dayjs.Dayjs | null) => {
    if (newValue === null) return setStartDateTime(null)  
    
    setStartDateTime(newValue);
    clearErrors('schedulingStart')
  };

  const handleEndChange = (newValue: dayjs.Dayjs | null) => {
    if (newValue === null) return setEndDateTime(null)  
    setEndDateTime(newValue);
  };

  useEffect(() => {
    // dados do agendamento
    const data = handlerUserLoggedData()
    if (data !== undefined) setUserData(data)
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors
  } = useForm<IScheduleItem>({
    resolver: zodResolver(scheduleSchema),
  });

  const onSubmit: SubmitHandler<IScheduleItem> = async (data) => {
    
    // normaliza datas para string ISO
    const adjustedData = {
      ...data,
      schedulingStart: dayjs(startDateTime).utcOffset(-180).toISOString(),
      schedulingEnd: dayjs(endDateTime).utcOffset(-180).toISOString()
    }
    
    // extrai token do localstorage
    const token = localStorage?.getItem('token') ?? ''
    const API_URL = `${process.env.NEXT_PUBLIC_API_BACK}/scheduling`
    try {
      const response = await axios.post(API_URL,adjustedData,{
        headers: { Authorization: `Bearer ${token}`}
      }
    )
    
    if (response.status === 201) {
        window.alert('Agendamento realizado com sucesso!')
        console.log('resposta servidor: ', response.data);
        reset()
        updateScheduleData()
      }

    } catch (error: unknown) {
      if(axios.isAxiosError<{message?: string, error?: string, statusCode?: number}>(error)) {
        console.log('erro resposta statusCode: ', error.response?.data.statusCode);
        console.log('erro resposta tipo: ', error.response?.data.error);
        console.log('erro resposta msg: ', error.response?.data.message);
        
        window.alert(`
          Não foi possível realizar o seu agendamento!\n
          Verifique os dados do formulário!\n\n
          Código: ${error.response?.data.statusCode} --- Erro: ${error.response?.data.error}\n\n
          Motivo: ${error.response?.data.message}
        `)
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        <div
          id='form-container-1'
          className='flex flex-row justify-between mt-2'
        >
          <div>
            <label htmlFor="nip" className="block text-gray-700 font-bold text-white">
              NIP:
            </label>
            <input
              type="text"
              id="nip"
              {...register('nip')}
              className="w-auto border border-gray-300 px-3 py-2 rounded-md"
              value={userData?.nip}
              disabled
            />
            {errors.nip && <p className="text-red-500">{errors.nip.message}</p>}
          </div>

          <div id="schedulingStart">
            <label htmlFor="nip" className="block text-gray-700 font-bold text-white">
              Início do Agendamento
            </label>
            <DateTimePicker
              autoFocus
              {...register('schedulingStart')}
              className='bg-white rounded-md'
              value={startDateTime}
              onChange={handleStartChange}
              slotProps={{
                textField: {
                    variant: 'outlined', // ou 'filled', 'standard'
                    size: 'medium', // ou 'medium'
                },
              }}
              format='DD/MM/YYYY HH:mm'
            />
            {errors.schedulingStart && <p className="text-red-500">{errors.schedulingStart.message}</p>}
          </div>

          <div id="schedulingEnd">
            <label htmlFor="nip" className="block text-gray-700 font-bold text-white">
              Fim do Agendamento
            </label>
              <DateTimePicker
                  className='bg-white rounded-md'
                  {...register('schedulingEnd')}
                  value={endDateTime}
                  onChange={handleEndChange}
                  slotProps={{
                    textField: {
                        variant: 'outlined',
                        size: 'medium',
                    },
                  }}
                  format='DD/MM/YYYY HH:mm'
              />
            {errors.schedulingEnd && <p className="text-red-500">{errors.schedulingEnd.message}</p>}
          </div>

          <div>
            <label htmlFor="ramal" className="block text-gray-700 font-bold text-white">
              Ramal:
            </label>
            <input
              type="text"
              id="ramal"
              maxLength={4}
              {...register('ramal')}
              className="w-auto border border-gray-300 px-3 py-2 rounded-md"
            />
            {errors.ramal && <p className="text-red-500">{errors.ramal.message}</p>}
          </div>

        </div>
        
        {/* tema */}
        <div>
          <label htmlFor="theme" className="block text-gray-700 font-bold text-white">
            Tema:
          </label>
          <input
            type="text"
            id="theme"
            {...register('theme')}
            className="w-full border border-gray-300 px-3 py-2 rounded-md"
            maxLength={255}
          />
          {errors.theme && <p className="text-red-500">{errors.theme.message}</p>}
        </div>

        {/* descrição */}
        <div>
          <label htmlFor="description" className="block text-gray-700 font-bold text-white">
            Descrição:
          </label>
          <textarea
            id="description"
            {...register('description')}
            className="w-full h-24 border border-gray-300 px-3 py-2 rounded-md"
            maxLength={255}
          />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>

        {/* tipo do agendamento */}
        <div>
          <label className="block text-gray-700 font-bold text-white">Tipo de Agendamento:</label>
          <div>
            {Object.values(ScheduleType).map((type) => (
              <label key={type} className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  {...register('typeScheduling')}
                  value={type}
                  className="mr-2"
                  checked={scheduleType === type}
                  onChange={() => setScheduleType(type)}
                />
                <span className='text-white'>{dataTranslate[type]}</span>
              </label>
            ))}
          </div>
          {errors.typeScheduling && <p className="text-red-500">{errors.typeScheduling.message}</p>}
        </div>



        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Agendar
        </button>
      </form>

    </LocalizationProvider>
  );
};

export default ScheduleForm;
