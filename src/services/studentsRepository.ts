import { countStudentRepository, findStudentsRepository } from "../repositories/studentRepository";

export async function countStudentService(){
  const qtStudents = await countStudentRepository();
  return qtStudents;
} 

export async function findStudentsService(page: number){
  const students = await findStudentsRepository(page);
  return students;
} 
