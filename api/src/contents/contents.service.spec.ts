import { Test, TestingModule } from '@nestjs/testing';
import { ClassesService } from './contents.service';
import { classesRepository } from './contents.repository';
import { UpdateClassInput } from './inputs/update.content.input';
import { UpdateContentInput } from 'src/contents/inputs/update.content.input';

describe('ClassesService', () => {
  let service: ClassesService;
  let classesRepo: jest.Mocked<classesRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClassesService,
        {
          provide: classesRepository,
          useValue: {
            updateClass: jest.fn(),
            deleteClasses: jest.fn(),
            updateContent: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ClassesService>(ClassesService);
    classesRepo = module.get(classesRepository);
  });

  afterEach(() => jest.clearAllMocks());

  describe('updateClass', () => {
    it('should call repository.updateClass and return true', async () => {
      (classesRepo.updateClass as jest.Mock).mockResolvedValue(undefined);

      const data: UpdateClassInput = { name: 'New', description: 'D' };

      const result = await service.updateClass(1, data);

      expect(classesRepo.updateClass).toHaveBeenCalledWith(1, data);
      expect(result).toBe(true);
    });
  });

  describe('deleteClasses', () => {
    it('should call repository.deleteClasses and return true', async () => {
      (classesRepo.deleteClasses as jest.Mock).mockResolvedValue(undefined);

      const result = await service.deleteClasses([1, 2]);

      expect(classesRepo.deleteClasses).toHaveBeenCalledWith([1, 2]);
      expect(result).toBe(true);
    });
  });

  describe('updateContent', () => {
    it('should call repository.updateContent and return true', async () => {
      (classesRepo.updateContent as jest.Mock).mockResolvedValue(undefined);

      const data: UpdateContentInput = {
        type: 'VIDEO',
        url: 'http://x',
      };

      const result = await service.updateContent(1, data);

      expect(classesRepo.updateContent).toHaveBeenCalledWith(1, data);
      expect(result).toBe(true);
    });
  });
});
