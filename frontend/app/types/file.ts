export interface File {
    idFile: number;
    idSubSession: number;
    path: string;
    nameFile: string;
    nomeSubSession: string;
    description: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    previewOnly?: boolean;
}
