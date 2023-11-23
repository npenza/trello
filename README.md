# Trello (AI Integration Clone)

This is a Trello clone that uses OpenAI as a personal assistant. You can add, delete and search for tasks, as well as move them to different columns within your board.

[Demo](https://trello-lemon-seven.vercel.app/)

![App Preview](https://i.ibb.co/JmPWbW9/Screenshot-2023-11-23-at-08-17-12-Screenshot.png)

## Getting Started

Firstly, install the dependencies for the project.
```bash
npm  install

# or

yarn  install
```
You will need to create a .env file and populate the [project environment variables](#environment-variables-setup).

You can then run the development server:

```bash

npm  run  dev

# or

yarn  dev

```
  
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables Setup
This project uses environment variables to connect to the Appwrite database and authorise the API calls to OpenAI. You will need the follow environment variables set up in your local for this application to work. 

|                |Variable                          |Where to find it?                         |
|----------------|-------------------------------|-----------------------------|
|Appwrite Project ID |`NEXT_PUBLIC_APPWRITE_PROJECT_ID`            |This is found when setting up the appwrite project.            |
|Appwrite Database ID          |`NEXT_PUBLIC_DATABASE_ID`            |Found when setting up the database in the above project.            |
|Appwrite Todo Collection ID          |`NEXT_PUBLIC_TODOS_COLLECTION_ID`| The ID for the Todo collection created in the Appwrite database. | 
Storage Bucket ID | `NEXT_PUBLIC_STORAGE_BUCKET_ID` | The ID for the storage bucket, created from Appwrite.
| Open AI Secret Key | `OPENAI_API_KEY` | Create a secret key in OpenAI Api.
