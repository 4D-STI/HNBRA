'use client'

import React, { createContext, useState, useEffect, useCallback } from 'react';
import { IScheduleItem } from '../dashboard/resourceManagement/components/schedule/schedule_interface/scheduleInterface';

export interface IDataContextType {
  scheduleData: IScheduleItem[] | null;
  loading: boolean;
  error: string | null;
  updateScheduleData: () => Promise<void>
}

const ScheduleContext = createContext<IDataContextType>({
  scheduleData: null,
  loading: false,
  error: null,
  updateScheduleData: async () => {},
});

export const ScheduleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scheduleData, setScheduleData] = useState<IScheduleItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback( async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACK}/scheduling`, {cache: 'no-cache'});
      
      if (!response.ok) {
        return console.log(`Erro na requisição: ${response.status}`);
      }
      
      const data: IScheduleItem[] = await response.json();
      
      setScheduleData(data);

    } catch (err: unknown) {
      
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(`Erro desconhecido: \n${err}`)
      }
      
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {fetchData()}, [fetchData])

  const updateScheduleData = useCallback(async () => {
    await fetchData()
  }, [fetchData])


  return (
    <ScheduleContext.Provider value={{ scheduleData, loading, error, updateScheduleData }}>
      {children}
    </ScheduleContext.Provider>
  );
};

export default ScheduleContext;
