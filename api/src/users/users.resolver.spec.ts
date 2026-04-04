import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { CreateUserInput } from './inputs/create.user.input';

const mockUser = {
  id: 1,
  email: 'user@test.com',
  first_name: 'Alex',
  last_name: 'Silva',
  bio: 'Bio',
  password: 'hashed',
  avatarUrl: null,
  phones: [{ id: 1, number: '11999999999' }],
  teacher: null,
  student: null,
};

const mockUsersService = {
  findAll: jest.fn().mockResolvedValue([mockUser]),
  findById: jest.fn().mockResolvedValue(mockUser),
  findByEmail: jest.fn().mockResolvedValue(mockUser),
  create: jest.fn().mockResolvedValue(mockUser),
  delete: jest.fn().mockResolvedValue(true),
};

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  describe('users', () => {
    it('deve retornar uma lista de usuários', async () => {
      const result = await resolver.users();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('user', () => {
    it('deve retornar um usuário pelo id', async () => {
      const result = await resolver.user(1);
      expect(service.findById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockUser);
    });
  });

  describe('userByEmail', () => {
    it('deve retornar um usuário pelo email', async () => {
      const email = 'user@test.com';
      const result = await resolver.userByEmail(email);
      expect(service.findByEmail).toHaveBeenCalledWith(email);
      expect(result).toEqual(mockUser);
    });
  });

  describe('createUser', () => {
    it('deve criar um usuário e retornar o objeto criado', async () => {
      const input: CreateUserInput = {
        email: 'user@test.com',
        first_name: 'Alex',
        last_name: 'Silva',
        bio: 'Bio',
        phones: ['11999999999'],
        password: '123456',
      } as CreateUserInput;

      const result = await resolver.createUser(input);
      expect(service.create).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockUser);
    });
  });

  describe('deleteUser', () => {
    it('deve deletar um usuário e retornar true', async () => {
      const result = await resolver.deleteUser(1);
      expect(service.delete).toHaveBeenCalledWith(1);
      expect(result).toBe(true);
    });
  });
});
