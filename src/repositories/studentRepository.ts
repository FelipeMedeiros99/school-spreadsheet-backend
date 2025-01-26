import prisma from "../config";

interface StudentFilter {
  type: "name" | "class" | "age" | "",
  filter: string
}

export async function countStudentRepository(filters: StudentFilter) {
  const { type, filter } = filters;
  try {
    if(type !== ""){
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

export async function findStudentsRepository(page: number) {
  try {
    const results = 10;
    const students = await prisma.student.findMany({
      skip: results * (page),
      take: results,
      orderBy: {
        name: "asc"
      }
    });
    return students;

  } catch (e) {
    throw { message: "error searching for students.", status: 500 }
  }
}