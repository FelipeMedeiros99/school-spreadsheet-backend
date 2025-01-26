import { countStudentRepository, findStudentsRepository } from "../repositories/studentRepository";


type Type = "name" | "class" | "age" | "";

interface StudentFilter{
  type: "name" | "class" | "age" | "",
  filter: string
}

export async function countStudentService(filters: StudentFilter){
  const qtStudents = await countStudentRepository(filters);
  return qtStudents;
} 

export async function findStudentsService(page: number){
  const students = await findStudentsRepository(page);
  return students;
} 

export function returnFilterValidations(query: any){
  let type = query?.type as Type;
  let filter = query?.filter as string;
  
  if(type !== "name" && type !== "class" && type !== "age") type = "";
  if(!filter) filter = "";

  const studentFilter: StudentFilter = {"type": type, "filter": filter};

  return studentFilter;
}