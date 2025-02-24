import { useContext } from 'react';
import ScheduleContext from '@/app/context/ScheduleContext'; // Importe o contexto

function useScheduleContext() {
  const contexto = useContext(ScheduleContext);
  if (!contexto) {
    throw new Error(
      'useMeuContexto deve ser usado dentro de um MeuProvedorDeContexto'
    );
  }
  return contexto;
}

export default useScheduleContext;
