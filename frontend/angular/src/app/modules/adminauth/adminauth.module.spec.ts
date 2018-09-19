import { AdminauthModule } from './adminauth.module';

describe('AdminauthModule', () => {
  let adminauthModule: AdminauthModule;

  beforeEach(() => {
    adminauthModule = new AdminauthModule();
  });

  it('should create an instance', () => {
    expect(adminauthModule).toBeTruthy();
  });
});
