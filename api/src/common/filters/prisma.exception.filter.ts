import { ArgumentsHost, Catch, HttpStatus, Logger } from '@nestjs/common';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/client';
import { GraphQLError } from 'graphql';

type PrismaError = {
  status: number;
  message: string;
  code?: string;
};

const PRISMA_ERROR_MAP: Record<string, PrismaError> = {
  // Not found
  P2025: { status: HttpStatus.NOT_FOUND, message: 'Record not found' },

  // Unique constraint
  P2002: {
    status: HttpStatus.CONFLICT,
    message: 'A record with this data already exists',
  },

  // Foreign key constraint
  P2003: {
    status: HttpStatus.BAD_REQUEST,
    message: 'Related record not found',
  },

  // Required relation violation
  P2014: {
    status: HttpStatus.BAD_REQUEST,
    message: 'Required relation violation',
  },

  // Null constraint violation
  P2011: {
    status: HttpStatus.BAD_REQUEST,
    message: 'A required field is missing',
  },

  // Value out of range
  P2020: {
    status: HttpStatus.BAD_REQUEST,
    message: 'Value out of range for the field',
  },

  // Table not found
  P2021: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Database table not found',
  },

  // Column not found
  P2022: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Database column not found',
  },

  // Invalid data
  P2023: { status: HttpStatus.BAD_REQUEST, message: 'Invalid data provided' },

  // Transaction failed
  P2034: {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Transaction failed, please try again',
  },
};

@Catch(
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
  PrismaClientInitializationError,
)
export class PrismaExceptionFilter implements GqlExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(
    exception:
      | PrismaClientKnownRequestError
      | PrismaClientValidationError
      | PrismaClientInitializationError,
    host: ArgumentsHost,
  ) {
    GqlArgumentsHost.create(host);

    // Validation error (query malformada)
    if (exception instanceof PrismaClientValidationError) {
      this.logger.warn(`Prisma validation error: ${exception.message}`);
      throw new GraphQLError('Invalid data provided', {
        extensions: { code: 'BAD_USER_INPUT', status: HttpStatus.BAD_REQUEST },
      });
    }

    // Initialization error (falha de conexão com o banco)
    if (exception instanceof PrismaClientInitializationError) {
      this.logger.error(`Prisma initialization error: ${exception.message}`);
      throw new GraphQLError('Database connection failed', {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
          status: HttpStatus.SERVICE_UNAVAILABLE,
        },
      });
    }

    // Known request errors (P2xxx)
    if (exception instanceof PrismaClientKnownRequestError) {
      const mapped = PRISMA_ERROR_MAP[exception.code];

      this.logger.warn(
        `Prisma error ${exception.code}: ${exception.message} | meta: ${JSON.stringify(exception.meta)}`,
      );

      if (mapped) {
        throw new GraphQLError(mapped.message, {
          extensions: {
            code: exception.code,
            status: mapped.status,
            meta: exception.meta,
          },
        });
      }

      // Código desconhecido
      this.logger.error(`Unhandled Prisma error code: ${exception.code}`);
      throw new GraphQLError('Unexpected database error', {
        extensions: {
          code: exception.code,
          status: HttpStatus.INTERNAL_SERVER_ERROR,
        },
      });
    }
  }
}
