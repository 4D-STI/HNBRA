'use client'

import React, { createContext, useState, useEffect } from 'react';

export interface IData {
  idFile:	number,
  idSubSession:	number,
  path:	string,
  nameFile:	string,
  nomeSubSession:	string,
  description:	string,
  status:	boolean,
  createdAt:	string,
  updatedAt:	string
}


interface DataContextType {
  data: IData[] | null;
  loading: boolean;
  error: string | null;
}

const PDF_DataContext = createContext<DataContextType>({
  data: null,
  loading: false,
  error: null,
});

export const PDF_DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<IData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // const response = await fetch(`https://www.hnbra.mb:3002/files`); // Endpoint da API
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BACK}/files`); // Endpoint da API
        if (!response.ok) {
          console.log(`Erro na requisição: ${response.status}`);
          // throw new Error(`Erro na requisição: ${response.status}`);
        }
        const jsonData: IData[] = await response.json();
        setData(jsonData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(`Erro desconhecido: \n${err}`)
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <PDF_DataContext.Provider value={{ data, loading, error }}>
      {children}
    </PDF_DataContext.Provider>
  );
};

export default PDF_DataContext;
