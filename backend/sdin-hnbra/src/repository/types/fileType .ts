export type fileType = {
    idFile: number,
    idSubSession: number,
    path: string,
    nameFile: string,
    nomeSubSession: string,
    description: string,
    status: boolean,
    createdAt: Date,
    updatedAt: Date,
    previewOnly?: boolean;
}
