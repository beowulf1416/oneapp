import { AdminClientsModule } from './admin-clients.module';

describe('AdminClientsModule', () => {
  let adminClientsModule: AdminClientsModule;

  beforeEach(() => {
    adminClientsModule = new AdminClientsModule();
  });

  it('should create an instance', () => {
    expect(adminClientsModule).toBeTruthy();
  });
});
