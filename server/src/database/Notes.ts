import { randomUUID } from "crypto";
import { JSONFilePreset } from "lowdb/node";

export interface INote {
  id: string;
  title: string;
  text: string;
  userId: string;
  createdAt: number;
}

const database = await JSONFilePreset<Record<string, INote>>("notes.json", {});

export interface IGetAllNotesOptions {
  page?: number;
  pageSize?: number;
  searchString?: string;
}

export interface IGetAllNotesResult {
  list: INote[];
  pageCount: number;
}

export class Notes {
  static getAllForUser(userId: string, options = {}) {
  let list = Object.values(database.data).filter(
    (note) => note.userId === userId
  );

  let pageCount = 1;

  return {
    list,
    pageCount,
  };
}

  static async create(
    title: string,
    text: string,
    userId: string,
  ): Promise<INote> {
    const note: INote = {
      id: randomUUID(),
      title,
      text,
      userId,
      createdAt: Date.now(),
    };

    await database.update((data) => {
      data[note.id] = note;
    });

    return note;
  }
}
