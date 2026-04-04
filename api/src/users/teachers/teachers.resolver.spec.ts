import { Test, TestingModule } from '@nestjs/testing';
import { TeachersResolver } from './teachers.resolver';
import { TeachersService } from './teachers.service';

const mockTeacher = {
  id: 1,
  salary: 5000,
  user: {
    id: 1,
    email: 'teacher@test.com',
    first_name: 'João',
    last_name: 'Silva',
    bio: 'Professor',
    password: 'hashed',
    avatarUrl: null,
    phones: [{ id: 1, number: '11999999999' }],
  },
};

const mockTeachersService = {
  findAll: jest.fn().mockResolvedValue([mockTeacher]),
  findById: jest.fn().mockResolvedValue(mockTeacher),
  create: jest.fn().mockResolvedValue(mockTeacher),
  update: jest.fn().mockResolvedValue(true),
  delete: jest.fn().mockResolvedValue(true),
};

describe('TeachersResolver', () => {
  let resolver: TeachersResolver;
  let service: TeachersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeachersResolver,
        { provide: TeachersService, useValue: mockTeachersService },
      ],
    }).compile();

    resolver = module.get<TeachersResolver>(TeachersResolver);
    service = module.get<TeachersService>(TeachersService);
    jest.clearAllMocks();
  });

  describe('teachers', () => {
    it('deve retornar uma lista de professores', async () => {
      const result = await resolver.teachers();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockTeacher]);
    });
  });

  describe('teacher', () => {
    it('deve retornar um professor pelo id', async () => {
      const result = await resolver.teacher(1);
      expect(service.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockTeacher);
    });
  });

  describe('updateTeacher', () => {
    it('deve atualizar um professor e retornar true', async () => {
      const input = {
        id: 1,
        first_name: 'Carlos',
        salary: 6000,
      };

      const result = await resolver.updateTeacher(1, input);
      expect(service.update).toHaveBeenCalledWith(1, input);
      expect(result).toBe(true);
    });
  });
});
