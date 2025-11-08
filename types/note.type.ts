export interface NoteType {
    _id?: string;
    userId?: string;
    title: string;
    description: string;
    isFavourite?: boolean;
    createdAt?: string;
    updatedAt?: string;
}