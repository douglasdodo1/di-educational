import { Test, TestingModule } from '@nestjs/testing';
import { CoursesResolver } from './courses.resolver';
import { CoursesService } from './courses.service';

const mockCourse = {
  id: 1,
  name: 'Matemática',
  imageUrl: null,
  description: 'Curso de Matemática',
  is_active: true,
  start_date: new Date('2026-01-01'),
  end_date: new Date('2026-12-31'),
  teacher: {
    id: 1,
    salary: 5000,
    user: {
      id: 1,
      email: 'teacher@test.com',
      first_name: 'João',
      last_name: 'Silva',
      bio: null,
      password: 'hashed',
      avatarUrl: null,
      phones: [],
    },
  },
  members: [],
  classes: [],
};

const mockClass = {
  id: 1,
  name: 'Aula 1',
  description: 'Introdução',
  content: { id: 1, type: 'VIDEO', url: 'https://example.com/video' },
};

const mockCoursesService = {
  findAll: jest.fn().mockResolvedValue([mockCourse]),
  findById: jest.fn().mockResolvedValue(mockCourse),
  create: jest.fn().mockResolvedValue(mockCourse),
  update: jest.fn().mockResolvedValue(true),
  delete: jest.fn().mockResolvedValue(true),
  enrollmentStudents: jest.fn().mockResolvedValue(true),
  unrollmentStudents: jest.fn().mockResolvedValue(true),
  createClass: jest.fn().mockResolvedValue(mockClass),
  updateTeacher: jest.fn().mockResolvedValue(true),
  updateIsActive: jest.fn().mockResolvedValue(true),
};

describe('CoursesResolver', () => {
  let resolver: CoursesResolver;
  let service: CoursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesResolver,
        { provide: CoursesService, useValue: mockCoursesService },
      ],
    }).compile();

    resolver = module.get<CoursesResolver>(CoursesResolver);
    service = module.get<CoursesService>(CoursesService);
    jest.clearAllMocks();
  });

  describe('Courses', () => {
    it('deve retornar uma lista de cursos', async () => {
      const result = await resolver.Courses();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockCourse]);
    });
  });

  describe('course', () => {
    it('deve retornar um curso pelo id', async () => {
      const result = await resolver.course(1);
      expect(service.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockCourse);
    });
  });

  describe('createCourse', () => {
    it('deve criar um curso e retornar o objeto criado', async () => {
      const input = {
        name: 'Matemática',
        description: 'Curso de Matemática',
        is_active: true,
        start_date: new Date('2026-01-01'),
        end_date: new Date('2026-12-31'),
      };

      const result = await resolver.createCourse(input);
      expect(service.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockCourse);
    });
  });

  describe('updateCourse', () => {
    it('deve atualizar um curso e retornar true', async () => {
      const input = { id: 1, name: 'Física' };
      const result = await resolver.updateCourse(1, input);
      expect(service.update).toHaveBeenCalledWith(1, input);
      expect(result).toBe(true);
    });
  });

  describe('deleteCourse', () => {
    it('deve deletar um curso e retornar true', async () => {
      const result = await resolver.deleteCourse(1);
      expect(service.delete).toHaveBeenCalledWith(1);
      expect(result).toBe(true);
    });
  });

  describe('enrollmentStudents', () => {
    it('deve matricular alunos e retornar true', async () => {
      const result = await resolver.enrollmentStudents(1, [1, 2, 3]);
      expect(service.enrollmentStudents).toHaveBeenCalledWith(1, [1, 2, 3]);
      expect(result).toBe(true);
    });
  });

  describe('unrollmentStudents', () => {
    it('deve desmatricular alunos e retornar true', async () => {
      const result = await resolver.unrollmentStudents(1, [1, 2]);
      expect(service.unrollmentStudents).toHaveBeenCalledWith(1, [1, 2]);
      expect(result).toBe(true);
    });
  });

  describe('createClass', () => {
    it('deve criar uma aula e retornar o objeto criado', async () => {
      const input = {
        name: 'Aula 1',
        description: 'Introdução',
        content: { type: 'VIDEO' as const, url: 'https://example.com/video' },
      };

      const result = await resolver.createClass(1, input);
      expect(service.createClass).toHaveBeenCalledWith(1, input);
      expect(result).toEqual(mockClass);
    });
  });

  describe('updateTeacher', () => {
    it('deve atualizar o professor do curso e retornar true', async () => {
      const result = await resolver.updateTeacher(1, 2);
      expect(service.updateTeacher).toHaveBeenCalledWith(1, 2);
      expect(result).toBe(true);
    });
  });

  describe('updateIsActive', () => {
    it('deve atualizar o status ativo do curso e retornar true', async () => {
      const result = await resolver.updateIsActive(1, false);
      expect(service.updateIsActive).toHaveBeenCalledWith(1, false);
      expect(result).toBe(true);
    });
  });
});
