import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { CoursesRepository } from './courses.repository';
import { CreateCourseInput } from './inputs/create.course.input';
import { UpdateCourseInput } from './inputs/update.course.input';
import { CreateClassInput } from 'src/classes/inputs/create.class.input';
import { CoursesModel } from './courses.model';
import { ClassModel } from 'src/classes/classes.model';
import { ContentType, UserRole } from 'src/generated/prisma/enums';
import { UserModel } from 'src/users/models/users.model';

describe('CoursesService', () => {
  let service: CoursesService;
  let coursesRepository: jest.Mocked<CoursesRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        {
          provide: CoursesRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            enrollmentStudents: jest.fn(),
            unrollmentStudents: jest.fn(),
            createClass: jest.fn(),
            updateCourseAdmin: jest.fn(),
            updateIsActive: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
    coursesRepository = module.get(CoursesRepository);
  });

  afterEach(() => jest.clearAllMocks());

  describe('create', () => {
    it('should create a new course and return the created model', async () => {
      const input: CreateCourseInput = {
        name: 'Course 1',
        imageUrl: 'example.com/image.png',
        description: 'description',
        is_active: true,
        start_date: new Date(),
        end_date: new Date(),
      };

      const mockedCourse: CoursesModel = {
        id: 1,
        name: input.name,
        imageUrl: input.imageUrl,
        description: input.description,
        is_active: input.is_active,
        start_date: input.start_date,
        end_date: input.end_date,

        adminCourse: {
          id: 1,
          role: UserRole.TEACHER,
          teacher: {
            id: 1,
            salary: 2000,
          },
          email: 'email@test.com',
          first_name: 'First',
          last_name: 'Last',
          password: '123456',
          bio: null,
          phones: [],
        },
        members: [],
        classes: [],
      };

      coursesRepository.create.mockResolvedValue(mockedCourse);

      const user: UserModel = {
        id: 1,
        role: UserRole.TEACHER,
        teacher: {
          id: 1,
          salary: 2000,
        },
        email: 'email@test.com',
        first_name: 'First',
        last_name: 'Last',
        password: '123456',
        bio: null,
        phones: [],
      };

      const result = await service.create(input, user);

      expect(coursesRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          name: input.name,
          imageUrl: input.imageUrl,
          description: input.description,
          is_active: input.is_active,
          start_date: input.start_date,
          end_date: input.end_date,
        }),
        1,
      );

      expect(result).toEqual(mockedCourse);
    });
  });

  describe('findAll', () => {
    it('should return an array of courses', async () => {
      const courses = [
        { id: 1, name: 'a' },
        { id: 2, name: 'b' },
      ];
      coursesRepository.findAll.mockResolvedValue(courses as any);

      const result = await service.findAll();

      expect(coursesRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(courses);
    });
  });

  describe('findById', () => {
    it('should return a course by id', async () => {
      const course: CoursesModel = {
        id: 1,
        name: 'Course 1',
        is_active: true,
        start_date: new Date(),
        end_date: new Date(),
        adminCourse: {
          id: 1,
          role: UserRole.TEACHER,
          teacher: {
            id: 1,
            salary: 2000,
          },
          email: 'email@test.com',
          first_name: 'First',
          last_name: 'Last',
          password: '123456',
          bio: null,
          phones: [],
        },
        members: [],
        classes: [],
      };
      coursesRepository.findById.mockResolvedValue(course);

      const result = await service.findById(1);

      expect(coursesRepository.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(course);
    });
  });

  describe('update', () => {
    it('should call repository.update and return true', async () => {
      (coursesRepository.update as jest.Mock).mockResolvedValue(undefined);

      const data: UpdateCourseInput = { name: 'New' };

      const result = await service.update(1, data);

      expect(coursesRepository.update).toHaveBeenCalledWith(data, 1);
      expect(result).toBe(true);
    });
  });

  describe('delete', () => {
    it('should call repository.delete and return true', async () => {
      (coursesRepository.delete as jest.Mock).mockResolvedValue(undefined);

      const result = await service.delete(1);

      expect(coursesRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toBe(true);
    });
  });

  describe('enrollmentStudents', () => {
    it('should call repository.enrollmentStudents and return true', async () => {
      (coursesRepository.enrollmentStudents as jest.Mock).mockResolvedValue(
        undefined,
      );

      const result = await service.enrollmentStudents(1, [1, 2]);

      expect(coursesRepository.enrollmentStudents).toHaveBeenCalledWith(
        1,
        [1, 2],
      );
      expect(result).toBe(true);
    });
  });

  describe('unrollmentStudents', () => {
    it('should call repository.unrollmentStudents and return true', async () => {
      (coursesRepository.unrollmentStudents as jest.Mock).mockResolvedValue(
        undefined,
      );

      const result = await service.unrollmentStudents(1, [1]);

      expect(coursesRepository.unrollmentStudents).toHaveBeenCalledWith(1, [1]);
      expect(result).toBe(true);
    });
  });

  describe('createClass', () => {
    it('should create a class for a course and return the class model', async () => {
      const classInput: CreateClassInput = {
        name: 'Class 1',
        description: 'desc',
        content: { type: ContentType.VIDEO, url: 'http://example.com' },
      };

      const mockedClass: ClassModel = {
        id: 1,
        name: classInput.name,
        description: classInput.description,
        content: {
          id: 1,
          type: classInput.content.type,
          url: classInput.content.url,
        },
      };

      coursesRepository.createClass.mockResolvedValue(mockedClass);

      const result = await service.createClass(1, classInput);

      expect(coursesRepository.createClass).toHaveBeenCalledWith(1, classInput);
      expect(result).toEqual(mockedClass);
    });
  });

  describe('updateTeacher', () => {
    it('should call repository.updateCourseAdmin and return true', async () => {
      coursesRepository.updateCourseAdmin.mockResolvedValue(undefined);

      const result = await service.updateTeacher(1, 2);

      expect(coursesRepository.updateCourseAdmin).toHaveBeenCalledWith(1, 2);
      expect(result).toBe(true);
    });
  });

  describe('updateIsActive', () => {
    it('should call repository.updateIsActive and return true', async () => {
      coursesRepository.updateIsActive.mockResolvedValue(undefined);

      const result = await service.updateIsActive(1, true);

      expect(coursesRepository.updateIsActive).toHaveBeenCalledWith(1, true);
      expect(result).toBe(true);
    });
  });
});
