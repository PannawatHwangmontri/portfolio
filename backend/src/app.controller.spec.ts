import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { SupabaseService } from './supabase/supabase.service.js';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: SupabaseService,
          useValue: {
            getClient: () => null,
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('health', () => {
    it('should return health status ok', () => {
      const result = appController.getHealth();
      expect(result.status).toBe('ok');
    });
  });
});
