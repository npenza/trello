import { ID, databases, storage } from "@/appwrite";
import { getTodosGroupedByColumn } from "@/lib/getTodosGroupedByColumn";
import { uploadFile } from "@/lib/uploadFile";
import { create } from "zustand";

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;

  newTaskInput: string;
  setNewTaskInput: (input: string) => void;
  newTaskType: TypedColumn;
  setNewTaskType: (columnId: TypedColumn) => void;
  image: File | null;
  setImage: (image: File | null) => void;

  searchString: string;
  setSearchString: (searchString: string) => void;

  deleteTask: (taskIndex: number, taskID: Todo, id: TypedColumn) => void;
  addTask: (todo: string, columnId: TypedColumn, image?: File | null) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },
  setBoardState: (board) => set({ board }),

  updateTodoInDB: async (todo, columnId) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      {
        title: todo.title,
        status: columnId,
      }
    );
  },

  newTaskInput: "",
  setNewTaskInput: (input: string) => set({ newTaskInput: input }),

  newTaskType: "todo",
  setNewTaskType: (columnId: TypedColumn) => set({ newTaskType: columnId }),

  searchString: "",
  setSearchString: (searchString) => set({ searchString }),

  image: null,
  setImage: (image: File | null) => set({ image }),

  deleteTask: async (taskIndex: number, todo: Todo, id: TypedColumn) => {
    const newColumns = new Map(get().board.columns);

    //delete todoId from newColumns
    newColumns.get(id)?.todos.splice(taskIndex, 1);

    // Show changes on the frontend first
    set({ board: { columns: newColumns } });

    // Delete image from the storage bucket
    if (todo.image) {
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
    }

    // Make changes in the database
    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id
    );
  },

  addTask: async (todo: string, columnId: TypedColumn, image?: File | null) => {
    let file: Image | undefined;

    if (image) {
      const fileUploaded = await uploadFile(image);
      if (fileUploaded) {
        file = {
          bucketId: fileUploaded.bucketId,
          fileId: fileUploaded.$id,
        };
      }
    }

    const { $id } = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      ID.unique(),
      {
        title: todo,
        status: columnId,
        ...(file && { image: JSON.stringify(file) }),
      }
    );

    set({ newTaskInput: "" });

    set((state) => {
      const newColumns = new Map(state.board.columns)

      const newTodo: Todo = {
        $id,
        $createdAt: new Date().toISOString(),
        title: todo,
        status: columnId,
        ...(file && { image: file }),
      }

      const column = newColumns.get(columnId)

      if (!column) {
        newColumns.set(columnId , {
          id: columnId,
          todos: [newTodo]
        })
      } else {
        newColumns.get(columnId)?.todos.push(newTodo)
      }

      return {
        board: {
          columns: newColumns
        }
      }
    })
  },
}));
