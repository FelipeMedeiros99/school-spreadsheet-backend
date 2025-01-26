import { countStudentRepository } from "../repositories/studentRepository";

export async function countStudentService(){
  const qtStudents = await countStudentRepository()
  return qtStudents
} 