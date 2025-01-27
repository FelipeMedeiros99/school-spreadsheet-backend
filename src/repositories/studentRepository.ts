import prisma from "../config";
import { StudentData } from "../services/studentsServices";

interface StudentFilter {
  type: "name" | "class" | "age" | "",
  filter: string
}

export async function countStudentRepository(filters: StudentFilter) {
  const { type, filter } = filters;
  try {
    if (type !== "") {
      const qtStudents = await prisma.student.count({
        where: {
          [type]: {
            contains: filter.toUpperCase()
          }
        }
      });
      return qtStudents;
    }

    const qtStudents = await prisma.student.count()
    return qtStudents

  } catch (e) {
    throw { message: "Error counting students.", status: 500 }
  }
}

export async function findStudentsRepository(page: number, filters: StudentFilter) {
  try {
    const results = 10;
    const { type, filter } = filters

    if (type === "") {
      const students = await prisma.student.findMany({
        skip: results * (page),
        take: results,
        orderBy: {
          name: "asc"
        }
      });
      return students;
    }

    const students = await prisma.student.findMany({
      skip: results * (page),
      take: results,
      orderBy: {
        name: "asc"
      },
      where: {
        [type]: {
          contains: filter.toUpperCase()
        }
      }
    });

    return students;

  } catch (e) {
    throw { message: "error searching for students.", status: 500 }
  }
}

export async function saveStudentAtDatabaseRepository(studentData: StudentData) {
  try {
    
    await prisma.student.create({
      data: studentData
    })

  }catch(e){
    throw {message: "Erro ao adicionar estudante", status: 500}
  }
}