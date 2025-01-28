import prisma from "../config/index.js";
import { EditStudentData, StudentData } from "../services/studentsServices.js";

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
    throw { message: "Erro ao buscar estudantes.", status: 500 }
  }
}

export async function saveStudentAtDatabaseRepository(studentData: StudentData) {
  try {

    await prisma.student.create({
      data: studentData
    })

  } catch (e) {
    throw { message: "Erro ao adicionar estudante", status: 500 }
  }
}

export async function editStudentAtDatabaseRepository(studentData: EditStudentData) {
  try {
    await prisma.student.update({
      where: {
        id: studentData.studentId
      },
      data: {
        age: studentData.age,
        class: studentData.class,
        name: studentData.name
      }
    })
  } catch (e) {
    console.log(e)
    throw { message: "Erro ao editar dados do estudante", status: 500 }
  }
}

export async function deleteStudentAtDatabaseRepository(id: number) {
  try {
    await prisma.student.delete({
      where: {
        id
      }
    })
  } catch (e) {
    console.log(e)
    throw { message: "Erro ao editar dados do estudante", status: 500 }
  }
}

export async function findStudentExistAtDatabaseRepository(id: number) {
  const student = await prisma.student.findFirst({
    where: {
      id
    }
  })

  return student;
}