import { Student } from "@prisma/client";
import { countStudentRepository, editStudentAtDatabaseRepository, findStudentsRepository, saveStudentAtDatabaseRepository } from "../repositories/studentRepository";


type Type = "name" | "class" | "age" | "";

type ProcessDataTypes = "newStudent" | "editStudent"

interface StudentFilter {
  type: "name" | "class" | "age" | "",
  filter: string
}

export interface StudentData {
  age: number;
  userId: number;
  class: string;
  name: string
}

export interface EditStudentData extends Omit<StudentData, "userId"> { studentId: number }

export async function countStudentService(filters: StudentFilter) {
  const qtStudents = await countStudentRepository(filters);
  return qtStudents;
}

export async function findStudentsService(page: number, filters: StudentFilter) {
  const students = await findStudentsRepository(page, filters);
  return students;
}

export function returnFilterValidationsService(query: any) {
  let type = query?.type as Type;
  let filter = query?.filter as string;

  if (type !== "name" && type !== "class" && type !== "age") type = "";
  if (!filter) filter = "";

  const studentFilter: StudentFilter = { "type": type, "filter": filter };

  return studentFilter;
}

export function processStudentDataService(studentData: StudentData | EditStudentData, type: ProcessDataTypes) {
  if (type === "newStudent") {
    const student: StudentData = {
      age: Number(studentData.age),
      userId: Number((studentData as StudentData).userId),
      class: studentData.class.toUpperCase(),
      name: studentData.name.toUpperCase()
    }
    return student as any
  }
  if(type === "editStudent"){
    const student:  EditStudentData = {
      age: Number(studentData.age),
      studentId: Number((studentData as EditStudentData).studentId),
      class: studentData.class.toUpperCase(),
      name: studentData.name.toUpperCase()
    }
    return student as any
  }

  throw {message: "O type deve ser 'newStudent' ou 'editStudent'"}
}

export async function saveStudentAtDatabaseService(studentData: StudentData) {
  await saveStudentAtDatabaseRepository(studentData)
}

export async function editStudentAtDatabaseService(studentData: EditStudentData) {
  await editStudentAtDatabaseRepository(studentData)
}

