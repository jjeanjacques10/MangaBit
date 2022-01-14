import { IPrismaService } from "@intersDB/IPrismaService";
import { PrismaClient } from "@prisma/client";
import connection from '../index'
export class PrismaService implements IPrismaService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = connection
    }

    getPrisma(): PrismaClient {
        return this.prisma;
    }
}