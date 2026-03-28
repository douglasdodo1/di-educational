import { Test, TestingModule } from '@nestjs/testing';
import { ClassesResolver } from './classes.resolver';
import { ClassesService } from './classes.service';

const mockClassesService = {
  updateClass: jest.fn().mockResolvedValue(true),
  deleteClasses: jest.fn().mockResolvedValue(true),
  updateContent: jest.fn().mockResolvedValue(true),
};

describe('ClassesResolver', () => {
  let resolver: ClassesResolver;
  let service: ClassesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClassesResolver,
        { provide: ClassesService, useValue: mockClassesService },
      ],
    }).compile();

    resolver = module.get<ClassesResolver>(ClassesResolver);
    service = module.get<ClassesService>(ClassesService);
    jest.clearAllMocks();
  });

  describe('updateClass', () => {
    it('deve atualizar uma aula e retornar true', async () => {
      const input = { id: 1, name: 'Aula Atualizada' };
      const result = await resolver.updateClass(1, input);
      expect(service.updateClass).toHaveBeenCalledWith(1, input);
      expect(result).toBe(true);
    });
  });

  describe('deleteClasses', () => {
    it('deve deletar aulas e retornar true', async () => {
      const result = await resolver.deleteClasses([1, 2, 3]);
      expect(service.deleteClasses).toHaveBeenCalledWith([1, 2, 3]);
      expect(result).toBe(true);
    });
  });

  describe('updateContent', () => {
    it('deve atualizar o conteúdo de uma aula e retornar true', async () => {
      const input = { id: 1, url: 'https://example.com/new-video' };
      const result = await resolver.updateContent(1, input);
      expect(service.updateContent).toHaveBeenCalledWith(1, input);
      expect(result).toBe(true);
    });
  });
});
