import { Test, TestingModule } from '@nestjs/testing';
import { StudentsResolver } from './students.resolver';
import { StudentsService } from './students.service';

const mockStudent = {
  id: 1,
  enrollmentNumber: 'MAT-001',
  user: {
    id: 1,
    email: 'student@test.com',
    first_name: 'Maria',
    last_name: 'Santos',
    bio: 'Aluna',
    password: 'hashed',
    avatarUrl: null,
    phones: [{ id: 1, number: '11988888888' }],
  },
};

const mockStudentsService = {
  findAll: jest.fn().mockResolvedValue([mockStudent]),
  findById: jest.fn().mockResolvedValue(mockStudent),
  create: jest.fn().mockResolvedValue(mockStudent),
  update: jest.fn().mockResolvedValue(true),
  delete: jest.fn().mockResolvedValue(true),
};

describe('StudentsResolver', () => {
  let resolver: StudentsResolver;
  let service: StudentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsResolver,
        { provide: StudentsService, useValue: mockStudentsService },
      ],
    }).compile();

    resolver = module.get<StudentsResolver>(StudentsResolver);
    service = module.get<StudentsService>(StudentsService);
    jest.clearAllMocks();
  });

  describe('students', () => {
    it('deve retornar uma lista de alunos', async () => {
      const result = await resolver.students();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockStudent]);
    });
  });

  describe('student', () => {
    it('deve retornar um aluno pelo id', async () => {
      const result = await resolver.student(1);
      expect(service.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockStudent);
    });
  });

  describe('updateStudent', () => {
    it('deve atualizar um aluno e retornar true', async () => {
      const input = {
        id: 1,
        first_name: 'Ana',
        enrollmentNumber: 'MAT-002',
      };

      const result = await resolver.updateStudent(1, input);
      expect(service.update).toHaveBeenCalledWith(1, input);
      expect(result).toBe(true);
    });
  });
});
