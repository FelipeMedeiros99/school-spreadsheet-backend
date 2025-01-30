import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', "OPTIONS", "UPDATE", "PATCH"], 
  credentials: true,
  preflightContinue: true,
  maxAge: 3600,
  optionsSuccessStatus: 200
};

export default prisma