import { countStudentRepository, findStudentsRepository, saveStudentAtDatabaseRepository } from "../repositories/studentRepository";


type Type = "name" | "class" | "age" | "";

interface StudentFilter{
  type: "name" | "class" | "age" | "",
  filter: string
}

export interface StudentData {
  age: number;
  userId: number;
  class: string;
  name: string
}

export async function countStudentService(filters: StudentFilter){
  const qtStudents = await countStudentRepository(filters);
  return qtStudents;
} 

export async function findStudentsService(page: number, filters: StudentFilter){
  const students = await findStudentsRepository(page, filters);
  return students;
} 

export function returnFilterValidationsService(query: any){
  let type = query?.type as Type;
  let filter = query?.filter as string;
  
  if(type !== "name" && type !== "class" && type !== "age") type = "";
  if(!filter) filter = "";

  const studentFilter: StudentFilter = {"type": type, "filter": filter};

  return studentFilter;
}

export function processStudentDataService(studentData: StudentData){
  studentData = { 
    age: Number(studentData.age), 
    userId: Number(studentData.userId),
    class: studentData.class.toUpperCase(),
    name: studentData.name.toUpperCase()
  }

  return studentData
}

export async function saveStudentAtDatabaseService(studentData: StudentData){
  await saveStudentAtDatabaseRepository(studentData)
  
}